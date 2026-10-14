/* Questions are embedded from source PDF pages; no text or mathematical notation is retyped. */
(function(root){
const W=595.28,H=841.89;
function ordered(items,topics,sort){const rank=new Map(topics.map((t,i)=>[t.id,i]));return [...items].sort((a,b)=>sort==='year'?(b.year-a.year)||(['A1','A2','B'].indexOf(a.section)-['A1','A2','B'].indexOf(b.section))||(a.number-b.number):(rank.get(a.topic)-rank.get(b.topic))||(sort==='latest'?b.year-a.year:a.year-b.year)||(a.number-b.number));}
function validateQuestions(questions,options={}){
 const en=options.language==='en',mode=options.mode||'student';
 if(!questions.length)throw Error(en?'Please select questions first.':'請先選擇題目。');
 if(!['student','teacher'].includes(mode))throw Error(en?'Invalid booklet edition.':'小冊子版本無效。');
 const issues=[];
 for(const q of questions){
  for(const key of mode==='student'?['student','marking']:['teacher']){
   const segments=q[key],label=key==='marking'?(en?'marking scheme':'評卷參考'):(en?'question pages':'題目頁');
   if(!Array.isArray(segments)||!segments.length){issues.push(`${q.id}: ${en?'missing '+label:'缺少'+label}`);continue;}
   if(segments.some(s=>!s||typeof s.asset!=='string'||!s.asset.trim()||!Number.isInteger(s.page)||s.page<0||!Number.isFinite(s.top)||!Number.isFinite(s.bottom)||s.top<0||s.bottom<=s.top))issues.push(`${q.id}: ${en?'invalid '+label+' segment':'無效的'+label+'頁段'}`);
  }
 }
 if(issues.length)throw Error((en?'Cannot export. Please correct the following question data:':'無法匯出，請先修正以下題目資料：')+'\n'+issues.join('\n'));
}
async function build({questions,topics,options,readAsset,renderSheet,onProgress=()=>{}}){
 validateQuestions(questions,options);
 const {PDFDocument,StandardFonts,rgb,PDFName,PDFArray}=root.PDFLib;
 const doc=await PDFDocument.create(),latin=await doc.embedFont(StandardFonts.Helvetica);
 const rows=ordered(questions,topics,options.sort);const mode=options.mode||'student';
 const contentsCount=Math.ceil(rows.length/22);const cover=doc.addPage([W,H]);const contents=Array.from({length:contentsCount},()=>doc.addPage([W,H]));
 const pdfs=new Map();let position=1+contentsCount;const entries=[];const drawn=[];
 async function appendSegment(q,seg,i,marking=false){
   if(!pdfs.has(seg.asset))pdfs.set(seg.asset,PDFDocument.load(await readAsset(seg.asset)));
   const source=await pdfs.get(seg.asset),sourcePage=source.getPage(seg.page),sourceH=sourcePage.getHeight();
   const embedded=await doc.embedPage(sourcePage,{left:35,right:560,bottom:sourceH-seg.bottom,top:sourceH-seg.top});const out=doc.addPage([W,H]);const scale=Math.min(1,525/embedded.width,725/embedded.height);out.drawPage(embedded,{x:35,y:H-75-embedded.height*scale,width:embedded.width*scale,height:embedded.height*scale});
   const header=await renderSheet('header',{q,index:i+1,options,marking});out.drawImage(await doc.embedPng(header),{x:35,y:H-47,width:525,height:30});drawn.push(out);position++;
 }
 for(let i=0;i<rows.length;i++){
  const q=rows[i];entries.push({...q,start:position+1});
  for(const seg of q[mode]){
   await appendSegment(q,seg,i);
  }
  if(options.extraSpace){const out=doc.addPage([W,H]);const head=await renderSheet('header',{q,index:i+1,options,working:true});out.drawImage(await doc.embedPng(head),{x:35,y:H-47,width:525,height:30});for(let y=H-110;y>70;y-=25)out.drawLine({start:{x:40,y},end:{x:555,y},thickness:.4,color:rgb(.84,.88,.85)});drawn.push(out);position++;}
  onProgress(`正在編排 ${i+1} / ${rows.length} 題…`);
 }
 if(mode==='student'){const divider=doc.addPage([W,H]);divider.drawImage(await doc.embedPng(await renderSheet('marking-divider',{rows,options})),{x:0,y:0,width:W,height:H});position++;for(let i=0;i<rows.length;i++){const q=rows[i];if(!q.marking?.length)throw Error('Missing marking scheme: '+q.id);entries[i].markingStart=position+1;for(const seg of q.marking)await appendSegment(q,seg,i,true);onProgress(`Marking schemes ${i+1} / ${rows.length}`);}}
 cover.drawImage(await doc.embedPng(await renderSheet('cover',{rows,options})),{x:0,y:0,width:W,height:H});
 for(let i=0;i<contents.length;i++){
  const subset=entries.slice(i*22,(i+1)*22);contents[i].drawImage(await doc.embedPng(await renderSheet('contents',{entries:subset,options,index:i,total:contents.length})),{x:0,y:0,width:W,height:H});
  subset.forEach((e,j)=>{const target=doc.getPage(e.start-1);const ann=doc.context.register(doc.context.obj({Type:'Annot',Subtype:'Link',Rect:[35,H-179-j*27,e.markingStart?515:560,H-152-j*27],Border:[0,0,0],Dest:[target.ref,'XYZ',0,H,null]}));if(e.markingStart){const markLink=doc.context.register(doc.context.obj({Type:'Annot',Subtype:'Link',Rect:[515,H-179-j*27,560,H-152-j*27],Border:[0,0,0],Dest:[doc.getPage(e.markingStart-1).ref,'XYZ',0,H,null]}));let links=contents[i].node.get(PDFName.of('Annots'));if(!links){links=doc.context.obj([]);contents[i].node.set(PDFName.of('Annots'),links);}links.push(markLink);}
 let a=contents[i].node.get(PDFName.of('Annots'));if(!a){a=doc.context.obj([]);contents[i].node.set(PDFName.of('Annots'),a);}a.push(ann);});
 }
 doc.getPages().forEach((p,i)=>{p.drawRectangle({x:30,y:10,width:540,height:28,color:rgb(1,1,1)});p.drawText(`${i+1} / ${doc.getPageCount()}`,{x:520,y:23,size:8,font:latin,color:rgb(.4,.5,.44)});if(i>contentsCount){p.drawText('CONTENTS',{x:35,y:23,size:8,font:latin,color:rgb(.2,.4,.32)});const a=doc.context.register(doc.context.obj({Type:'Annot',Subtype:'Link',Rect:[30,15,110,37],Border:[0,0,0],Dest:[contents[0].ref,'XYZ',0,H,null]}));p.node.set(PDFName.of('Annots'),doc.context.obj([a]));}});
 doc.setTitle(options.title||'DSE Mathematics Topic Booklet');doc.setSubject('HKDSE Mathematics Paper 1 · Selected questions');doc.setAuthor('DSE 數學題庫');doc.setProducer('DSE Topic Bank / pdf-lib');
 onProgress('正在儲存 PDF…');return {bytes:await doc.save(),pages:doc.getPageCount(),questions:rows.length,markingQuestions:mode==='student'?rows.length:0};
}
root.BankPDF={build,ordered,validateQuestions,W,H};if(typeof module!=='undefined')module.exports=root.BankPDF;
})(typeof window!=='undefined'?window:globalThis);
