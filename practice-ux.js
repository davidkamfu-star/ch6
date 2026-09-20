(function(){
  'use strict';
  var topics=[
    ['planet-earth.html','planet-earth-progress-v1'],
    ['microscopic-world-i.html','microscopic-world-i-progress-v1'],
    ['metals.html','metals-progress-v1'],
    ['acids-and-bases.html','acids-bases-progress-v1'],
    ['fossil-fuels-carbon.html','fossil-fuels-carbon-progress-v1'],
    ['microscopic-world-ii.html','microscopic-world-ii-progress-v1'],
    ['redox-reactions-cells-electrolysis.html','redox-cells-electrolysis-progress-v1'],
    ['chemical-reactions-energy.html','chemical-reactions-energy-progress-v1'],
    ['rate-of-reaction.html','rate-of-reaction-progress-v1'],
    ['chemical-equilibrium.html','chemical-equilibrium-progress-v1'],
    ['chemistry-of-carbon-compounds.html','chemistry-carbon-compounds-progress-v2'],
    ['patterns-in-the-chemical-world.html','patterns-chemical-world-progress-v1']
  ];
  function data(key){try{var value=JSON.parse(localStorage.getItem(key)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch(e){return {}}}
  function checked(state){return Object.values(state).filter(function(v){return v&&v.checked===true}).length}
  function last(number){try{var n=Number(localStorage.getItem('chemistry-last-question-'+number));return Number.isInteger(n)&&n>=0?n:0}catch(e){return 0}}
  function make(tag,cls,text){var node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node}
  function home(){
    var cards=document.querySelectorAll('.chapter-card'),best=null;
    cards.forEach(function(card,i){
      var pair=topics[i],actions=card.querySelector('.chapter-actions'),copy=card.querySelector('.chapter-copy');
      if(!pair||!actions||!copy)return;
      var notes=actions.querySelector('a:first-child'),practice=actions.querySelector('a:last-child');
      if(notes)notes.textContent='Read notes';
      if(practice)practice.textContent='Practice questions →';
      var state=data(pair[1]),count=checked(state),savedIndex=last(i+1),progress=make('span','chapter-progress',count?count+' checked · Continue at Q'+(savedIndex+1):'Ready for question practice');
      copy.appendChild(progress);
      if(count||savedIndex){
        practice.href=pair[0]+'?q='+(savedIndex+1);
        if(!best||savedIndex>0&&best.index===0||count>best.count)best={name:copy.querySelector('b').textContent,url:practice.href,count:count,index:savedIndex};
      }
    });
    if(best){
      var section=document.querySelector('#topics .section-head');
      if(section){
        var banner=make('div','practice-resume');
        var box=make('div');box.appendChild(make('strong','', 'Continue '+best.name));
        box.appendChild(make('small','',best.count+' checked · saved position Q'+(best.index+1)));
        var link=make('a','', 'Resume questions →');link.href=best.url;
        banner.appendChild(box);banner.appendChild(link);section.insertAdjacentElement('afterend',banner);
      }
    }
  }
  function questionPage(pair,number){
    var map=document.getElementById('questionNav'),header=document.querySelector('.topbar,header');
    if(!map||!header)return;
    var strip=make('nav','practice-guide');strip.setAttribute('aria-label','Question practice shortcuts');
    var status=make('span','guide-status','Choose a question to begin');
    var links=make('div','guide-links');
    var all=make('a','','All topics');all.href='index.html#topics';
    var notes=make('a','','Topic notes');notes.href='revision-notes.html?topic='+number;
    var next=make('button','','Next unanswered →');next.type='button';
    links.appendChild(all);links.appendChild(notes);links.appendChild(next);
    strip.appendChild(status);strip.appendChild(links);header.insertAdjacentElement('afterend',strip);
    function buttons(){return Array.from(map.querySelectorAll('button[data-i]'))}
    function currentIndex(){
      var active=map.querySelector('button.active[data-i]');
      return active?Number(active.dataset.i):0;
    }
    function update(){
      var list=buttons();if(!list.length)return;
      var index=currentIndex(),done=list.filter(function(button){return button.classList.contains('correct')||button.classList.contains('wrong')}).length;
      status.textContent='Q'+(index+1)+' of '+list.length+' · '+done+' checked · '+(list.length-done)+' remaining';
      next.disabled=done>=list.length;
      try{
        localStorage.setItem('chemistry-last-question-'+number,String(index));
        var url=new URL(location.href);url.searchParams.set('q',String(index+1));
        if(url.href!==location.href)history.replaceState(null,'',url);
      }catch(e){}
    }
    next.addEventListener('click',function(){
      var list=buttons(),index=currentIndex();
      var unanswered=list.filter(function(button){return !button.classList.contains('correct')&&!button.classList.contains('wrong')});
      var target=unanswered.find(function(button){return Number(button.dataset.i)>index})||unanswered[0];
      if(target)target.click();
    });
    var requested=Number(new URLSearchParams(location.search).get('q'));
    var target=buttons().find(function(button){return Number(button.dataset.i)===requested-1});
    if(target)target.click();
    var queued=false;
    var observer=new MutationObserver(function(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;update()})});
    observer.observe(map,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    update();
  }
  var path=location.pathname.split('/').pop()||'index.html';
  if(path==='index.html')home();
  else topics.forEach(function(pair,i){if(pair[0]===path)questionPage(pair,i+1)});
})();
