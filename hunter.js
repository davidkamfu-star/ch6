(()=>{
'use strict';
const bank=window.CHEM_MOCK_BANK,sel=document.querySelector('#topic'),box=document.querySelector('#game');
if(!bank?.length){box.textContent='Question bank unavailable. Refresh or try ordinary topic practice.';return}
bank.forEach((t,i)=>sel.add(new Option(t.name,i)));let requested=Number(new URLSearchParams(location.search).get('topic'))-1;sel.value=bank[requested]?requested:0;
const names=['Pebble Pip','Echo Moth','Dusk Hopper','Lantern Lynx','Moss Glider','Ripple Finch','Frost Scout','Amber Wisp'],traits=[['round tracks','forked tracks'],['striped coat','spotted coat'],['single chirp','double chirp']],stops=['Creek crossing','Lookout hide','Echo cave'],bits=(n,i)=>(n>>i)&1;
const topic=()=>bank[sel.value],key=()=>'chem-hunter-v1:'+sel.value,read=()=>{try{return JSON.parse(localStorage.getItem(key()))}catch{return null}};let s=read();function save(){try{localStorage.setItem(key(),JSON.stringify(s))}catch{}}
function el(tag,txt,parent=box){let e=document.createElement(tag);e.textContent=txt;parent.append(e);return e}
function btn(txt,fn,parent=box){let e=el('button',txt,parent);e.onclick=fn;return e}
function begin(){let ids=topic().questions.map((_,i)=>i);for(let i=ids.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}s={id:'hunt-'+Date.now()+'-'+Math.random(),ids:ids.slice(0,3),target:Math.floor(Math.random()*8),trail:[],first:{},site:null,choice:null,guess:null,done:false};save();draw()}
function draw(){box.replaceChildren();let h=el('h2',topic().name+' · Field contract');h.tabIndex=-1;h.focus({preventScroll:true});
if(!s){el('p','Choose which site to scout first. Each chemistry challenge unlocks one fictional wildlife clue. Compare all three with your field guide to identify the visitor.');btn('Accept the hunt →',begin);return}
let track=el('div','');track.className='tracks';stops.forEach((name,i)=>{let found=s.trail.includes(i);el('span',found?'✓ '+traits[i][bits(s.target,i)]:'? '+name,track).className=found?'found':''});
if(s.done){el('h3','Specimen spotted: '+names[s.target]);el('p','Your field notes: '+traits.map((a,i)=>a[bits(s.target,i)]).join(' · '));let score=s.ids.filter((id,i)=>s.first[i]===topic().questions[id].answer).length;el('p',score+'/3 chemistry clues solved first try · '+(3-score)+' solved after feedback.');btn('Take a new contract',begin);return}
if(s.trail.length===3){el('h3','Who crossed the station?');el('p','Use the tracks, coat and call together. Choose the matching field-guide entry.');if(s.guess!==null){let i=traits.findIndex((_,i)=>bits(s.guess,i)!==bits(s.target,i));el('p',names[s.guess]+' has '+traits[i][bits(s.guess,i)]+'. Your notebook says '+traits[i][bits(s.target,i)]+'. Compare again.').setAttribute('role','status')}
let g=el('div','');g.className='profiles';names.forEach((name,n)=>btn(name+'\n'+traits.map((a,i)=>a[bits(n,i)]).join(' · '),()=>{s.guess=n;s.done=n===s.target;save();if(s.done){let score=s.ids.filter((id,i)=>s.first[i]===topic().questions[id].answer).length;window.ChemistryTools?.logSession({type:'game',key:s.id,topic:topic().name,label:'Chem Hunter · first attempts',score,total:3})}draw()},g));return}
if(s.site===null){el('h3','Choose your next scouting site');stops.forEach((name,i)=>{if(!s.trail.includes(i))btn(name+' →',()=>{s.site=i;save();draw()})});return}
let i=s.site,q=topic().questions[s.ids[i]];el('p','SCOUTING / '+stops[i]);el('h3',q.stem);if(q.context)el('p',q.context);
q.options.forEach((v,j)=>{btn(String.fromCharCode(65+j)+'. '+v,()=>{s.first[i]??=j;s.choice=j;save();draw()}).disabled=s.choice!==null});
if(s.choice!==null){let ok=s.choice===q.answer;el('p',(ok?'Observation unlocked: '+traits[i][bits(s.target,i)]+'.':'Trail paused. Correct answer: '+q.options[q.answer]+'.')+' '+(q.why||q.tip||'')).setAttribute('role','status');btn(ok?'Record observation →':'Retry this clue →',()=>{if(ok){s.trail.push(i);s.site=null}s.choice=null;save();draw()});let a=el('a','Review this topic');a.href='revision-notes.html?topic='+(+sel.value+1)}
}
sel.onchange=()=>{s=read();draw()};draw()
})();