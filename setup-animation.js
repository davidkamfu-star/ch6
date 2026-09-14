(function(){
'use strict';
const NS='http://www.w3.org/2000/svg';
// Paths follow the lumen and water jacket of the supplied apparatus figures.
const models={
 'setup-apparatus/03.webp':{vapour:[[211,674],[211,420],[285,452]],liquid:[[285,452],[560,570],[590,638],[590,815]],water:[[485,576],[490,536],[333,451],[332,350]]},
 'setup-apparatus/04.webp':{vapour:[[252,791],[251,368],[309,358]],liquid:[[309,358],[585,458],[601,518],[601,655]],water:[[504,493],[507,459],[355,369],[358,310]],fraction:true},
 'setup-apparatus/23.webp':{vapour:[[280,545],[280,345],[303,362]],liquid:[[303,362],[455,524],[470,576],[470,799]],water:[[430,549],[430,516],[329,397],[330,333]],reflux:{vapour:[[749,663],[749,540],[749,265]],liquid:[[746,265],[746,532],[749,663]],water:[[709,443],[738,426],[738,132],[792,122]]}}
};
let dispose=()=>{};
const element=(tag,attrs={})=>{const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el};
function point(points,t){const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));let d=t*lengths.reduce((a,b)=>a+b,0);for(let i=0;i<lengths.length;i++){if(d<=lengths[i]){const f=d/lengths[i];return [points[i][0]+f*(points[i+1][0]-points[i][0]),points[i][1]+f*(points[i+1][1]-points[i][1])]}d-=lengths[i]}return points.at(-1)}
document.addEventListener('setup-selected',e=>{
 dispose();const config=models[e.detail.figure.file];if(!config)return;
 const figure=document.querySelector('.source-figure'),img=figure.querySelector('img'),scroll=figure.querySelector('.figure-scroll');
 const wrap=document.createElement('div');wrap.className='animated-figure';scroll.insertBefore(wrap,img);wrap.appendChild(img);
 const svg=element('svg',{viewBox:'0 0 1000 1000',preserveAspectRatio:'none','aria-hidden':'true',class:'process-overlay'});wrap.appendChild(svg);
 const panel=document.createElement('section');panel.className='process-controls';panel.setAttribute('aria-label','Interactive experiment controls');
 panel.innerHTML=`<p class="eyebrow">OPERATE THIS APPARATUS</p><h3>Follow the flow through the glassware</h3>${config.reflux?'<label>Apparatus <select id="processMode"><option value="distill">Distillation · left apparatus</option><option value="reflux">Reflux · right apparatus</option></select></label>':''}<div class="process-buttons"><button id="waterSwitch" aria-pressed="false">Start cooling water</button><button id="heatSwitch" aria-pressed="false">Apply gentle heat</button><button id="processPause" disabled>Pause</button><button id="processStep">Advance 1 second</button><button id="processReset">Reset experiment</button></div><label>Playback speed <select id="processSpeed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label><p class="process-key"><span>● Cooling water</span><span>● Vapour</span><span>● Condensed liquid</span></p><p id="processStatus" role="status"></p><p id="processReadout"></p><p class="process-note">Coloured markers show the direction of flow; they are not individual molecules. Time and drop counts are illustrative. Cooling water stays in the jacket, separate from the sample. Heat off stops the animation immediately; real apparatus cools gradually.</p>`;
 figure.appendChild(panel);
 const $=id=>panel.querySelector('#'+id);let water=false,heat=false,paused=false,time=0,clock=0,last=0,frame=0,mode='distill';
 let tracks=[];
 function build(){svg.replaceChildren();tracks=[];const c=mode==='reflux'?config.reflux:config;for(const [type,color] of [['water','#007ca6'],['vapour','#d56505'],['liquid','#783dc0']]){const pts=c[type],path=element('polyline',{points:pts.map(p=>p.join(',')).join(' '),fill:'none',stroke:color,'stroke-width':3,'stroke-opacity':.32,'stroke-dasharray':'7 5'});svg.appendChild(path);const dots=Array.from({length:6},()=>{const dot=element('circle',{r:5,fill:color,stroke:'white','stroke-width':1.5});svg.appendChild(dot);return dot});tracks.push({type,pts,path,dots});}}
 function draw(){for(const track of tracks){const on=track.type==='water'?water:heat&&time>=6;track.path.style.display=on?'':'none';track.dots.forEach((dot,i)=>{dot.style.display=on?'':'none';const p=point(track.pts,(clock/3+i/6)%1);dot.setAttribute('cx',p[0]);dot.setAttribute('cy',p[1])})}}
 function update(message){$('waterSwitch').textContent=water?'Stop cooling water':'Start cooling water';$('waterSwitch').setAttribute('aria-pressed',water);$('heatSwitch').textContent=heat?'Switch heat off':'Apply gentle heat';$('heatSwitch').setAttribute('aria-pressed',heat);$('processPause').disabled=!water&&!heat;$('processPause').textContent=paused?'Resume':'Pause';
 const drops=Math.max(0,Math.floor((time-6)/1.2));$('processReadout').textContent=`${time.toFixed(1)} simulated seconds · ${mode==='reflux'?'Drops returned to flask':'Drops reaching receiver'}: ${drops}`;
 const status=message||(time>=30?'Demonstration complete. Heat is off. Reset to repeat.':paused?'Paused. Use Advance 1 second to inspect the flow.':!water?'Start cooling water before applying heat.':!heat?'Cooling water enters at the lower connection and leaves at the upper one. Apply gentle heat.':time<6?'Warming the sample. Cooling water is flowing through the jacket.':mode==='reflux'?'Vapour rises, condenses in the vertical condenser and returns to the same flask. No distillate is collected.':config.fraction?'Vapour passes through the column, then condenses and flows to the receiver. Repeated condensation in the column enriches the more volatile component.':'Vapour enters the inclined condenser, changes to liquid and flows into the separate receiver.');if($('processStatus').textContent!==status)$('processStatus').textContent=status;}
 function advance(dt){clock+=dt;if(heat)time+=dt;if(time>=30){time=30;heat=false;draw();update('Demonstration complete. Heat is off; cooling water remains on. Reset to repeat.');return}draw();update()}
 function loop(now){const dt=last?Math.min((now-last)/1000,.1):0;last=now;if(!paused&&!document.hidden&&!figure.hidden&&(water||heat))advance(dt*Number($('processSpeed').value));frame=requestAnimationFrame(loop)}
 $('waterSwitch').onclick=()=>{water=!water;if(!water&&heat){heat=false;draw();update('Cooling water stopped. Heat has been switched off automatically to avoid uncondensed vapour.')}else{draw();update()}};
 $('heatSwitch').onclick=()=>{if(!water){update('First start cooling water so vapour can condense.');return}if(time>=30){update('Reset the completed demonstration before reheating.');return}heat=!heat;paused=matchMedia('(prefers-reduced-motion: reduce)').matches;draw();update()};
 $('processPause').onclick=()=>{paused=!paused;update()};$('processStep').onclick=()=>{paused=true;if(!water){update('Start cooling water, then apply heat before advancing the experiment.');return}advance(1)};
 function reset(){water=false;heat=false;paused=matchMedia('(prefers-reduced-motion: reduce)').matches;time=0;clock=0;build();draw();update()}
 $('processReset').onclick=reset;if($('processMode'))$('processMode').onchange=()=>{mode=$('processMode').value;reset()};reset();frame=requestAnimationFrame(loop);
 dispose=()=>{cancelAnimationFrame(frame);panel.remove();};
});
})();
