# background3d: the full-page 3D background

One fixed 3D layer sits behind every page. Scrolling the page moves a camera
through a 3D world of objects, so the background runs the whole length of each
page and is continuous, not split into sections.

The layer is built with CSS 3D and framer-motion, which the project already uses.
No WebGL and no extra packages are needed.

## How it works

- `Background3D.jsx` is mounted once, in `src/layout/Layout.jsx`. It covers all routes.
- The page scroll drives the depth of a 3D world: the world moves toward the viewer
  as you scroll down.
- Five stations sit in that world. Each is a laptop, phone, panel, tile grid or ring:
  - **laptop**: the screen shows the website, then turns to code as it passes
  - **panel**: a window that flips from the page to its code
  - **phone**: an app or feed screen
  - **tiles**: six mock and code thumbnails
  - **ring**: service labels that spin on their own
- A station fades in far away, reaches full strength, and fades out before the
  viewer reaches it.
- Every section and page wrapper is transparent (`Background3D.css`), so the one
  background shows through the whole page.

## Files

| File | Purpose |
| --- | --- |
| `Background3D.jsx` | The fixed layer, the world, and the scroll-driven depth |
| `stationViews.jsx` | The laptop, phone, panel, tiles and ring objects |
| `stations.js` | Which stations each route shows |
| `depth.js` | Fade and easing helpers for depth |
| `mockRenderer.jsx`, `mocks.jsx` | Website, dashboard, app, feed, poster and document mockups |
| `CodeView.jsx`, `highlight.js` | Scrolling, syntax-highlighted code |
| `Background3D.css` | All styles for the layer and the objects, plus the transparency rules |

## Editing

- **Which objects a page shows**: `stations.js`. A page with an intro in
  `src/data/showcase.js` (`INTROS`) uses its own object first, then the shared set.
- **The objects' content**: `src/data/showcase.js` (service stories and mock copy),
  and the home copy at the top of `stations.js`.
- **Spacing, depth and speed**: the constants at the top of `Background3D.jsx`
  (`SPACING`, `FIRST_Z`, `END_Z`).
- **Strength**: `maxOpacity` per station, and the veil in `Background3D.css`.

## Accessibility and devices

- With `prefers-reduced-motion`, the world stays still and only the first station shows.
- On phones the perspective is closer and the objects are dimmed, so text stays readable.
- The layer is `pointer-events: none`, so it never blocks clicks.
- Light theme (`body.light-mode`) uses a light base, a light veil and a darker lattice.
