(function(){
  'use strict';
  var KEY='chemistry-36q-mock-v1',DURATION=45*60*1000,bank=window.CHEM_MOCK_BANK;
  var panel=function(id){return document.getElementById(id)};
  if(!Array.isArray(bank)||bank.length!==12||bank.some(function(t){return !Array.isArray(t.questions)||t.questions.length<3})){
    panel('welcomeTitle').textContent='The question bank could not be loaded.';
    panel('startButton').disabled=true;return;
  }
  var state=null,position=0,tickHandle=null;
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){panel('autosaveText').textContent='This browser cannot save progress'}}
  function read(){try{var value=JSON.parse(localStorage.getItem(KEY)||'null');if(value&&Array.isArray(value.items)&&value.items.length===36){if(!value.finishedAt&&Number.isFinite(value.startedAt))value.endsAt=Math.min(Number(value.endsAt)||Infinity,value.startedAt+DURATION);return value}return null}catch(e){return null}}
  function shuffle(items){
    var out=items.slice();
    for(var i=out.length-1;i>0;i--){
      var random=new Uint32Array(1);crypto.getRandomValues(random);
      var j=random[0]%(i+1),temp=out[i];out[i]=out[j];out[j]=temp;
    }
    return out;
  }
  function makePaper(){
    var items=shuffle(bank.flatMap(function(topic,ti){
      return shuffle(topic.questions.map(function(_,qi){return {topic:ti,index:qi}})).slice(0,3);
    }));
    return {version:1,items:items,answers:{},flags:{},position:0,startedAt:Date.now(),endsAt:Date.now()+DURATION,finishedAt:null,timedOut:false};
  }
  function question(n){var ref=state.items[n];return bank[ref.topic].questions[ref.index]}
  function show(id){['welcome','exam','results'].forEach(function(k){panel(k).hidden=k!==id})}
  function answeredCount(){return Object.keys(state.answers).filter(function(k){return Number.isInteger(state.answers[k])}).length}
  function timeLeft(){return Math.max(0,state.endsAt-Date.now())}
  function clock(){
    if(!state||state.finishedAt)return;
    var remaining=timeLeft(),min=Math.floor(remaining/60000),sec=Math.floor((remaining%60000)/1000);
    panel('timer').textContent=String(min).padStart(2,'0')+':'+String(sec).padStart(2,'0');
    panel('timer').classList.toggle('low',remaining<5*60000);
    if(!remaining)finish(true);
  }
  function renderMap(){
    var map=panel('questionMap');map.replaceChildren();
    state.items.forEach(function(_,i){
      var button=document.createElement('button');button.type='button';button.textContent=String(i+1);
      button.setAttribute('aria-label','Question '+(i+1)+(Number.isInteger(state.answers[i])?', answered':', unanswered')+(state.flags[i]?', flagged':''));
      if(Number.isInteger(state.answers[i]))button.classList.add('answered');
      if(state.flags[i])button.classList.add('flagged');
      if(i===position){button.classList.add('current');button.setAttribute('aria-current','step')}
      button.addEventListener('click',function(){navigate(i)});
      map.appendChild(button);
    });
    var n=answeredCount();panel('examCount').textContent=n+' of 36 answered';
    panel('examProgress').style.width=(n/36*100)+'%';
  }
  function renderQuestion(){
    var q=question(position);
    panel('questionLabel').textContent='QUESTION '+String(position+1).padStart(2,'0')+' / 36';
    panel('sourceLabel').textContent='Select the best answer. · 1 mark';
    panel('stem').textContent=q.stem;
    panel('context').textContent=q.context||'';
    panel('context').hidden=!q.context;
    panel('flagButton').setAttribute('aria-pressed',state.flags[position]?'true':'false');
    panel('flagButton').textContent=state.flags[position]?'★ Flagged for review':'☆ Flag for review';
    panel('choices').replaceChildren();
    q.options.forEach(function(option,i){
      var button=document.createElement('button');button.type='button';button.className='choice';
      button.setAttribute('aria-pressed',state.answers[position]===i?'true':'false');
      button.setAttribute('aria-label',String.fromCharCode(65+i)+'. '+option);
      var letter=document.createElement('b');letter.textContent=String.fromCharCode(65+i);
      var wording=document.createElement('span');wording.textContent=option;
      button.appendChild(letter);button.appendChild(wording);
      button.addEventListener('click',function(){state.answers[position]=i;save();renderQuestion();renderMap()});
      panel('choices').appendChild(button);
    });
    panel('previousButton').disabled=position===0;panel('nextButton').disabled=position===35;
    renderMap();
  }
  function navigate(i){position=Math.min(35,Math.max(0,i));state.position=position;save();renderQuestion();window.scrollTo({top:0,behavior:'smooth'})}
  function start(newPaper){
    if(newPaper&&state&&!state.finishedAt&&!confirm('Start a new paper? Your current 36-question attempt will be replaced.'))return;
    if(newPaper)state=makePaper();
    position=Math.min(35,Math.max(0,state.position||0));
    save();show('exam');renderQuestion();clock();
    if(tickHandle)clearInterval(tickHandle);
    tickHandle=setInterval(clock,1000);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function submit(){
    var n=answeredCount();
    if(n<36&&!confirm((36-n)+' question'+(36-n===1?' is':'s are')+' unanswered. Submit the paper now?'))return;
    finish(false);
  }
  function recordProgress(){
    try{
      var key='chemistry-progress-monitor-v1';
      var progress=JSON.parse(localStorage.getItem(key)||'{"weeklyGoal":3,"history":[]}');
      if(!progress||typeof progress!=='object')return;
      if(!Array.isArray(progress.history))progress.history=[];
      var score=state.items.reduce(function(total,_,i){return total+(state.answers[i]===question(i).answer?1:0)},0);
      progress.history.unshift({
        id:'activity-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),
        type:'self-study',topic:'Mixed Chemistry mock',key:'mock-exam-36',
        label:'36-question Paper 1A practice mock',score:score,total:36,xp:0,
        minutes:Math.max(1,Math.round((Date.now()-state.startedAt)/60000)),
        confidence:'',relatedId:'',at:new Date().toISOString()
      });
      progress.history=progress.history.slice(0,400);
      localStorage.setItem(key,JSON.stringify(progress));
    }catch(e){}
  }
  function finish(timedOut){
    if(!state||state.finishedAt)return;
    if(tickHandle)clearInterval(tickHandle);
    tickHandle=null;state.finishedAt=Date.now();state.timedOut=!!timedOut;save();recordProgress();
    renderResults();show('results');window.scrollTo({top:0,behavior:'smooth'});
  }
  function add(tag,klass,content){
    var el=document.createElement(tag);if(klass)el.className=klass;if(content!==undefined)el.textContent=content;return el;
  }
  function link(label,href){var a=add('a','',label);a.href=href;return a}
  function renderResults(){
    var groups=bank.map(function(t){return {name:t.name,correct:0,answered:0,items:[]}}),score=0;
    state.items.forEach(function(ref,i){
      var q=question(i),choice=state.answers[i],ok=choice===q.answer;
      if(Number.isInteger(choice))groups[ref.topic].answered++;
      if(ok){score++;groups[ref.topic].correct++}
      groups[ref.topic].items.push({paper:i,topic:ref.topic,ref:ref,question:q,selected:choice,correct:ok});
    });
    panel('resultScore').textContent=score+'/36';
    panel('resultAccuracy').textContent=Math.round(score/36*100)+'%';
    panel('resultAnswered').textContent=answeredCount()+'/36';
    panel('resultMessage').textContent=(state.timedOut?'Time is up. ':'')+'Use the topic breakdown to choose what to revise next. A perfect score on this paper is a strong attempt; revisit the topic later to confirm retention.';
    var list=panel('topicResults');list.replaceChildren();
    groups.forEach(function(g,ti){
      var card=add('div','topic-result');
      var heading=add('div','topic-result-head');
      heading.appendChild(add('b','',String(ti+1).padStart(2,'0')+' · '+g.name));
      heading.appendChild(add('span','',g.correct+'/3'));
      card.appendChild(heading);
      var track=add('div','topic-track');var fill=add('i');fill.style.width=(g.correct/3*100)+'%';track.appendChild(fill);card.appendChild(track);
      card.appendChild(add('p','',g.correct===3?'Strong on this attempt · recheck later':g.correct===2?'Review the missed concept, then retry':'Priority topic · read the notes and practise again'));
      card.appendChild(link('Quick notes →','revision-notes.html?topic='+(ti+1)));
      card.appendChild(link('Topic questions →',bank[ti].href));
      list.appendChild(card);
    });
    var entries=groups.flatMap(function(g){return g.items}).sort(function(a,b){return Number(a.correct)-Number(b.correct)||a.paper-b.paper});
    var review=panel('reviewList');review.replaceChildren();
    entries.forEach(function(item){
      var q=item.question,correct=Number.isInteger(item.selected)&&item.correct;
      var details=add('details','review-card '+(correct?'correct':'wrong'));
      var summary=add('summary','', 'Q'+(item.paper+1)+' · '+bank[item.topic].name+' · '+(correct?'Correct':Number.isInteger(item.selected)?'Incorrect':'Unanswered'));
      summary.appendChild(add('span','',q.source||'Topic question'));details.appendChild(summary);
      var body=add('div','review-answer');
      body.appendChild(add('p','',q.stem+(q.context?'\n'+q.context:'')));
      body.appendChild(add('p','', 'Your answer: '+(Number.isInteger(item.selected)?String.fromCharCode(65+item.selected)+' · '+q.options[item.selected]:'Not answered')));
      body.appendChild(add('p','', 'Correct answer: '+String.fromCharCode(65+q.answer)+' · '+q.options[q.answer]));
      if(q.why)body.appendChild(add('p','',q.why));
      if(q.tip)body.appendChild(add('p','', 'Exam tip: '+q.tip));
      body.appendChild(link('Review original question →',bank[item.topic].href+'?q='+(q.sourceIndex+1)));
      details.appendChild(body);review.appendChild(details);
    });
  }
  panel('startButton').addEventListener('click',function(){start(true)});
  panel('retryButton').addEventListener('click',function(){start(true)});
  panel('resumeButton').addEventListener('click',function(){start(false)});
  panel('viewResultButton').addEventListener('click',function(){renderResults();show('results')});
  panel('previousButton').addEventListener('click',function(){navigate(position-1)});
  panel('nextButton').addEventListener('click',function(){navigate(position+1)});
  panel('flagButton').addEventListener('click',function(){state.flags[position]=!state.flags[position];save();renderQuestion()});
  panel('submitButton').addEventListener('click',submit);
  panel('submitSide').addEventListener('click',submit);
  state=read();
  if(state){
    if(state.finishedAt){panel('viewResultButton').hidden=false;panel('welcomeTitle').textContent='Review your last paper or try a new one.'}
    else if(state.endsAt<=Date.now())finish(true);
    else{panel('resumeButton').hidden=false;panel('welcomeTitle').textContent='Your saved mock paper is ready to resume.'}
  }
})();
