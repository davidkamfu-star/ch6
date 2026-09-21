(function(){
  'use strict';
  var ring=document.getElementById('masteryRing');
  var value=document.getElementById('masteryMomentum');
  var focus=document.getElementById('masteryFocus');
  var steps=Array.from(document.querySelectorAll('.mastery-step'));
  if(!ring||!value||!focus||!window.ChemistryTools)return;
  var report=ChemistryTools.progressReport();
  var goal=Math.max(1,Number(report.weeklyGoal)||3);
  var sessions=Number(report.weekSessions)||0;
  var momentum=Math.min(100,Math.round(sessions/goal*100));
  var open=ChemistryTools.countOpen();
  var stage='learn';
  var message='Recall one chapter, then test yourself without looking.';
  if(sessions>0){stage='practise';message='Continue with focused HKDSE questions in your current topic.'}
  if(open>0){stage='correct';message='Repair '+open+' saved mistake'+(open===1?'':'s')+' before doing another full set.'}
  if(sessions>=goal&&open===0){stage='recheck';message='Weekly target reached—recheck an older topic to prove retention.'}
  ring.style.setProperty('--value',String(momentum));
  value.textContent=momentum+'%';
  focus.textContent=message;
  steps.forEach(function(step){
    var active=step.dataset.stage===stage;
    step.classList.toggle('active',active);
    var badge=step.querySelector('.step-state');
    if(badge)badge.textContent=active?'CURRENT FOCUS':'NEXT';
  });
})();
