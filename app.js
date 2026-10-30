import {estimate,validateDataset} from './planner.js';
const $=id=>document.getElementById(id), fmt=n=>Math.round(n).toLocaleString('en-GB');
const keys=['areaHa','currentPct','targetPct','plantableHa','spacingM','crownM','survivalPct','overlapPct'];
let areas=[], selected=null, lastPlan=null;
function download(name,value){const u=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
function calculate(){
  $('error').textContent='';lastPlan=null;
  try{
    const inputs=Object.fromEntries(keys.map(k=>[k,$(k).value.trim()===''?NaN:Number($(k).value)]));
    const result=estimate(inputs);
    $('result-name').textContent=$('name').value||'Unnamed scenario';
    $('mode').textContent=selected?`USER-SUPPLIED ${selected.evidence.toUpperCase()} INPUTS`:'ILLUSTRATIVE / MANUAL SCENARIO';
    $('metrics').replaceChildren();
    for(const [label,value] of [['Canopy gap · m²',result.gapM2],['Initial planting target · modelled',result.plantingTarget],['Space capacity · planting positions',result.siteCapacity],['Feasible initial plantings',result.feasiblePlantings],['Remaining canopy gap · m²',result.unmetM2]]){
      const row=document.createElement('div');row.className='metric';const l=document.createElement('span');l.textContent=label;const v=document.createElement('strong');v.textContent=fmt(value);row.append(l,v);$('metrics').append(row);
    }
    $('capacity-note').textContent=result.unmetM2>0?'This site cannot meet the chosen target under these assumptions. Review land availability and protect existing canopy; do not overcrowd planting.':'The modelled space accommodates this scenario. This is not a planting permit or a site assessment.';
    lastPlan={schemaVersion:1,name:$('name').value,createdAt:new Date().toISOString(),status:'planning-scenario-not-official-requirement',inputs,result,provenance:selected,assumptions:['Mature canopy, not immediate shade','Uniform crown and spacing','Survival assumption requires a defined planning horizon','Site ownership, utilities, ecology and species must be verified']};
  }catch(e){$('error').textContent=e.message;$('metrics').replaceChildren();$('capacity-note').textContent='No valid estimate available.';}
}
$('plan').addEventListener('submit',e=>{e.preventDefault();calculate();});
$('plan').addEventListener('input',()=>{selected=null;$('areas').value='';$('provenance').textContent='Manual edits: imported provenance no longer applies to this scenario.';calculate();});
$('export').onclick=()=>{calculate();if(lastPlan)download('chhayaplan-scenario.json',lastPlan);};
$('import').addEventListener('change',async e=>{
  $('data-status').textContent='';
  try{const f=e.target.files[0];if(!f)return;if(f.size>2000000)throw new Error('Maximum file size is 2 MB');const next=validateDataset(JSON.parse(await f.text()));areas=next;selected=null;$('areas').replaceChildren(new Option('Select an area',''));areas.forEach((a,i)=>$('areas').append(new Option(`${a.name} · ${a.evidence}`,String(i))));$('data-status').textContent=`${areas.length} records loaded. These are user-supplied and not independently verified.`;}
  catch(err){$('data-status').textContent=`Import rejected: ${err.message}`;}
});
$('areas').onchange=()=>{const a=areas[Number($('areas').value)];if($('areas').value===''||!a)return;selected=a;$('name').value=a.name;$('areaHa').value=a.areaHa;$('currentPct').value=a.currentPct;$('provenance').replaceChildren();for(const [label,k] of [['Boundary','boundarySource'],['Canopy','canopySource']]){const p=document.createElement('p'),link=document.createElement('a');link.href=a[k];link.textContent=`${label}: ${a[k]}`;link.target='_blank';link.rel='noopener';p.append(link);$('provenance').append(p);}const note=document.createElement('p');note.textContent=`${a.evidence} · reviewed ${a.reviewDate} · Method: ${a.method}. Review date is not necessarily the imagery acquisition date. Recheck freshness before decisions.`;$('provenance').append(note);calculate();};
const guidance={street:'Dense urban site: verify footpath access, building setbacks, roots, utility clearance, storm exposure and irrigation. A locally qualified urban forester must confirm the species and spacing. No species is automatically suitable for every Dhaka street.',park:'Park / school: review room for mature crowns, child safety, accessibility, soil volume and summer watering. Consider locally appropriate diverse native shade trees after a site assessment; avoid crowding existing mature trees.',wetland:'Wetland edge: verify hydrology, habitat and seasonal inundation first. Planting can damage naturally open wetlands. Obtain ecological review and landowner approval; this prototype makes no species prescription.',coast:'Coastal site: test salinity, tidal regime, erosion and substrate. Mangrove and inland coastal species are not interchangeable. Seek Forest Department guidance; do not plant on natural mudflats or alter protected habitat without authorisation.'};
function renderGuidance(){$('species-guidance').textContent=guidance[$('context').value];}$('context').onchange=renderGuidance;
let records=[];try{const saved=JSON.parse(localStorage.getItem('chhayaplan-care-v1')||'[]');if(Array.isArray(saved))records=saved.filter(r=>typeof r.site==='string'&&Number.isInteger(r.planted)&&r.planted>0&&Number.isInteger(r.alive)&&r.alive>=0&&r.alive<=r.planted&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)).slice(-500);}catch{$('care-error').textContent='Local storage unavailable or unreadable. Records will remain in memory; export a backup.';}
function renderCare(){$('care-records').replaceChildren();if(!records.length){$('care-records').textContent='No inspections recorded yet.';return;}for(const r of [...records].reverse()){const div=document.createElement('div');div.className='record';div.textContent=`${r.site} · ${r.date} · ${r.alive}/${r.planted} alive (${(100*r.alive/r.planted).toFixed(1)}%)`;$('care-records').append(div);}}
function persist(){try{localStorage.setItem('chhayaplan-care-v1',JSON.stringify(records));}catch{$('care-error').textContent='Could not save in this browser. Export a backup before closing.';}}
$('care-form').onsubmit=e=>{e.preventDefault();$('care-error').textContent='';const planted=Number($('planted').value),alive=Number($('alive').value),date=$('inspection').value,site=$('site').value.trim();if(!site||!Number.isInteger(planted)||planted<1||!Number.isInteger(alive)||alive<0||alive>planted||!date||date>new Date().toISOString().slice(0,10)){$('care-error').textContent='Use a site name, valid counts (alive ≤ planted), and an inspection date no later than today.';return;}if(records.length>=500){$('care-error').textContent='500-record limit reached. Export and clear before adding more.';return;}records.push({site,planted,alive,date});persist();renderCare();};
$('export-care').onclick=()=>download('chhayaplan-care.json',{schemaVersion:1,records});
$('clear-care').onclick=()=>{if(confirm('Delete all care records in this browser? Export first if needed.')){records=[];persist();renderCare();}};
$('inspection').value=new Date().toISOString().slice(0,10);calculate();renderGuidance();renderCare();
