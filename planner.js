export function estimate(p) {
  const keys=['areaHa','currentPct','targetPct','plantableHa','spacingM','crownM','survivalPct','overlapPct'];
  for(const k of keys) if(typeof p[k] !== 'number' || !Number.isFinite(p[k])) throw new Error(`${k}: enter a finite number`);
  for(const k of ['currentPct','targetPct','survivalPct','overlapPct']) if(p[k]<0||p[k]>100) throw new Error(`${k}: use 0–100`);
  if(p.areaHa<=0||p.plantableHa<0||p.plantableHa>p.areaHa||p.spacingM<=0||p.crownM<=0||p.survivalPct<=0||p.overlapPct>=100) throw new Error('Check area, plantable land, spacing, crown and survival inputs');
  const gapM2=Math.max(0,(p.targetPct-p.currentPct)/100*p.areaHa*10000);
  const effectiveCrownM2=Math.PI*(p.crownM/2)**2*(1-p.overlapPct/100);
  const survivorTarget=Math.ceil(gapM2/effectiveCrownM2);
  const plantingTarget=Math.ceil(survivorTarget/(p.survivalPct/100));
  const siteCapacity=Math.floor(p.plantableHa*10000/p.spacingM**2);
  const feasiblePlantings=Math.min(plantingTarget,siteCapacity);
  const expectedSurvivors=feasiblePlantings*p.survivalPct/100;
  const modelledGainM2=Math.min(gapM2,expectedSurvivors*effectiveCrownM2);
  return {gapM2,effectiveCrownM2,survivorTarget,plantingTarget,siteCapacity,feasiblePlantings,expectedSurvivors,modelledGainM2,unmetM2:Math.max(0,gapM2-modelledGainM2)};
}

export function validateDataset(data) {
  if(!data||data.schemaVersion!==1||!Array.isArray(data.areas)||!data.areas.length||data.areas.length>5000) throw new Error('Use schemaVersion 1 and 1–5000 area records');
  const ids=new Set();
  return data.areas.map(a=>{
    if(typeof a.id!=='string'||!a.id.trim()||ids.has(a.id)) throw new Error('Each area needs a unique non-empty id');
    ids.add(a.id);
    for(const k of ['name','boundarySource','canopySource','method','reviewDate']) if(typeof a[k]!=='string'||!a[k].trim()) throw new Error(`${a.id}: missing ${k}`);
    for(const k of ['boundarySource','canopySource']) {let u;try{u=new URL(a[k])}catch{throw new Error(`${a.id}: invalid source URL`)}if(!['https:','http:'].includes(u.protocol))throw new Error('Source URLs must use HTTP(S)');}
    if(!/^\d{4}-\d{2}-\d{2}$/.test(a.reviewDate)||Number.isNaN(Date.parse(a.reviewDate+'T00:00:00Z'))||new Date(a.reviewDate+'T00:00:00Z').toISOString().slice(0,10)!==a.reviewDate) throw new Error('Use a valid YYYY-MM-DD review date');
    if(!Number.isFinite(a.areaHa)||a.areaHa<=0||!Number.isFinite(a.currentPct)||a.currentPct<0||a.currentPct>100)throw new Error(`${a.id}: invalid area or canopy`);
    if(!['survey','satellite-derived','illustrative'].includes(a.evidence))throw new Error('Evidence must be survey, satellite-derived or illustrative');
    return {...a};
  });
}
