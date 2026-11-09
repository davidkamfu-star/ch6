(() => {
'use strict';
const mission = {
 id:'changing-copper', topic:'Patterns in the Chemical World', title:'The Case of the Changing Copper',
 steps:['Predict','Experiment','Investigate','Explain','Apply'],
 stages:[
 {name:'Before adding ammonia', observation:'Pale blue solution', explanation:'Copper(II) ions in water are represented by a hydrated copper(II) complex.', equation:'[Cu(H₂O)₆]²⁺(aq)', colour:'#8fd1f6', model:'Six water ligands surround Cu²⁺. Water binds through oxygen.'},
 {name:'A little aqueous ammonia', observation:'Light blue precipitate forms', explanation:'Ammonia acts as a weak base in water. The hydroxide ions produced form insoluble copper(II) hydroxide.', equation:'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ · Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s)', colour:'#80c9ef', model:'Cu(OH)₂ is a solid. The particle view represents a fragment of the solid, not a separate dissolved molecule.'},
 {name:'Excess aqueous ammonia', observation:'Precipitate dissolves; deep blue solution forms', explanation:'Ammonia acts as a ligand. A soluble copper(II) complex forms with four ammonia ligands and two remaining water ligands. The equation shows the overall ligand exchange from the starting solution.', equation:'[Cu(H₂O)₆]²⁺(aq) + 4NH₃(aq) ⇌ [Cu(NH₃)₄(H₂O)₂]²⁺(aq) + 4H₂O(l)', colour:'#2153d6', model:'Four NH₃ ligands bind through nitrogen. Two opposite H₂O ligands remain. The arrow marks donation of a nitrogen lone pair to Cu²⁺.'}
 ],
 questions:{
 predict:{prompt:'What do you expect when a little aqueous ammonia is added?',choices:['A light blue solid forms.','The solution turns deep blue immediately.','A brown gas is released.'],correct:0,feedback:['Prediction recorded. Now check what happens in the beaker.','That is your prediction. The experiment will show whether deep blue appears with a little ammonia or only in excess.','Prediction recorded. Watch whether a gas or a solid appears.']},
 investigate:{prompt:'Which atom in NH₃ donates the lone pair to Cu²⁺?',choices:['A hydrogen atom','The nitrogen atom','The copper ion donates the pair to NH₃'],correct:1,feedback:['The lone pair belongs to nitrogen, not hydrogen. Look for the N → Cu arrow.','Correct. Nitrogen supplies both electrons of the coordinate bond.','The arrow points towards copper: Cu²⁺ accepts the electron pair.']},
 explain:{prompt:'Why does ammonia produce different results in the two additions?',choices:['It supplies OH⁻ at first, then acts as a ligand in excess.','It oxidises copper at first, then reduces it.','It only dilutes the solution during both additions.'],correct:0,feedback:['Correct. The first change is precipitation; the second is formation of a soluble complex by ligand exchange.','Copper stays in oxidation state +2 throughout. Look at what ammonia does in each stage.','Dilution cannot explain the formation and disappearance of a solid. Compare ammonia acting as a base and as a ligand.']},
 apply:{prompt:'An unknown solution gives the same light blue precipitate with both aqueous NaOH and aqueous NH₃. The solid dissolves in excess NH₃ but remains in excess NaOH. What best explains this difference?',choices:['Both reagents form the same soluble copper complex in excess.','NH₃ can coordinate to copper(II) to form a soluble complex.','NaOH reduces Cu²⁺ to copper metal.'],correct:1,feedback:['The precipitate remains in excess NaOH in this test. The two reagents do not give the same final result.','Correct. Both reagents can supply OH⁻ initially, but excess NH₃ forms the soluble deep blue complex.','No copper metal is formed in this test. Copper remains in oxidation state +2.']}
 }
};
const $ = id => document.getElementById(id);
const key = 'chemmaster-world-v1:'+mission.id;
const initial = () => ({unlocked:0,step:0,experiment:0,prediction:null,viewed:false,sequence:false,logged:false,finished:false});
let state=initial();
try { Object.assign(state,JSON.parse(localStorage.getItem(key)||'{}')); } catch {}
let stage=state.experiment, mode='beaker', flat=false, timer=null, yaw=.48,pitch=.28, drag=null;
let ctx=null;const canvas=$('scene');
try{ctx=canvas.getContext('2d')}catch{}
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));return true}catch{return false}};
const el=(tag,t)=>{const n=document.createElement(tag);if(t!==undefined)n.textContent=t;return n};
function button(label,fn,cls=''){const b=el('button',label);b.type='button';b.className=cls;b.addEventListener('click',fn);return b}
function feedback(msg,tone=''){const f=$('feedback');f.hidden=!msg;f.textContent=msg;f.dataset.tone=tone}
function hint(parent,message){const d=el('details');d.append(el('summary','Show a hint'),el('p',message));parent.append(d)}
function question(parent,q,callback){parent.append(el('p',q.prompt));const choices=el('div');choices.className='choices';q.choices.forEach((label,i)=>choices.append(button(label,e=>{for(const b of choices.children){b.classList.remove('right','wrong');b.setAttribute('aria-pressed','false')}e.currentTarget.setAttribute('aria-pressed','true');callback(i,e.currentTarget)},'choice')));parent.append(choices);return choices}
function advance(){state.unlocked=Math.max(state.unlocked,state.step+1);go(state.step+1)}
function go(i){stop();state.step=i;save();render();$('task-title').focus()}
function complete(){
 state.finished=true;save();
 try{
  const tools=window.ChemistryTools;
  if(!state.logged&&tools){
   if(!tools.progress().history.some(x=>x.key===key))tools.logSession({type:'game',key,topic:mission.topic,label:'ChemMaster World · '+mission.title,score:3,total:3});
   state.logged=true;save();
  }
 }catch{}
 render();$('task-title').focus();
}
function setStage(i){stage=Math.max(0,Math.min(state.experiment,i));renderScene()}
function stop(){if(timer!==null)clearInterval(timer);timer=null;renderScene()}
function play(){if(!state.experiment||timer!==null)return;if(stage===state.experiment)stage=0;
 timer=setInterval(()=>{setStage(stage+1);if(stage>=state.experiment)stop()},1650);renderScene()}
