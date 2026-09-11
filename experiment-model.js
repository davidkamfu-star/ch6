'use strict';
// Idealised teaching models, not fitted experimental kinetics.
(function(root){
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  function oxygen(t,catalyst){return 60*(1-Math.exp(-(catalyst?0.085:0.018)*Math.max(0,t)))}
  function copper(t,metal){return metal==='zinc'?1-Math.exp(-0.12*Math.max(0,t)):0}
  function titration(v){
    v=clamp(v,0,50);
    const excess=(0.1*v-2.5)/(25+v);
    const h=excess>=0?2e-14/(Math.sqrt(excess*excess+4e-14)+excess):(-excess+Math.sqrt(excess*excess+4e-14))/2;
    const ph=-Math.log10(h);
    return {ph,pink:clamp((ph-8.2)/1.8,0,1),endpoint:v>=25.02-1e-8&&v<=25.10+1e-8};
  }
  root.ExperimentModel={clamp,oxygen,copper,titration};
})(typeof window!=='undefined'?window:globalThis);
