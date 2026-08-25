(function(){
  'use strict';
  const MISTAKE_KEY='chemistry-mistake-notebook-v1';
  const GAME_KEY='chemistry-game-profile-v1';

  function read(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}}
  function write(key,value){localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new CustomEvent('chemistry-tools-change'))}
  function mistakes(){return read(MISTAKE_KEY,[])}
  function profile(){return read(GAME_KEY,{xp:0,best:{},played:0})}
  function clean(text){return String(text||'').replace(/\s+/g,' ').trim()}
  const TOPIC_COACH=[
    {match:/planet earth/i,focus:'air, water and the Earth\'s resources',action:'Review separation methods, tests for gases and substances, and the chemistry of rocks and the atmosphere.'},
    {match:/microscopic world i(?!i)/i,focus:'particles, formulae and bonding',action:'Practise electron arrangements, ion formation, formula writing, and ionic versus covalent structures.'},
    {match:/metals/i,focus:'metal reactivity and extraction',action:'Rebuild the reactivity series, then connect it to displacement, extraction and corrosion protection.'},
    {match:/acids? and bases?/i,focus:'acid–base chemistry',action:'Revisit pH, indicators, neutralisation equations, salt preparation and titration calculations.'},
    {match:/fossil fuels|carbon and its compounds/i,focus:'fuels and carbon chemistry',action:'Review fractional distillation, cracking, combustion, carbon compounds and polymer formation.'},
    {match:/microscopic world ii/i,focus:'structure and intermolecular forces',action:'Practise molecular shapes, bond polarity, molecular polarity and intermolecular-force comparisons.'},
    {match:/redox|electrolysis|chemical cells/i,focus:'redox, cells and electrolysis',action:'Write oxidation states and half-equations before predicting cell direction and electrode products.'},
    {match:/energy|energetics/i,focus:'reaction energetics',action:'Review energy profiles, calorimetry, bond-enthalpy calculations and Hess\'s law cycles.'},
    {match:/rate of reaction/i,focus:'rates and collision theory',action:'Link rate graphs and experimental variables to collision frequency, energy and activation energy.'},
    {match:/equilibrium/i,focus:'chemical equilibrium',action:'Practise dynamic equilibrium, Le Chatelier predictions and Kc expressions with clear reasoning.'},
    {match:/carbon compounds|organic/i,focus:'organic reactions and naming',action:'Map functional-group tests and conversions, then practise systematic naming and multi-step synthesis.'},
    {match:/patterns in the chemical world|periodic/i,focus:'periodic patterns',action:'Review periodic trends, oxide properties and characteristic transition-metal chemistry.'}
  ];
  function ageDays(value){const time=Date.parse(value||'');return Number.isFinite(time)?Math.max(0,Math.floor((Date.now()-time)/86400000)):0}
  function coachFor(topic){return TOPIC_COACH.find(x=>x.match.test(topic||''))||{focus:'this chemistry topic',action:'Review the key definitions and equations, then retry related questions without notes.'}}
  function assessMistakes(input){
    const list=Array.isArray(input)?input:mistakes(),open=list.filter(x=>!x.mastered),mastered=list.length-open.length;
    const groups={};
    list.forEach(function(item){
      const topic=clean(item.topic)||'General Chemistry',attempts=Math.max(1,+item.attempts||1),days=ageDays(item.lastTried||item.savedAt),active=!item.mastered;
      if(!groups[topic])groups[topic]={topic:topic,open:0,mastered:0,repeats:0,due:0,score:0,items:[],coach:coachFor(topic)};
      const group=groups[topic];group.items.push(item);
      if(active){group.open++;group.repeats+=Math.max(0,attempts-1);if(days>=7)group.due++;group.score+=4+Math.min(8,(attempts-1)*2)+(days>=14?3:days>=7?2:0)+(item.reason==='Wrong game answer'?1:0)}else group.mastered++
    });
    const topics=Object.values(groups).sort(function(a,b){return b.score-a.score||b.open-a.open||b.repeats-a.repeats});
    const queue=open.slice().sort(function(a,b){
      const score=function(x){return Math.max(1,+x.attempts||1)*3+Math.min(5,Math.floor(ageDays(x.lastTried||x.savedAt)/7))+(x.reason==='Wrong answer'||x.reason==='Wrong game answer'?2:0)};
      return score(b)-score(a)||new Date(a.lastTried||a.savedAt)-new Date(b.lastTried||b.savedAt)
    });
    return {total:list.length,open:open.length,mastered:mastered,repeating:open.filter(x=>(+x.attempts||1)>1).length,due:open.filter(x=>ageDays(x.lastTried||x.savedAt)>=7).length,recovery:list.length?Math.round(mastered/list.length*100):null,topics:topics,priority:topics.find(x=>x.open>0)||null,queue:queue};
  }
  function currentNumber(){const m=clean(document.getElementById('pageTitle')?.textContent).match(/(\d+)/);return m?+m[1]:1}
  function recordId(){return location.pathname+'#'+currentNumber()}
  function topicName(){return clean(document.querySelector('.sidebar h1')?.textContent||document.title.split('|')[0].replace(/^Topic\s*\d+\s*/i,''))}
  function selectedAnswer(){const node=document.querySelector('.option.wrong')||document.querySelector('.option.chosen')||document.querySelector('.option.correct');if(!node)return null;return {letter:clean(node.querySelector('b')?.textContent),text:clean(node.querySelector('span')?.textContent)}}
  function makeRecord(reason){
    const number=currentNumber(),answer=selectedAnswer();
    return {id:recordId(),topic:topicName(),number,question:clean(document.querySelector('.question-title')?.textContent||document.getElementById('questionContent')?.textContent).slice(0,240),source:clean(document.getElementById('sourceTag')?.textContent),difficulty:clean(document.getElementById('difficultyTag')?.textContent),reason:reason||'Saved for revision',selected:answer,href:location.pathname+'?question='+number,mastered:false,attempts:1,savedAt:new Date().toISOString(),lastTried:new Date().toISOString()};
  }
  function saveRecord(reason){
    const list=mistakes(),fresh=makeRecord(reason),i=list.findIndex(x=>x.id===fresh.id);
    if(i>=0)list[i]={...list[i],...fresh,attempts:(list[i].attempts||0)+1,mastered:false};else list.unshift(fresh);
    write(MISTAKE_KEY,list);updateButtons();toast(reason==='Wrong answer'?'Added to your Mistake Notebook':'Saved for later revision');
  }
  function removeRecord(){write(MISTAKE_KEY,mistakes().filter(x=>x.id!==recordId()));updateButtons();toast('Removed from saved questions')}
  function isSaved(){return mistakes().some(x=>x.id===recordId())}
  function countOpen(){return mistakes().filter(x=>!x.mastered).length}
  function badge(){const n=countOpen();return '<span class="tool-badge" aria-label="'+n+' questions to revise">'+n+'</span>'}
  function updateButtons(){
    const saved=isSaved(),button=document.getElementById('saveRevisionButton');
    if(button){button.classList.toggle('saved',saved);button.innerHTML=saved?'★ Saved for revision':'☆ Save for revision';button.setAttribute('aria-pressed',String(saved))}
    document.querySelectorAll('[data-mistake-count]').forEach(el=>el.textContent=countOpen());
  }
  function toast(message){let t=document.getElementById('chemistryToast');if(!t){t=document.createElement('div');t.id='chemistryToast';t.className='chemistry-toast';document.body.appendChild(t)}t.textContent=message;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2400)}
  function addStyles(){if(document.querySelector('link[href*="student-tools.css"]'))return;const link=document.createElement('link');link.rel='stylesheet';link.href='student-tools.css?v=20260825a';document.head.appendChild(link)}

  function addTopLinks(){
    const top=document.querySelector('.topbar');if(!top||top.querySelector('.student-tool-links'))return;
    const wrap=document.createElement('div');wrap.className='student-tool-links';wrap.innerHTML='<a href="mistakes.html">Mistake Notebook '+badge()+'</a><a href="games.html">Chemistry Games <span aria-hidden="true">⚡</span></a>';
    const home=top.querySelector('.home-link');if(home)top.insertBefore(wrap,home);else top.appendChild(wrap);
  }
  function addQuestionTools(){
    addTopLinks();const actions=document.querySelector('.actions-right')||document.querySelector('.actions');if(!actions||document.getElementById('saveRevisionButton'))return;
    const button=document.createElement('button');button.className='btn save-revision';button.id='saveRevisionButton';button.type='button';button.onclick=()=>isSaved()?removeRecord():saveRecord('Saved for revision');actions.insertBefore(button,actions.firstChild);updateButtons();
    const check=document.getElementById('checkButton');if(check)check.addEventListener('click',()=>setTimeout(()=>{if(document.querySelector('.option.wrong'))saveRecord('Wrong answer');else{const list=mistakes(),i=list.findIndex(x=>x.id===recordId());if(i>=0){list[i].lastCorrect=new Date().toISOString();list[i].lastTried=new Date().toISOString();write(MISTAKE_KEY,list);toast('Correct — mark it mastered when you are ready')}}},80));
    const q=+(new URLSearchParams(location.search).get('question')||0);if(q>0)setTimeout(()=>document.querySelector('#questionNav button[data-i="'+(q-1)+'"]')?.click(),60);
  }
  function addHomeTools(){
    const topic=document.querySelector('.topic-section');if(!topic||document.querySelector('.student-home-tools'))return;
    addTopLinks();const p=profile(),level=Math.floor((p.xp||0)/100)+1,assessment=assessMistakes(),priority=assessment.priority,section=document.createElement('section');section.className='student-home-tools';section.innerHTML='<div class="home-tool-card notebook"><span class="home-tool-icon">★</span><div><p>SMART REVISION COACH</p><h2><b data-mistake-count>'+countOpen()+'</b> questions to revisit</h2><span>'+(priority?'Priority: '+priority.coach.focus+'.':'Wrong answers are assessed automatically to build your personal revision plan.')+'</span></div><a href="mistakes.html">See my revision advice →</a></div><div class="home-tool-card games"><span class="home-tool-icon">⚡</span><div><p>CHEMISTRY ARCADE</p><h2>Level '+level+' · <b>'+(p.xp||0)+'</b> XP</h2><span>Play ten mini-games plus 15 curriculum challenges and 210 questions.</span></div><a href="games.html">Play Chemistry Games →</a></div>';
    topic.parentNode.insertBefore(section,topic);
    const nav=document.querySelector('header nav');if(nav&&!nav.querySelector('[href="games.html"]'))nav.insertAdjacentHTML('beforeend','<a href="games.html">Games</a>');
  }
  function boot(){addStyles();if(document.querySelector('.question-nav'))addQuestionTools();else if(document.querySelector('.topic-grid'))addHomeTools();updateButtons()}
  window.ChemistryTools={mistakes,writeMistakes:list=>write(MISTAKE_KEY,list),profile,writeProfile:p=>write(GAME_KEY,p),countOpen,assessMistakes};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('chemistry-tools-change',updateButtons);
})();