function render(){
 const task=$('task');task.replaceChildren();feedback('');
 $('step-label').textContent='FIELD TASK '+(state.step+1)+' / '+mission.steps.length;
 $('task-title').textContent=state.finished&&state.step===4?'Case closed':mission.steps[state.step];
 $('map').replaceChildren(...mission.steps.map((label,i)=>{const li=el('li'),b=button(label,()=>go(i));b.prepend(el('span',i<state.unlocked||(i===4&&state.finished)?'✓':String(i+1).padStart(2,'0')));b.disabled=i>state.unlocked;if(i===state.step)b.setAttribute('aria-current','step');li.append(b);return li}));
 if(state.step===0){
  if(state.prediction!==null){
   task.append(el('p','Your prediction: '+mission.questions.predict.choices[state.prediction]),button('Enter the lab',advance,'primary'));
  }else question(task,mission.questions.predict,i=>{state.prediction=i;save();render();feedback(mission.questions.predict.feedback[i]);task.querySelector('button').focus()});
 }
 if(state.step===1){
  task.append(el('p','Add aqueous ammonia in two steps. Read the observation in the replay panel after each addition.'));
  const actions=el('div');actions.className='actions';
  const little=button('Add a little ammonia',()=>dose(1),'primary');little.disabled=state.experiment!==0;
  const excess=button('Add excess ammonia',()=>dose(2),'primary');excess.disabled=state.experiment!==1;
  actions.append(little,excess);task.append(actions);
  if(state.experiment===2)task.append(el('p','Both observations are now in your evidence locker.'),button('Investigate the particles',advance,'primary'));
 }
 if(state.step===2){
  task.append(el('p','Open the final particle view and locate the arrow from nitrogen to copper. Drag the model or use the rotation controls.'),button('Inspect the final complex',()=>{stop();stage=2;chooseView('particle');feedback('Find the arrow from N towards Cu²⁺.');},'primary'));
  question(task,mission.questions.investigate,(i,b)=>{
   if(!state.viewed){feedback('Inspect the final complex first.');return}
   answer(i,b,mission.questions.investigate,advance);
  });
  hint(task,'The atom at the centre of an NH₃ molecule has one lone pair.');
 }
 if(state.step===3){
  const labels=['Pale blue solution','Light blue precipitate','Deep blue solution'];
  task.append(el('p','Put the observations in order, then explain why they happen.'));
  const seq=el('div');seq.className='sequence';
  for(let i=0;i<3;i++){const lab=el('label',['First','Next','Finally'][i]);const sel=el('select');sel.append(new Option('Choose an observation',''));for(const j of [2,0,1])sel.append(new Option(labels[j],j));if(state.sequence)sel.value=i;sel.addEventListener('change',()=>{state.sequence=false;$('continue-step')?.remove();save()});lab.append(sel);seq.append(lab)}
  task.append(seq,button('Check sequence',()=>{state.sequence=[...seq.querySelectorAll('select')].every((x,i)=>x.value===String(i));save();feedback(state.sequence?'Correct sequence. Now explain the two roles of ammonia.':'Try again. Compare the three labelled stages in the replay panel.',state.sequence?'correct':'')}));
  question(task,mission.questions.explain,(i,b)=>{
   if(!state.sequence){feedback('Check the observation sequence first.');return}
   answer(i,b,mission.questions.explain,advance);
  });
  hint(task,'A precipitate is a solid. A soluble complex remains in solution.');
 }
 if(state.step===4){
  if(state.finished){task.append(el('p','You sequenced the observations, traced the coordinate bond and explained why the two reagents behave differently.'),el('p',state.logged?'3 case checks completed. This mission is recorded in My Progress.':'3 case checks completed.'),button('Review the experiment',()=>go(1),'primary'));const a=el('a','Open My Progress →');a.href='mistakes.html#progressMonitor';const p=el('p');p.append(a);task.append(p);}
  else{question(task,mission.questions.apply,(i,b)=>answer(i,b,mission.questions.apply,complete,'Close the case'));hint(task,'Compare which reagent can act as a ligand in this experiment.');}
 }
 renderEvidence();renderScene();
}
function answer(i,b,q,onPass,label='Continue'){
 b.classList.add(i===q.correct?'right':'wrong');feedback(q.feedback[i],i===q.correct?'correct':'');
 const previous=$('continue-step');if(previous)previous.remove();
 if(i===q.correct){const next=button(label,onPass,'primary');next.id='continue-step';$('task').append(next);}
}
function dose(n){stop();state.experiment=stage=n;mode='beaker';save();render();feedback(mission.stages[n].observation,'correct');$('task').querySelector('button:not(:disabled)')?.focus()}
function renderEvidence(){const list=$('evidence');list.replaceChildren();const seen=mission.stages.slice(0,state.experiment+1);for(const item of seen){const li=el('li');li.append(el('b',item.name+': '),document.createTextNode(item.observation));list.append(li)}if(state.unlocked>=3){const li=el('li');li.append(el('b','Bond clue: '),document.createTextNode('Nitrogen donates a lone pair to Cu²⁺.'));list.append(li)}}
function chooseView(view){
 if(view==='diagram')flat=!flat;else{mode=view;flat=false;}
 if(mode==='particle'&&stage===2){state.viewed=true;save();}
 renderScene();
}
function renderScene(){
 const s=mission.stages[stage];
 if(mode==='particle'&&stage===2&&!state.viewed){state.viewed=true;save()}
 $('stage-name').textContent=s.name;$('observation').textContent=s.observation;$('explanation').textContent=s.explanation;$('equation').textContent=s.equation;
 $('stage-count').textContent=(stage+1)+' / '+(state.experiment+1);
 const slider=$('timeline');slider.value=stage;slider.max=state.experiment;slider.disabled=!state.experiment;slider.setAttribute('aria-valuetext',s.name);
 $('prev').disabled=stage===0;$('next').disabled=stage>=state.experiment;$('play').disabled=!state.experiment||timer!==null;$('pause').disabled=timer===null;
 $('beaker').setAttribute('aria-pressed',mode==='beaker');$('particle').setAttribute('aria-pressed',mode==='particle');$('particle').disabled=state.unlocked<2;
 $('diagram').setAttribute('aria-pressed',flat||!ctx);$('diagram').disabled=!ctx;
 const useFlat=flat||!ctx;canvas.hidden=useFlat;$('fallback').hidden=!useFlat;
 $('rotation').hidden=mode!=='particle'||useFlat||stage===1;canvas.classList.toggle('rotate',!$('rotation').hidden);
 $('model-note').textContent=mode==='particle'?'Simplified particle model · '+s.model:'Beaker view · Observe the sample as it would appear in the lab.';
 if(useFlat)drawFlat(s);else draw(s);
}
const ligands=[[1,0,0],[0,0,-1],[-1,0,0],[0,0,1],[0,1.2,0],[0,-1.2,0]];
function project([x,y,z]){const u=x*Math.cos(yaw)-z*Math.sin(yaw),v=x*Math.sin(yaw)+z*Math.cos(yaw),w=y*Math.cos(pitch)-v*Math.sin(pitch),depth=y*Math.sin(pitch)+v*Math.cos(pitch),k=125/(1-depth*.12);return {x:360+u*k,y:220-w*k,z:depth}}
function draw(s){
 ctx.clearRect(0,0,720,440);if(mode==='beaker'){drawBeaker(s);return}
 if(stage===1){
  for(let i=0;i<12;i++){const x=222+(i%4)*90+Math.floor(i/4)%2*21,y=125+Math.floor(i/4)*89;orb({x,y},i%2?22:31,i%2?'#e3a356':'#71b7ed',i%2?'OH':'Cu');}
  return;
 }
 const centre=project([0,0,0]), pts=ligands.map((p,i)=>({...project(p),i})).sort((a,b)=>a.z-b.z);
 for(const p of pts){ctx.strokeStyle='#9eacc6';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(centre.x,centre.y);ctx.lineTo(p.x,p.y);ctx.stroke();}
 for(const p of pts.filter(p=>p.z<0))ligand(p);
 orb(centre,35,'#e8a65d','Cu²⁺');
 for(const p of pts.filter(p=>p.z>=0))ligand(p);
 if(stage===2){
  const a=pts.filter(p=>p.i<4).at(-1);const dx=centre.x-a.x,dy=centre.y-a.y,len=Math.hypot(dx,dy);if(len>56){
   const x=a.x+dx*.39,y=a.y+dy*.39,endX=a.x+dx*.68,endY=a.y+dy*.68,angle=Math.atan2(dy,dx);
   ctx.fillStyle=ctx.strokeStyle='#ffe18a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(endX,endY);ctx.stroke();
   ctx.beginPath();ctx.moveTo(endX,endY);ctx.lineTo(endX-13*Math.cos(angle-.46),endY-13*Math.sin(angle-.46));ctx.lineTo(endX-13*Math.cos(angle+.46),endY-13*Math.sin(angle+.46));ctx.closePath();ctx.fill();
   for(const side of [-1,1]){ctx.beginPath();ctx.arc(x+side*5*Math.sin(angle),y-side*5*Math.cos(angle),3,0,Math.PI*2);ctx.fill();}
  }
 }
 function ligand(p){const ammine=stage===2&&p.i<4;orb(p,26,ammine?'#8fa9ff':'#ffa7a9',ammine?'N':'O');ctx.fillStyle='#e4edff';ctx.font='bold 17px system-ui';ctx.textAlign='center';ctx.fillText(ammine?'NH₃':'H₂O',p.x,p.y+44);}
}
function orb(p,r,c,label){const g=ctx.createRadialGradient(p.x-r*.34,p.y-r*.36,1,p.x,p.y,r);g.addColorStop(0,'#fff');g.addColorStop(.35,c);g.addColorStop(1,'#354867');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#101a34';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold '+(r*.55)+'px system-ui';ctx.fillText(label,p.x,p.y);ctx.textBaseline='alphabetic';}
function ellipse(x,y,w,h){ctx.beginPath();ctx.ellipse(x,y,w,h,0,0,Math.PI*2)}
function drawBeaker(s){
 const x=360,top=85,bottom=339,rx=125,ry=30,liquid=180;
 ellipse(x,370,153,24);ctx.fillStyle='#0a1325';ctx.fill();
 const glass=ctx.createLinearGradient(x-rx,0,x+rx,0);glass.addColorStop(0,'#addef955');glass.addColorStop(.18,'#8fc2df14');glass.addColorStop(.8,'#8fc2df14');glass.addColorStop(1,'#b9e3fb55');
 function body(y){ctx.beginPath();ctx.moveTo(x-rx,y);ctx.lineTo(x-rx,bottom);ctx.ellipse(x,bottom,rx,ry,0,Math.PI,0,true);ctx.lineTo(x+rx,y);ctx.ellipse(x,y,rx,ry,0,0,Math.PI,true);ctx.closePath();}
 body(liquid);ctx.globalAlpha=stage===2?.82:.41;ctx.fillStyle=s.colour;ctx.fill();ctx.globalAlpha=1;
 ellipse(x,liquid,rx,ry);ctx.globalAlpha=stage===2?.82:.45;ctx.fillStyle=s.colour;ctx.fill();ctx.globalAlpha=1;
 if(stage===1){for(let i=0;i<25;i++){const dx=((i*43)%203)-101,dy=((i*17)%35);ellipse(x+dx,310+dy,8+(i%4)*3,6+(i%3)*2);ctx.fillStyle=i%3?'#8ad6ff':'#b8e8ff';ctx.fill();}}
 body(top);ctx.fillStyle=glass;ctx.fill();ctx.strokeStyle='#b3d6ea';ctx.lineWidth=3;ctx.stroke();
 ellipse(x,top,rx,ry);ctx.stroke();ctx.beginPath();ctx.moveTo(x+105,67);ctx.lineTo(x+146,75);ctx.lineTo(x+121,99);ctx.stroke();
 ctx.strokeStyle='#d2eafa85';ctx.lineWidth=2;for(let i=0;i<6;i++){const y=126+i*25;ctx.beginPath();ctx.moveTo(x-105,y);ctx.lineTo(x-105+(i%2?23:36),y);ctx.stroke();}
}
function drawFlat(s){
 let content='';
 if(mode==='beaker'){
 content='<path d="M235 75V337Q235 366 360 366T485 337V75" fill="none" stroke="#b3d6ea" stroke-width="4"/><path d="M237 175H483V337Q483 363 360 363T237 337Z" fill="'+s.colour+'" opacity=".85"/>';
 if(stage===1)for(let i=0;i<16;i++)content+='<circle cx="'+(253+i*14)+'" cy="'+(325+i%3*8)+'" r="10" fill="#b9ecff"/>';
 }else if(stage===1){
 content='<rect x="210" y="140" width="300" height="150" rx="24" fill="#8ed4fa"/><text x="360" y="224" fill="#16253d" text-anchor="middle" font-size="30" font-family="system-ui">Cu(OH)₂ solid</text>';
 }else{
 const points=[[215,220],[505,220],[360,92],[360,348],[265,135],[455,305]];
 points.forEach(([x,y])=>content+='<path d="M360 220L'+x+' '+y+'" stroke="#c4d7f2" stroke-width="5"/>');
 points.forEach(([x,y],i)=>content+='<circle cx="'+x+'" cy="'+y+'" r="31" fill="'+(stage===2&&[0,1,4,5].includes(i)?'#97aeff':'#ffa7a9')+'"/><text x="'+x+'" y="'+(y+7)+'" text-anchor="middle" font-size="21" font-family="system-ui">'+(stage===2&&[0,1,4,5].includes(i)?'NH₃':'H₂O')+'</text>');
 content+='<circle cx="360" cy="220" r="37" fill="#e8a65d"/><text x="360" y="227" text-anchor="middle" font-size="23" font-family="system-ui">Cu²⁺</text>';
 if(stage===2)content+='<path d="M255 220H311L298 213M311 220L298 227" stroke="#ffe18a" stroke-width="4" fill="none"/><circle cx="252" cy="214" r="3" fill="#ffe18a"/><circle cx="252" cy="226" r="3" fill="#ffe18a"/>';
 }
 $('fallback').innerHTML='<svg viewBox="0 0 720 440" role="img" aria-label="2D diagram of current lab stage">'+content+'</svg>';
}
function rotate(x,y){yaw+=x*.2;pitch=Math.max(-1.35,Math.min(1.35,pitch+y*.2));if(ctx)draw(mission.stages[stage])}
for(const id of ['beaker','particle','diagram'])$(id).onclick=()=>chooseView(id);
$('prev').onclick=()=>{stop();setStage(stage-1)};$('next').onclick=()=>{stop();setStage(stage+1)};$('play').onclick=play;$('pause').onclick=stop;
$('timeline').oninput=e=>{const target=+e.target.value;stop();setStage(target)};
$('reset-view').onclick=()=>{yaw=.48;pitch=.28;rotate(0,0)};
for(const b of document.querySelectorAll('[data-rotate]'))b.onclick=()=>rotate(...b.dataset.rotate.split(',').map(Number));
canvas.addEventListener('keydown',e=>{const v={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(v&&!$('rotation').hidden){e.preventDefault();rotate(...v)}});
canvas.addEventListener('pointerdown',e=>{if(!$('rotation').hidden){drag=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId)}});
canvas.addEventListener('pointermove',e=>{if(drag){rotate((e.clientX-drag[0])*.035,(e.clientY-drag[1])*.035);drag=[e.clientX,e.clientY]}});
for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>{drag=null});
render();
})();
