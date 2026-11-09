(() => {
'use strict';
const $=id=>document.getElementById(id), key='chemmaster-world-v1:electrolysis';
const cases={
 graphite:{title:'Graphite electrodes',instructions:'Both electrodes are graphite. Predict the anode product, then observe what happens as charge passes.',anode:'oxygen',colour:'fades',prediction:'oxygen',observation:['Circuit off','Copper begins depositing at the cathode; oxygen bubbles appear at the anode.','More copper deposits and more oxygen forms. The solution becomes paler.','Graphite case: copper at the cathode, oxygen at the anode, and a paler solution.'],detail:'Cu²⁺ ions gain electrons at the cathode. Water is oxidised at the inert anode, so removed Cu²⁺ ions are not replaced.'},
 copper:{title:'Copper electrodes',instructions:'Replace both graphite electrodes with copper. The solution and the charge passed are otherwise the same.',anode:'copper',colour:'steady',prediction:'dissolve',observation:['Circuit off','Copper begins depositing at the cathode while the copper anode dissolves.','The cathode gains mass and the anode loses mass. The blue colour stays approximately constant.','Copper case: copper transfers from the anode to the cathode. No oxygen is expected in this model.'],detail:'At the cathode: Cu²⁺ + 2e⁻ → Cu. At the anode: Cu → Cu²⁺ + 2e⁻. The anode replaces the Cu²⁺ removed at the cathode.'}
};
let done={graphite:false,copper:false};try{const stored=JSON.parse(localStorage.getItem(key)||'{}');for(const x of Object.keys(done))done[x]=stored[x]===true}catch{}
let current='graphite',stage=0,timer=null,started=false,observed=false;
function save(){try{localStorage.setItem(key,JSON.stringify(done))}catch{}}
function stop(){clearInterval(timer);timer=null;draw()}
function draw(){
 const c=cases[current],isCu=current==='copper';
 $('case-title').textContent=c.title;$('stage-count').textContent=stage+' / 3';$('replay').value=stage;
 $('cathode').setAttribute('fill',isCu?'#b57346':'#65758c');$('anode').setAttribute('fill',isCu?'#b57346':'#65758c');
 $('anode').setAttribute('width',isCu?28-stage*5:28);
 $('deposit').setAttribute('opacity',stage?.95:0);
 $('deposit').setAttribute('width',30+stage*3);
 $('bubbles').setAttribute('opacity',!isCu&&stage?1:0);
 $('solution').setAttribute('opacity',isCu?.72:.72-stage*.14);
 $('flow').textContent=stage?'Power on · electrons supplied to the cathode':'Circuit off';
 $('observation').textContent=started?c.observation[stage]:'Make your prediction first.';
 $('detail').textContent=stage?c.detail:'';
 $('cell-desc').textContent=c.title+': '+$('observation').textContent;
 $('previous').disabled=!started||stage===0;$('next').disabled=!started||stage===3;
 $('play').disabled=!started||timer!==null;$('pause').disabled=timer===null;$('replay').disabled=!started;
}
function setStage(n){stage=n;if(stage===3){observed=true;$('analysis').hidden=false}draw()}
function play(){if(!started||timer!==null)return;if(stage===3)setStage(0);timer=setInterval(()=>{setStage(stage+1);if(stage===3)stop()},1200);draw()}
function evidence(){
 $('evidence').replaceChildren();
 for(const [id,c] of Object.entries(cases)){
 const row=document.createElement('tr');
 for(const text of [c.title,done[id]?(id==='graphite'?'Oxygen bubbles':'Copper dissolves'):'Not yet solved',done[id]?(id==='graphite'?'Paler':'Approximately constant'):'—']){const td=document.createElement('td');td.textContent=text;row.append(td)}
 $('evidence').append(row);
 }
 $('report').textContent='Cases solved: '+Object.values(done).filter(Boolean).length+' / 2'+(done.graphite&&done.copper?'\nMission complete. Try Topic VII practice next.':'\nSolve both electrode cases to complete the mission.');
}
function choose(id){
 stop();current=id;started=false;observed=false;stage=0;
 $('instructions').textContent=cases[id].instructions;
 $('prediction').reset();$('analysis').reset();$('analysis').hidden=true;
 $('feedback').textContent=$('prediction-feedback').textContent='';
 for(const name of Object.keys(cases))$(name).setAttribute('aria-pressed',name===id);
 draw();evidence();
}
for(const id of Object.keys(cases))$(id).onclick=()=>choose(id);
$('prediction').onsubmit=e=>{e.preventDefault();stop();started=true;stage=0;observed=false;$('analysis').hidden=true;$('analysis').reset();$('feedback').textContent='';$('prediction-feedback').textContent='Prediction recorded. Compare it with the observations.';play()};
$('play').onclick=play;$('pause').onclick=stop;$('previous').onclick=()=>{stop();setStage(stage-1)};$('next').onclick=()=>{stop();setStage(stage+1)};
$('replay').oninput=e=>{const n=+e.target.value;stop();setStage(n)};
$('analysis').onsubmit=e=>{
 e.preventDefault();if(!observed)return;
 const c=cases[current];let message='';
 if($('cathode-answer').value!=='reduction')message='The negative cathode supplies electrons. Cu²⁺ gains two electrons and deposits as copper metal.';
 else if($('anode-answer').value!==c.anode)message=current==='graphite'?'Graphite is inert here. Water is oxidised to oxygen; electrons belong on the right of the anode equation.':'The active copper anode loses electrons and dissolves as Cu²⁺. This is oxidation.';
 else if($('colour-answer').value!==c.colour)message=c.detail;
 if(message){$('feedback').textContent=message;return}
 done[current]=true;save();$('feedback').textContent='Case solved. '+c.detail+($('predict').value===c.prediction?' Your prediction matched the observation.':' Your prediction differed: use the observation to revise it.');
 if(done.graphite&&done.copper){
 try{const t=window.ChemistryTools;if(t&&!t.progress().history.some(x=>x.key===key))t.logSession({type:'game',key,topic:'Redox Reactions, Chemical Cells and Electrolysis',label:'ChemMaster World · Electrolysis Workshop',score:6,total:6})}catch{}
 }
 evidence();
};
choose(current);
})();
