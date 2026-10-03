# Gates: Evermere

OWNS: src/**, docs/**, qa/**, scripts/**, index.html, package.json, vite.config.js, .github/**, README.md

Scope: A living 3D landscape with five rendering languages, smooth exploration and public GitHub Pages delivery. Unlazy solo workflow; delegated research and review had no project ownership. Final runtime source: ff4ad7a6ba36d3c17c5da00fdc3aa7a1a615fbc7.

- [x] G1: The scene reads as a composed village, meadow, forest, water and distant mountains.
  EVIDENCE: Reviewed qa/evidence/overview.png and view-village.png, view-bridge.png, view-forest.png. Final terrain boundary no longer produces the earlier elevated clipped plateau; the village, river, bridge and canopy remain the composition's anchors.
- [x] G2: Vegetation, water, birds and villagers animate coherently; walking routes have measured foot support.
  EVIDENCE: qa/evidence/geometry.json records an actual-source 180-second / 3600-frame simulation of five villagers. Lowest transformed boot sole clearance is 12 mm against the defined terrain/path/bridge support surface. Geometry attributes and instance transforms are finite; water faces upward. Browser captures show the animated scene, and input tests observe live frame progression.
- [x] G3: All five keyboard-selected modes change the same world's shading and visual language.
  EVIDENCE: Reviewed qa/evidence/mode-1.png through mode-5.png. Painterly uses stepped colored light and brush variation; Anime has cel bands and fine contours; Cartoon has stronger contours and two-band light; Ultra adds a low warm sun, long 3072-pixel shadows, local AO and bloom. qa/evidence/render.json verifies all five keyboard selections and matching active buttons.
- [x] G4: Desktop and touch exploration work; reset, help and responsive layout are usable.
  EVIDENCE: qa/evidence/render.json: W movement, mouse drag, R reset, help/Escape, emulated touch joystick, mobile style selection and no horizontal overflow all passed. Reviewed mobile-start.png and mobile-explore.png at 390x844.
- [x] G5: Every style has been rendered and reviewed, with several visual refinement passes.
  EVIDENCE: Four successful complete capture rounds followed the initial screenshot-harness fix. Final screenshots are archived in qa/evidence/. The refinement log below records defects found in actual rendered frames and their corrections.
- [x] G6: Production assets compile successfully with relative asset paths configured.
  CHECK: npm run build
  EXPECT: built in
  EVIDENCE: automatic-evidence=v1; definition-sha256=46d72eccd628b28a4b0e974e69890ad856bb5d28a16876531804fc540a571513; exit=0; EXPECT=matched; output-sha256=fff9b8079498923d42657b684d5d4ccae6c9384cd3bb8520053ddb86b39b0d5f; output-bytes=489; shell=/bin/sh; cwd=/workspace/sites/evermere; path=7aba55034bc8/13 entries
- [x] G7: Public GitHub Pages serves and renders the final application build.
  EVIDENCE: https://kubok758.github.io/Evermere/ rendered in Chromium/WebGL2. qa/evidence/render.json matches the deployed ./assets/index-BLrhi-XZ.js to the tested build, with no recorded runtime or shader errors. Final browser run: https://github.com/kubok758/Evermere/actions/runs/37157621129 . HTTPS document and assets also returned HTTP 200.

## Refinement log

2026-10-03, source passes: corrected water/path winding, indexed/nonindexed geometry merging, missing instance color attributes, ShaderPass uniform cloning, composer antialiasing, matching wind shadows, camera rotation order, roof collision, mobile tour interruption and diagnostics. Added spatial grouping and alpha-cut foliage; excluded cutout cards from the AO normal pass.

Rendered round 1, run 37155517345: all styles and controls passed. Review found pale terrain, excessive ambient light, sparse individual grass blades, dark double-tinted trunks, mountains filling the sky, noisy small contours and repetitive water ripples.

Rendered round 2, run 37156297067: corrected authored vegetation colors to sRGB, changed grass to five-blade tufts, added low shrubs, corrected trunk albedo, reduced ambient light and contour noise, opened the sky composition, and localized AO. Removed redundant shadow updates in the AO pass. Public Pages rendering and exact-build comparison passed.

Rendered round 3, run 37157037283: corrected white reed/stem colors after the grass material change, added gravel path material, rebuilt distant ridges, and corrected walking support using eight posed boot-corner samples. Review identified a remaining raised terrain-edge silhouette and insufficient separation between Natural and Ultra.

Rendered round 4, run 37157621129: tapered the outer foothills and expanded the terrain; introduced genuinely different low-sun illumination, finer long shadows, water highlights and bloom for Ultra. Reviewed all styles, village/bridge/forest viewpoints, mobile screens and the public Pages capture. All browser checks passed.

## Validation limits

This is an art-directed, rasterized WebGL world. Ultra is an enhanced browser rendering mode, not a claim of photorealistic AAA engine parity or ray tracing. Browser tests use software WebGL and an emulated mobile viewport; hardware FPS and physical-device performance have not been measured. Foot contact is checked against the declared terrain/path/bridge support function, not a render-mesh raycast.

The official Unlazy checker and linter were audited at commit 16671491f6679ad9378f52604d3bc2415b4120c7. Only the inspected npm build command is executable in this ledger; creative/visual outcomes are explicitly human-reviewed gates backed by captured evidence.
