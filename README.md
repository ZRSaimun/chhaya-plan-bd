# ChhayaPlan · ছায়া পরিকল্পনা

An independent Bangladesh tree-canopy planning prototype. Start with canopy gaps and site feasibility; measure success by surviving trees, not planting announcements.

## What works

- Canopy-gap scenarios from area, current canopy and a user-chosen target.
- Mature crown, overlap and survival assumptions; initial planting demand separated from space capacity.
- Available-land constraint and visible unmet canopy gap.
- Source-labelled area JSON import with schema validation; user-supplied records are not automatically verified.
- Site-context screening for urban streets, parks, wetlands and coastal settings.
- Browser-local survival inspections and JSON exports; no accounts or backend.
- Responsive interface, labelled controls, keyboard focus, explicit errors and missing-data states.

**No verified Bangladesh ward dataset is bundled.** Default numbers and `docs/example-areas.json` are synthetic. This app cannot currently tell you how many trees Dhaka actually needs, exact planting coordinates, or a professionally approved species/count mix. A land-cover class is not an individual-tree inventory. No universal canopy percentage, spacing, survival rate or species quota is asserted.

## Run and test

Requires Node 20+ for tests/build; Python 3 for the optional local server. No npm dependencies.

```sh
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

Open localhost:8000. To use GitHub Pages, serve the repository root from `main` (index.html and modules are at the root), or deploy the generated `dist` directory. This repository does not claim that hosting has been enabled.

## Import real evidence

See `docs/example-areas.json`. Required per area: unique `id`, `name`, positive `areaHa`, `currentPct` (0–100), `boundarySource`, `canopySource` (HTTP(S) URLs), `method`, valid `reviewDate`, `evidence` (`survey`, `satellite-derived`, `illustrative`). Maximum 2 MB and 5,000 areas. A source URL and a user-supplied label are provenance, not proof of accuracy. Include imagery acquisition dates and boundary versions in `method` until the schema gains separate fields.

Target canopy, plantable area and species assumptions still need review after selecting an imported area. Manual form edits detach the imported provenance. The JSON export retains model assumptions and limitations. The planner works offline after assets load; external fonts may fall back to system fonts.

## Model limitations

This is a simple mature-canopy scenario, not a spatial growth model or planting prescription. It assumes uniform circular crowns, an overlap discount and regular spacing. It excludes growth time, species-specific root clearance, detailed overlap geometry, soil/utility constraints, seasonal shade and ownership. Square-grid capacity is an illustrative upper bound before site exclusions. Do not sum overlapping study areas. Replacement planting and future mortality need a cohort/time model. Protect existing mature trees and natural non-forest habitats.

See [research and data plan](docs/RESEARCH.md) and [roadmap](docs/ROADMAP.md).

## Privacy

Care records stay in browser localStorage; clearing site data removes them. Exports are manual. Do not enter personal data, private household coordinates or names. No analytics, external data submission or AI API is used. Google Fonts requests are optional styling requests; use system fonts for fully local operation.

## Verification

Seven Node tests cover capacity constraints, zero deficit/land, survival sensitivity, invalid inputs, import provenance, duplicate IDs, unsafe URLs and invalid dates. Browser checks verified zero-land results and a 10-planted/8-alive care entry. Dataset import/export and narrow-screen rendering still require expanded browser QA. No real-world impact or data accuracy claim is made.

## Project handoff

User-requested new project, 30 October 2026. Slug: `chhaya-plan-bd`; proposed identifier: `BD-TREE-0001` (not yet allocated in the shared research-bank ledger). Distinct from a shareable tree-care card: this project centres canopy/space planning and survival. The current implementation is a non-operational research prototype. No other schedule registers were overwritten.
