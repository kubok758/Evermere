# Gates: Evermere

OWNS: src/**, public/**, index.html, package.json, vite.config.js, .github/**, README.md

Scope: A polished, living 3D landscape with five rendering languages, smooth exploration and public GitHub Pages delivery. Unlazy solo workflow; research delegation has no artifact ownership.

- [ ] G1: The scene reads as a composed village, meadow, forest, water and distant mountains.
  EVIDENCE: pending
- [ ] G2: Trees, grass, water, birds and villagers move coherently, with natural routes and ground contact.
  EVIDENCE: pending
- [ ] G3: All five keyboard-selected modes visibly change shading and visual language while preserving world identity.
  EVIDENCE: pending
- [ ] G4: Desktop and touch exploration work; controls, reset and responsive layout are usable.
  EVIDENCE: pending
- [ ] G5: Every mode has been rendered and reviewed; several refinement passes address concrete visual defects.
  EVIDENCE: pending
- [ ] G6: Production assets compile and load with relative paths; no observed shader or runtime errors.
  CHECK: npm run build
  EXPECT: built in
  EVIDENCE: pending
- [ ] G7: Public GitHub Pages URL serves the final build and the deployed experience works.
  EVIDENCE: pending

## Refinement log
2026-10-03: two source review/refinement rounds complete. Corrected water and path winding, incompatible indexed/nonindexed geometry merging, missing vertex colors on instanced vegetation, ShaderPass uniform cloning, composer antialiasing, wind shadow deformation, camera order and collision, mobile tour interruption and FPS statistics. Replaced coarse crown solids with detailed alpha-cut foliage and spatially grouped vegetation. Excluded leaf cards from the SSAO normal prepass to prevent opaque rectangular artifacts.

CPU scene construction and 60-second walking simulation passed: 295 trees, 37,510 grass blades, 7 homes, 5 villagers; 177 meshes and 477,139 triangles. Production build succeeds. These are source/geometry results, not rendered visual proof.

G1–G5 and the runtime portion of G6 remain UNVERIFIED: cloud Chrome has WebGL disabled; local Chromium could not launch because socket creation was denied. Escalation was rejected by the environment approval policy. No visual screenshots or hardware performance claims are made.

G7 pending: GitHub connector is authenticated but cannot create repositories or enable Pages. Browser fallback reached GitHub sign-in. Awaiting authenticated setup of a new public Evermere repository; no unrelated repository has been modified.
