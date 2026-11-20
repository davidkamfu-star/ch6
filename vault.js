(()=>{'use strict';
const bank=window.CHEM_MOCK_BANK,box=document.querySelector('#game'),topic=document.querySelector('#topic');
if(!Array.isArray(bank)){box.textContent='The question bank could not load. Refresh or open ordinary topic practice below.';return}
bank.forEach((t,i)=>topic.add(new Option(t.name,i)));let n=Number(new URLSearchParams(location.search).get('topic'))-1;topic.value=bank[n]?n:0;
const key=()=>'chem-vault-v1:'+topic.value,read=()=>{try{return JSON.parse(localStorage.getItem(key()))}catch{return null}},save=()=>{try{localStorage.setItem(key(),JSON.stringify(s))}catch{}},t=()=>bank[topic.value];let s=read();
function add(tag,txt){let x=document.createElement(tag);x.textContent=txt;box.append(x);return x}
function btn(txt,f){let b=add('button',txt);b.onclick=f;return b}
function link(txt,url){let a=add('a',txt);a.href=url}
function start(){let ids=t().questions.map((_,i)=>i);for(let i=ids.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}s={id:'vault-'+Date.now()+'-'+Math.random(),ids:ids.slice(0,3),first:{},solved:[],cursor:0,choice:null};save();draw()}
function draw(){box.replaceChildren();if(!s){add('h2',t().name);btn('Enter the vault →',start);return}
let h=add('h2',t().name);h.tabIndex=-1;h.focus({preventScroll:true});add('p','◆'.repeat(s.solved.length)+'◇'.repeat(3-s.solved.length)).className='gems';add('p',s.solved.length+' / 3 seals unlocked');
if(s.solved.length===3){let score=s.ids.filter(id=>s.first[id]===t().questions[id].answer).length;add('h3','Topic crystal collected');add('p',score+'/3 on the first attempt · '+(3-score)+' repaired.');link('Review topic notes','revision-notes.html?topic='+(+topic.value+1));btn('Play a fresh vault',start);return}
let id=s.ids[s.cursor],q=t().questions[id],repair=id in s.first&&s.choice===null;add('p',(repair?'REPAIR CLUE':'VAULT CLUE')+' '+(s.cursor+1)+' / 3');add('h3',q.stem);if(q.context)add('p',q.context);
q.options.forEach((o,j)=>{let b=btn(String.fromCharCode(65+j)+'. '+o,()=>{s.first[id]??=j;s.choice=j;save();draw()});b.disabled=s.choice!==null});
if(s.choice!==null){let ok=s.choice===q.answer;let f=add('p',(ok?'Seal unlocked.':'Seal needs repair. You chose '+String.fromCharCode(65+s.choice)+'.')+' Correct answer: '+q.options[q.answer]+(q.why?'\n'+q.why:''));f.id='feedback';f.setAttribute('role','status');btn(ok?'Collect seal →':'Continue to next clue →',()=>{if(ok&&!s.solved.includes(id))s.solved.push(id);for(let k=1;k<=3;k++){let next=(s.cursor+k)%3;if(!s.solved.includes(s.ids[next])){s.cursor=next;break}}s.choice=null;save();if(s.solved.length===3){let score=s.ids.filter(i=>s.first[i]===t().questions[i].answer).length;window.ChemistryTools?.logSession({type:'game',key:s.id,topic:t().name,label:'Crystal Vault · first attempts',score,total:3})}draw()});if(!ok)link('Study this topic','revision-notes.html?topic='+(+topic.value+1))}}
topic.onchange=()=>{s=read();draw()};draw()})();