(() => {
'use strict';
const $=id=>document.getElementById(id);
const factors={
 concentration:{duration:26,text:'Use more concentrated hydrochloric acid, keeping its volume, the temperature and the size of the pieces the same.',why:'More acid particles per unit volume increase the frequency of collisions at the solid surface.'},
 surface:{duration:32,text:'Use smaller pieces, keeping their total mass, the acid concentration and volume, and the temperature the same.',why:'Smaller pieces of the same total mass expose more surface for collisions.'},
 temperature:{duration:29,text:'Use a higher reaction temperature, keeping the acid concentration and volume, and the size of the pieces the same.',why:'At higher temperature, a greater fraction of collisions have energy at least equal to the activation energy.'}
};
const key='chemmaster-world-v1:reaction-rate';
let timer=null, time=0, started=false, reachedEnd=false, completed=false;
try{completed=localStorage.getItem(key)==='complete'}catch{}
const volume=(t,d)=>80*(1-Math.max(0,1-t/d)**2.5);
function plot(d){let points=[];for(let i=0;i<=time;i++)points.push((i?'L':'M')+(65+i*428/60).toFixed(1)+' '+(265-volume(i,d)*230/80).toFixed(1));return points.join(' ')}
function draw(){
 const d=factors[$('factor').value].duration, a=volume(time,53), b=volume(time,d);
 $('ref-curve').setAttribute('d',plot(53));$('changed-curve').setAttribute('d',plot(d));
 $('time').value=time;$('clock').textContent=time+' s';
 $('ref-value').textContent=a.toFixed(1)+' cm³';$('changed-value').textContent=b.toFixed(1)+' cm³';
 $('chart-desc').textContent='At '+time+' simulated seconds: reference '+a.toFixed(1)+' cubic centimetres; changed run '+b.toFixed(1)+' cubic centimetres.';
 $('play').disabled=!started||timer!==null;$('pause').disabled=timer===null;
 $('reset').disabled=$('time').disabled=!started;
}
function stop(){clearInterval(timer);timer=null;draw()}
function setTime(t){
 time=t;
 if(time===60&&!reachedEnd){
  reachedEnd=true;$('analysis').hidden=false;
  const choice=document.querySelector('input[name=predict]:checked')?.value;
  $('finding').textContent=(choice==='same'?'Your prediction matches the model. ':'Compare your prediction with the plateaux. ')+'Both runs finish at 80 cm³. Now explain the difference in their starting gradients.';
 }
 draw();
}
function play(){if(!started||timer!==null)return;if(time===60)setTime(0);timer=setInterval(()=>{setTime(time+1);if(time===60)stop()},95);draw()}
function resetTrial(){
 started=false;reachedEnd=false;time=0;stop();
 $('settings').textContent=factors[$('factor').value].text;
 $('analysis').hidden=true;$('analysis').reset();$('feedback').textContent='';
 $('finding').textContent=completed?'Mission complete on this browser. You can try another fair test.':'';
 for(const radio of document.querySelectorAll('input[name=predict]'))radio.checked=false;
 $('run').disabled=true;
}
$('factor').onchange=resetTrial;
for(const radio of document.querySelectorAll('input[name=predict]'))radio.onchange=()=>{$('run').disabled=false};
$('run').onclick=()=>{stop();started=true;reachedEnd=false;$('analysis').hidden=true;$('analysis').reset();$('feedback').textContent='';$('finding').textContent='Watch how the curves rise. Then compare where they level off.';setTime(0);play()};
$('play').onclick=play;$('pause').onclick=stop;$('reset').onclick=()=>{stop();setTime(0)};
$('time').oninput=e=>{const t=+e.target.value;stop();setTime(t)};
$('analysis').onsubmit=e=>{
 e.preventDefault();
 const factor=$('factor').value;
 let msg='';
 if($('slope').value!=='changed')msg='Compare the curves near time zero. The steeper curve shows more gas produced per second.';
 else if($('cause').value!==factor)msg='Recheck the condition you changed. '+factors[factor].why;
 else if($('plateau').value!=='same')msg='The acid is in excess. The same amount of calcium carbonate limits the gas yield in each run.';
 if(msg){$('feedback').textContent=msg;return}
 completed=true;
 let recorded=false;
 try{
  const tools=window.ChemistryTools;
  if(tools){
   if(!tools.progress().history.some(x=>x.key===key))tools.logSession({type:'game',key,topic:'Rate of Reaction',label:'ChemMaster World · Reaction Rate Lab',score:3,total:3});
   recorded=true;
  }
  localStorage.setItem(key,'complete');
 }catch{}
 $('feedback').textContent='Mission complete. '+factors[factor].why+' The faster run reaches the same final gas volume sooner.'+(recorded?' Recorded in My Progress.':'');
};
resetTrial();
})();
