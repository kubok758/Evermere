const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const out='qa/results';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const report={engine:'Chromium / software WebGL',errors:[],modes:[],checks:[]};let failure;
 function track(page){page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});}
 async function ready(page){await page.goto('http://127.0.0.1:4173/',{waitUntil:'load'});await page.waitForFunction(()=>window.__evermere?.state.frames>5,null,{timeout:120000});await page.locator('#loading').waitFor({state:'detached',timeout:30000});}
 try{
  const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});track(page);await ready(page);
  const renderer=await page.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl2');return {version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER)};});report.renderer=renderer;
  for(let mode=0;mode<5;mode++){
   await page.keyboard.press(String(mode+1));
   await page.waitForFunction(m=>window.__evermere.state.modeIndex===m,mode);
   const frame=await page.evaluate(()=>window.__evermere.state.frames);
   await page.waitForFunction(f=>window.__evermere.state.frames>f+3,frame,{timeout:90000});
   await page.screenshot({path:`${out}/mode-${mode+1}.png`});
   const state=await page.evaluate(()=>window.__evermere.state);report.modes.push(state);
   assert.equal(state.modeIndex,mode);assert.equal(state.ao,mode===4);
   assert.equal(await page.locator(`[data-mode="${mode}"]`).getAttribute('aria-pressed'),'true');
  }
  await page.keyboard.press('1');await page.locator('#explore').click();await page.waitForTimeout(5500);
  const before=await page.evaluate(()=>window.__evermere.state);
  await page.keyboard.down('w');await page.waitForTimeout(1200);await page.keyboard.up('w');
  const after=await page.evaluate(()=>window.__evermere.state);
  assert.ok(Math.hypot(...after.camera.map((x,i)=>x-before.camera[i]))>.1,'W must move the camera');report.checks.push('W key moves camera');
  await page.mouse.move(800,300);await page.mouse.down();await page.mouse.move(1050,360,{steps:12});await page.mouse.up();
  assert.ok(Math.abs((await page.evaluate(()=>window.__evermere.state.rotation[1]))-after.rotation[1])>.1,'Drag must rotate view');report.checks.push('Mouse drag rotates view');
  await page.keyboard.press('r');await page.waitForTimeout(500);const reset=await page.evaluate(()=>window.__evermere.state);assert.deepEqual(reset.camera,[46,24,52]);report.checks.push('R restores overlook');
  await page.locator('#help').click();assert.ok(await page.locator('#help-panel').isVisible());await page.keyboard.press('Escape');assert.ok(await page.locator('#help-panel').isHidden());report.checks.push('Help opens and Escape closes');
  for(const view of ['village','bridge','forest']){await page.evaluate(v=>window.__evermere.view(v),view);const f=await page.evaluate(()=>window.__evermere.state.frames);await page.waitForFunction(n=>window.__evermere.state.frames>n+2,f,{timeout:90000});await page.screenshot({path:`${out}/view-${view}.png`});}
  await page.close();
  const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});const mp=await mobile.newPage();track(mp);await ready(mp);await mp.screenshot({path:`${out}/mobile-start.png`});await mp.locator('#explore').tap();await mp.waitForTimeout(5500);assert.ok(await mp.locator('#joystick').isVisible());
  const box=await mp.locator('#joystick').boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2;const beforeTouch=await mp.evaluate(()=>window.__evermere.state.camera);const cdp=await mobile.newCDPSession(mp);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-30}]});await mp.waitForTimeout(1300);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});const afterTouch=await mp.evaluate(()=>window.__evermere.state.camera);assert.ok(Math.hypot(...afterTouch.map((v,i)=>v-beforeTouch[i]))>.1,'Touch joystick must move camera');report.checks.push('Touch joystick moves camera');
  await mp.locator('[data-mode="2"]').tap();assert.equal((await mp.evaluate(()=>window.__evermere.state.modeIndex)),2);await mp.screenshot({path:`${out}/mobile-explore.png`});report.checks.push('Mobile style button switches mode');assert.equal(await mp.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No horizontal overflow');
  const realErrors=report.errors.filter(e=>!e.includes('fonts.googleapis.com')&&!e.includes('fonts.gstatic.com'));assert.deepEqual(realErrors,[],'Runtime or shader console errors');report.checks.push('No runtime or shader errors');
 }catch(e){failure=e;report.failure=e.stack;}
 finally{fs.writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();}
 if(failure){console.error(failure);process.exitCode=1;}else console.log('RENDER_QA_PASSED');
})();
