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
    {match:/planet earth/i,focus:'air, water and the Earth\'s resources',action:'Review separation methods, tests for gases and substances, and the chemistry of rocks and the atmosphere.',concepts:['separation and purification','tests for gases and water','air pollutants and environmental effects'],examTip:'State the observation first, then name the substance or conclusion it supports.'},
    {match:/microscopic world i(?!i)/i,focus:'particles, formulae and bonding',action:'Practise electron arrangements, ion formation, formula writing, and ionic versus covalent structures.',concepts:['electron arrangements and ion formation','chemical formulae and equations','structure–property explanations'],examTip:'Use particles, mobile charges and bond strength explicitly in structure–property answers.'},
    {match:/metals/i,focus:'metal reactivity and extraction',action:'Rebuild the reactivity series, then connect it to displacement, extraction and corrosion protection.',concepts:['reactivity and displacement','metal extraction methods','corrosion and protection'],examTip:'Use relative positions in the reactivity series to justify every prediction.'},
    {match:/acids? and bases?/i,focus:'acid–base chemistry',action:'Revisit pH, indicators, neutralisation equations, salt preparation and titration calculations.',concepts:['acid–base reactions and equations','pH and indicators','salt preparation and titration'],examTip:'Show the reacting ions and check units, significant figures and dilution before calculating.'},
    {match:/fossil fuels|carbon and its compounds/i,focus:'fuels and carbon chemistry',action:'Review fractional distillation, cracking, combustion, carbon compounds and polymer formation.',concepts:['fractional distillation and cracking','complete and incomplete combustion','addition polymerisation'],examTip:'Relate boiling range to molecular size and intermolecular forces, not merely to “heaviness”.'},
    {match:/microscopic world ii/i,focus:'structure and intermolecular forces',action:'Practise molecular shapes, bond polarity, molecular polarity and intermolecular-force comparisons.',concepts:['molecular shapes and bond angles','bond and molecular polarity','intermolecular-force comparisons'],examTip:'Name the intermolecular force and compare its strength before explaining a physical property.'},
    {match:/redox|electrolysis|chemical cells/i,focus:'redox, cells and electrolysis',action:'Write oxidation states and half-equations before predicting cell direction and electrode products.',concepts:['oxidation states and redox agents','half-equations and electron flow','preferential discharge at electrodes'],examTip:'Label anode/cathode and oxidation/reduction before selecting products or writing half-equations.'},
    {match:/energy|energetics/i,focus:'reaction energetics',action:'Review energy profiles, calorimetry, bond-enthalpy calculations and Hess\'s law cycles.',concepts:['energy profiles and activation energy','calorimetry calculations','bond enthalpy and Hess\'s law'],examTip:'Write the sign of ΔH and keep “bonds broken minus bonds formed” in the correct order.'},
    {match:/rate of reaction/i,focus:'rates and collision theory',action:'Link rate graphs and experimental variables to collision frequency, energy and activation energy.',concepts:['reading rate graphs','collision theory','experimental variables and catalysts'],examTip:'Explain rate changes through frequency of effective collisions, not collision frequency alone.'},
    {match:/equilibrium/i,focus:'chemical equilibrium',action:'Practise dynamic equilibrium, Le Chatelier predictions and Kc expressions with clear reasoning.',concepts:['dynamic equilibrium','Le Chatelier predictions','Kc expressions and calculations'],examTip:'Separate the immediate rate change from the later shift in equilibrium position.'},
    {match:/carbon compounds|organic/i,focus:'organic reactions and naming',action:'Map functional-group tests and conversions, then practise systematic naming and multi-step synthesis.',concepts:['systematic naming and isomerism','functional-group reactions and tests','organic conversions and polymers'],examTip:'Identify the principal functional group and longest valid carbon chain before numbering.'},
    {match:/patterns in the chemical world|periodic/i,focus:'periodic patterns',action:'Review periodic trends, oxide properties and characteristic transition-metal chemistry.',concepts:['periodic trends and electron structure','acidic, basic and amphoteric oxides','transition-metal ions and reactions'],examTip:'Support every periodic trend with nuclear charge, shielding or electron-shell reasoning.'}
  ];
  const SKILL_COACH=[
    {match:/anode|cathode|electrolys|electrode|discharg|brine/i,skill:'preferential discharge and electrode products'},
    {match:/oxidation number|oxidation state|oxidis|reduc|half.?equation|electron flow/i,skill:'oxidation states and half-equations'},
    {match:/reactivity|displac|sacrificial|corrosion|extract|blast furnace/i,skill:'reactivity, displacement and extraction'},
    {match:/titration|burette|pipette|end.?point|standard solution/i,skill:'titration technique and mole calculations'},
    {match:/\bpH\b|indicator|neutralis|acid|alkali|carbonate/i,skill:'acid–base reactions, pH and salts'},
    {match:/electron arrangement|electronic|isotope|proton|neutron|mass number/i,skill:'atomic structure and electron arrangement'},
    {match:/ionic|covalent|metallic|dot.?and.?cross|giant|conduct|melting point/i,skill:'bonding and structure–property reasoning'},
    {match:/shape|bond angle|polar|dipole|intermolecular|hydrogen bond/i,skill:'molecular shape, polarity and intermolecular forces'},
    {match:/enthalpy|hess|calorim|energy profile|activation energy|bond enthalpy/i,skill:'enthalpy changes and energy calculations'},
    {match:/rate|collision|catalyst|surface area|concentration.*time/i,skill:'rate graphs and collision theory'},
    {match:/equilibrium|le chatelier|\bkc\b|equilibrium constant/i,skill:'equilibrium shifts and Kc'},
    {match:/name|nomenclature|longest chain|functional group|isomer|structural formula/i,skill:'organic naming and isomerism'},
    {match:/alkene|bromine water|addition|polymer|monomer/i,skill:'alkene reactions and addition polymerisation'},
    {match:/alcohol|carboxylic|ester|oxidation.*organic|ethanol|ethanoic/i,skill:'organic functional-group conversions'},
    {match:/fractional distillation|cracking|petroleum|octane|combustion/i,skill:'fossil fuels, cracking and combustion'},
    {match:/periodic|across a period|down a group|oxide|transition metal/i,skill:'periodic trends and oxide chemistry'},
    {match:/flame test|precipitate|silver nitrate|barium|qualitative|identify|test for/i,skill:'qualitative analysis and observations'},
    {match:/mole|molar|stoichiometr|empirical|molecular formula|limiting/i,skill:'mole ratios and quantitative chemistry'}
  ];
  function ageDays(value){const time=Date.parse(value||'');return Number.isFinite(time)?Math.max(0,Math.floor((Date.now()-time)/86400000)):0}
  function coachFor(topic){return TOPIC_COACH.find(x=>x.match.test(topic||''))||{focus:'this chemistry topic',action:'Review the key definitions and equations, then retry related questions without notes.',concepts:['key definitions','balanced equations and calculations','evidence-based explanations'],examTip:'Underline the command word and include every requested observation, equation and unit.'}}
  function itemSkill(item,fallback){const text=[item&&item.question,item&&item.reason,item&&item.selected&&item.selected.text].join(' '),hit=SKILL_COACH.find(x=>x.match.test(text));return hit?hit.skill:(fallback||coachFor(item&&item.topic)).concepts[0]}
  function detailFor(group){
    const active=group.items.filter(x=>!x.mastered),ranked=active.slice().sort(function(a,b){return (+b.attempts||1)-(+a.attempts||1)||ageDays(b.lastTried||b.savedAt)-ageDays(a.lastTried||a.savedAt)}),skills=[];
    ranked.forEach(function(item){const skill=itemSkill(item,group.coach);if(skills.indexOf(skill)<0)skills.push(skill)});group.coach.concepts.forEach(function(skill){if(skills.indexOf(skill)<0)skills.push(skill)});
    const signals=[];if(group.open)signals.push(group.open+' active question'+(group.open===1?'':'s'));if(group.repeats)signals.push(group.repeats+' repeat error'+(group.repeats===1?'':'s'));if(group.due)signals.push(group.due+' question'+(group.due===1?' is':'s are')+' overdue');if(!signals.length)signals.push('all saved questions are currently mastered');
    return {skills:skills.slice(0,4),why:'The coach found '+signals.join(', ')+'. '+(group.repeats?'Repeated attempts raise this topic\'s priority because recall is not yet stable.':'More evidence will make this diagnosis increasingly specific.'),hardest:ranked[0]||null,plan:['5 min · Recall the key rule, definition or equation from memory.','7 min · Study one worked example and explain every step aloud.','8 min · Retry the highest-priority saved question without notes.','5 min · Correct the error, record the missing step and schedule a delayed retry.'],mastery:group.repeats?'Target: two correct retries in separate sessions with no hint.':'Target: one correct retry now and one delayed check within a week.'}
  }
  function assessMistakes(input){
    const list=Array.isArray(input)?input:mistakes(),open=list.filter(x=>!x.mastered),mastered=list.length-open.length;
    const groups={};
    list.forEach(function(item){
      const topic=clean(item.topic)||'General Chemistry',attempts=Math.max(1,+item.attempts||1),days=ageDays(item.lastTried||item.savedAt),active=!item.mastered;
      if(!groups[topic])groups[topic]={topic:topic,open:0,mastered:0,repeats:0,due:0,score:0,items:[],coach:coachFor(topic)};
      const group=groups[topic];group.items.push(item);
      if(active){group.open++;group.repeats+=Math.max(0,attempts-1);if(days>=7)group.due++;group.score+=4+Math.min(8,(attempts-1)*2)+(days>=14?3:days>=7?2:0)+(item.reason==='Wrong game answer'?1:0)}else group.mastered++
    });
    const topics=Object.values(groups);topics.forEach(function(group){group.detail=detailFor(group)});topics.sort(function(a,b){return b.score-a.score||b.open-a.open||b.repeats-a.repeats});
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
  function addStyles(){if(document.querySelector('link[href*="student-tools.css"]'))return;const link=document.createElement('link');link.rel='stylesheet';link.href='student-tools.css?v=20260826a';document.head.appendChild(link)}

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
    addTopLinks();const p=profile(),level=Math.floor((p.xp||0)/100)+1,assessment=assessMistakes(),priority=assessment.priority,section=document.createElement('section');section.className='student-home-tools';section.innerHTML='<div class="home-tool-card notebook"><span class="home-tool-icon">★</span><div><p>SMART REVISION COACH</p><h2><b data-mistake-count>'+countOpen()+'</b> questions to revisit</h2><span>'+(priority?'Priority: '+priority.coach.focus+'.':'Wrong answers are assessed automatically to build your personal revision plan.')+'</span></div><a href="mistakes.html">See my revision advice →</a></div><div class="home-tool-card games"><span class="home-tool-icon">⚡</span><div><p>CHEMISTRY ARCADE</p><h2>Level '+level+' · <b>'+(p.xp||0)+'</b> XP</h2><span>Play curriculum challenges, movable games and the new 3D Chemistry Lab.</span></div><a href="games.html">Play Chemistry Games →</a></div>';
    topic.parentNode.insertBefore(section,topic);
    const nav=document.querySelector('header nav');if(nav&&!nav.querySelector('[href="games.html"]'))nav.insertAdjacentHTML('beforeend','<a href="games.html">Games</a>');
  }
  function boot(){addStyles();if(document.querySelector('.question-nav'))addQuestionTools();else if(document.querySelector('.topic-grid'))addHomeTools();updateButtons()}
  window.ChemistryTools={mistakes,writeMistakes:list=>write(MISTAKE_KEY,list),profile,writeProfile:p=>write(GAME_KEY,p),countOpen,assessMistakes,itemSkill};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('chemistry-tools-change',updateButtons);
})();
