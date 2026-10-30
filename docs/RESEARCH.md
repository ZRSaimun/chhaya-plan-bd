# Evidence and data requirements

Review started: 30 October 2026. This file separates potential data sources from verified measurements. No city-wide or ward-level exact planting quota has been established in this repository.

## Why an exact tree number needs a definition

“Trees needed” depends on the boundary, current canopy, chosen canopy or shade objective, crown sizes, planting space, survival horizon, ecology and maintenance funding. A city-wide number without those definitions is not actionable. More planting is not always appropriate: wetlands, natural grasslands, utility corridors and existing mature canopy need different treatment.

## Candidate sources to assess

| Source | Intended use | What it cannot establish alone |
|---|---|---|
| Bangladesh Forest Department — https://bforest.gov.bd/ | National inventory context, local forestry contacts, relevant guidance | Exact street planting positions or ward quotas |
| FAO Bangladesh — https://www.fao.org/bangladesh/ | Inventory methods and forestry programme references | Site-specific species approval |
| ESA WorldCover — https://worldcover2021.esa.int/ | Broad land-cover screening after resolution, date, accuracy and licence checks | Individual tree counts, rootable soil or landowner permission |
| City corporation / RAJUK / Survey of Bangladesh data, when legitimately accessible | Authoritative administrative boundaries and local plans | Current plantability without a ground survey |
| Sentinel / Landsat imagery, subject to documented processing | Dated canopy/vegetation or surface-temperature screening | Direct pedestrian air temperature or human heat exposure |

Access, exact dataset versions, licences and current coverage must be verified before ingestion. Generic homepages are not cited as evidence of specific local numeric findings. No remote raster processing has been completed.

## A defensible first pilot

1. Choose one non-overlapping, authoritative Dhaka ward boundary; record its date, licence and geometry version.
2. Obtain dated high-resolution canopy measurements or an existing inventory; inspect classification error on a sample. Satellite-derived land-cover must remain labelled as such.
3. Survey candidate public sites for landowner consent, soil, utilities, accessibility, existing vegetation, drainage and water availability.
4. Agree a shade/canopy objective with planners. Review heat, school/clinic access and underserved pedestrian routes without exposing personal locations.
5. Have a local urban forester/ecologist specify species, mature crown, root clearance, spacing, nursery provenance, mix, care and monitoring horizon.
6. Report a range/scenario and the limiting space, plus assumptions and uncertainty, before publishing any total.
7. Monitor surviving cohorts at consistent intervals, including replacement and maintenance costs. Do not treat repeated inspections as new planting cohorts.

## Species research gate

The current UI intentionally screens context without prescribing an unsupported species list. Before adding named candidates, each species record needs botanical/Bangla names, Bangladesh habitat/native-status evidence, source URL/date, mature dimensions, root/utility clearance, flood/salt/drought tolerance, invasiveness and local reviewer approval. Coastal mangroves must not be recommended for Dhaka streets merely because they are native to Bangladesh. Candidate suitability is not a site permit.


## Public research reviewed on 30 October 2026

- World Bank, *An Unsustainable Life: The Impact of Heat on Health and the Economy of Bangladesh*: https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099111024033034518 . Documents Dhaka urban heat and supports urban green-space planning. This provides a rationale, not a tree quota.
- FAO official BFI catalogue: https://microdata.fao.org/index.php/catalog/2651 . The national inventory covers 2016–2019, with 1,781 plots and 6,400 households; this is not a Dhaka ward inventory.
- ESA WorldCover 2021 v200: https://zenodo.org/records/7254221 . About 10 m resolution, 11 land-cover classes. Manual: https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/docs/WorldCover_PUM_V2.0.pdf . Global overall accuracy is not local ward accuracy. Differences between 2020 and 2021 include algorithm changes and must not be treated as pure land-cover change.
- Dhaka road-divider study (2021): https://www.banglajol.info/index.php/BJPT/article/view/54214 . Names native candidates according to divider width and soil depth, including Palash, Shimul, Sal, Chatim, Kadam and Jam for wider/deeper settings. These are explicitly research candidates in the UI; no site-specific approval, crown size or tree allocation is inferred.

Public research did not establish an authoritative exact planting requirement by Dhaka ward. The next step is actual boundary/canopy/site-data acquisition and local review, not guessing the missing counts.

Name check: no exact ChhayaPlan result appeared in the public search reviewed; similar Chhaya names exist. This is not trademark/domain clearance. GitHub slug availability was verified by creating the repository.
