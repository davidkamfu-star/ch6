(function(){
  'use strict';
  const $=id=>document.getElementById(id),video=$('experimentFilm');
  const films={
    rate:{title:'Catalyst Race',duration:40,chapters:[[0,'Set up'],[6,'Observe'],[17,'Particle view'],[25,'Compare curves'],[34,'Remember']]},
    metal:{title:'Copper Recovery',duration:32,chapters:[[0,'Set up'],[5,'Observe'],[17,'Particle view'],[25,'Remember']]},
    titration:{title:'Titration Precision',duration:40,chapters:[[0,'Set up'],[5,'Add and mix'],[18,'Go dropwise'],[28,'Record'],[34,'Remember']]}
  };
  let current='',pendingTime=null;
  function cue(time){if(video.readyState<1){pendingTime=time;video.load();$('filmStatus').textContent='Loading the selected chapter…';return;}video.currentTime=Math.min(time,video.duration||time);$('filmStatus').textContent='Chapter selected. Press play to continue.';}
  function select(id){if(!films[id]||current===id)return;current=id;pendingTime=null;video.pause();video.src='experiment-videos/'+id+'.mp4';video.load();video.playbackRate=Number($('filmSpeed').value)||1;const f=films[id];$('filmTitle').textContent=f.title+' · '+f.duration+' seconds';$('downloadFilm').href=video.src;$('downloadFilm').download=id+'.mp4';$('filmStatus').textContent='Press play to watch. Captions are included on screen; these videos have no audio.';$('filmChapters').replaceChildren();f.chapters.forEach(([time,title])=>{const b=document.createElement('button');b.type='button';b.textContent='0:'+String(time).padStart(2,'0')+' · '+title;b.onclick=()=>cue(time);$('filmChapters').appendChild(b);});}
  video.addEventListener('loadedmetadata',()=>{video.playbackRate=Number($('filmSpeed').value)||1;if(pendingTime!==null){const t=pendingTime;pendingTime=null;cue(t)}});
  video.addEventListener('play',()=>{window.dispatchEvent(new Event('experiment-film-play'));$('filmStatus').textContent='Playing '+films[current].title+'. The interactive bench is paused while you watch.';});
  video.addEventListener('ended',()=>{$('filmStatus').textContent='Animation complete. Replay a chapter or try the interactive experiment below.';});
  video.addEventListener('error',()=>{$('filmStatus').textContent='The video could not load. Retry, or use Download MP4 to open the file directly.';});
  $('filmSpeed').onchange=()=>{video.playbackRate=Number($('filmSpeed').value)||1};
  $('replayFilm').onclick=()=>{pendingTime=0;cue(0);video.play().catch(()=>{$('filmStatus').textContent='Press the play button on the video to begin.';})};
  document.querySelectorAll('[data-lab]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.lab)));
  const requested=new URLSearchParams(location.search).get('lab');select(films[requested]?requested:'rate');
})();
