# Evermere

A small living landscape built with Three.js and WebGL 2: an alpine hamlet, wooded groves, wildflower clearings, a winding river and an arched stone bridge.

## Play

Open `Evermere.html` from the release ZIP directly in a recent browser with WebGL 2 enabled. It contains the compiled application, so no development server or installation is required. The optional web fonts may fall back to installed fonts when offline.

Drag to look, scroll to glide, or use WASD / arrow keys. Q and E move down and up; Shift moves faster. R resets the overlook and H toggles the interface. On touch devices, enter the landscape, use the left thumbstick and drag to look. Plus/minus adjust height. Nature ambience is opt-in.

Press 1–5 or use the five style buttons:

1. Natural: PBR materials, soft sun shadows and atmospheric haze.
2. Painterly: world-space brush variation, stepped colored shadows, fine paper grain and subtle bloom.
3. Anime: cel lighting and fine contours.
4. Cartoon: simplified two-band lighting and heavier contours.
5. Ultra: ambient occlusion, bloom and cinematic grading. This is a rasterized browser renderer, not ray tracing.

## Develop

Node.js 22.12+ is required.

```sh
npm ci
npm run dev
npm run build
```

The production output is `dist/`. Its asset paths are relative, suitable for a GitHub Pages project subdirectory. All geometry, material textures and sound are generated locally. No API key or backend is required.

## GitHub Pages

Create a public repository, push this source to its `main` branch, and select **Deploy from a branch** under **Settings → Pages → Build and deployment**, then choose `main` / `docs`. For build-on-push deployment, move `deployment-examples/pages.yml` to `.github/workflows/pages.yml` and select **GitHub Actions** instead.

Alternatively, `docs/` contains the prebuilt application. Pages can deploy `main` / `docs` without running a build.

## Verification status

- Production build passes.
- Scene construction checked: 295 trees, 37,510 grass blades, seven homes, five villagers, 177 meshes and 477,139 geometry triangles before shadow/post-processing passes.
- Geometry checked for finite vertices, valid instance bounds, correct upward water faces and required color attributes.
- Villagers simulated for 60 seconds: positions remained finite and above the terrain.
- Two independent source review/refinement rounds fixed geometry merging, water/path winding, style uniforms, instanced colors, antialiasing, camera order/collision and diagnostics.
- **Visual QA is not complete.** The available cloud browser has WebGL disabled. Launching a separate software-rendering browser was blocked by execution policy. All five modes still require GPU browser screenshots and visual review; performance has not been measured on user hardware.
- **GitHub Pages publication and live-site verification are in progress.**

`GATES.md` records open requirements honestly. Do not treat compilation as proof of visual quality.
