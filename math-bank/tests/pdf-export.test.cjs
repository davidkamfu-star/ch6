const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const PDFLib=require('pdf-lib');
globalThis.PDFLib=PDFLib;
const engine=require('../pdf-engine.js');
const segment={asset:'source.pdf',page:0,top:45,bottom:300};
const question=(id,extra={})=>({id,year:2026,number:1,section:'A1',topic:'t',topicName:'Topic',marks:3,student:[{...segment}],teacher:[{...segment}],marking:[{...segment}],...extra});
const options={mode:'student',sort:'topic',language:'en'};

test('both complete banks pass preflight',()=>{
 for(const file of ['bank.json','bank-en.json']){
  const bank=JSON.parse(fs.readFileSync(path.join(__dirname,'..',file)));
  for(const mode of ['student','teacher'])engine.validateQuestions(bank.questions,{...options,mode});
 }
});

test('preflight lists all missing or invalid data before any PDF work',async()=>{
 let calls=0;const fail=()=>{calls++;throw Error('PDF work must not start');};
 const invalid=[question('missing',{marking:undefined}),question('empty',{marking:[]}),question('malformed',{marking:[{...segment,page:-1}]}),question('missing-question',{student:[]})];
 await assert.rejects(engine.build({questions:invalid,topics:[],options,readAsset:fail,renderSheet:fail}),error=>{
  for(const q of invalid)assert.ok(error.message.includes(q.id));
  return true;
 });
 assert.equal(calls,0);
 assert.doesNotThrow(()=>engine.validateQuestions([question('teacher-only',{marking:undefined})],{mode:'teacher'}));
 assert.throws(()=>engine.validateQuestions([question('缺漏',{marking:null})],{mode:'student',language:'zh-Hant'}),/缺少評卷參考/);
});

function appContext(q){
 const elements=new Map();
 const get=id=>{if(!elements.has(id))elements.set(id,{value:'',checked:false,disabled:false,textContent:'',innerHTML:'',classList:{add(){},remove(){}}});return elements.get(id);};
 get('mode').value='student';get('sort').value='topic';
 const context=vm.createContext({BankPDF:engine,document:{getElementById:get},localStorage:{setItem(){}},console});
 const source=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
 vm.runInContext(source.slice(0,source.lastIndexOf("$('closeModal').onclick")),context);
 context.fixture=q;
 vm.runInContext('bank={questions:[fixture],topics:[]};selected=new Set([fixture.id]);',context);
 return {context,get};
}

test('summary survives missing marking and export recovers for retry',async()=>{
 for(const marking of [undefined,[],null,{}]){
  const {context,get}=appContext(question('missing',{marking}));
  assert.doesNotThrow(()=>vm.runInContext('renderSummary()',context));
  await vm.runInContext('exportPdf()',context);
  assert.equal(vm.runInContext('busy',context),false);
  assert.equal(get('exportPdf').disabled,false);
  assert.match(get('exportStatus').textContent,/missing/);
  // Retry remains possible after another failed attempt.
  await vm.runInContext('exportPdf()',context);
  assert.equal(vm.runInContext('busy',context),false);
 }
});

test('errors during initial summary still restore busy state',async()=>{
 const {context,get}=appContext(question('valid'));
 vm.runInContext("const originalSummary=renderSummary;let attempts=0;renderSummary=()=>{if(attempts++===0)throw Error('summary failed');return originalSummary();};",context);
 await vm.runInContext('exportPdf()',context);
 assert.equal(vm.runInContext('busy',context),false);
 assert.equal(get('exportPdf').disabled,false);
 assert.equal(get('exportStatus').textContent,'summary failed');
});

test('actual PDF links cover row bottoms and keep destinations after multi-page questions',async()=>{
 const source=await PDFLib.PDFDocument.create();source.addPage([595.28,841.89]).drawText('Source question');const bytes=await source.save();
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aG1cAAAAASUVORK5CYII=','base64');
 const questions=Array.from({length:23},(_,i)=>question('q'+i,{number:i+1,student:i===0?[{...segment},{...segment}]:[{...segment}],marking:i===22?[{...segment},{...segment}]:[{...segment}]}));
 const entries=[];
 const result=await engine.build({questions,topics:[{id:'t'}],options:{...options,extraSpace:true},readAsset:async()=>bytes,renderSheet:async(kind,data)=>{if(kind==='contents')entries.push(...data.entries);return png;}});
 const pdf=await PDFLib.PDFDocument.load(result.bytes);const pages=pdf.getPages();
 assert.equal(result.pages,75); // cover + 2 contents + 24 question + 23 working + divider + 24 marking
 for(let i=0;i<23;i++){
  const annotations=pages[1+Math.floor(i/22)].node.lookup(PDFLib.PDFName.of('Annots'),PDFLib.PDFArray);
  const marking=annotations.lookup((i%22)*2,PDFLib.PDFDict),questionLink=annotations.lookup((i%22)*2+1,PDFLib.PDFDict);
  for(const [annotation,start] of [[questionLink,entries[i].start],[marking,entries[i].markingStart]]){
   const dest=annotation.lookup(PDFLib.PDFName.of('Dest'),PDFLib.PDFArray);
   assert.equal(dest.get(0).toString(),pages[start-1].ref.toString());
   const rect=annotation.lookup(PDFLib.PDFName.of('Rect'),PDFLib.PDFArray).asArray().map(n=>n.asNumber());
   const rowTop=152+(i%22)*27,rowBottom=rowTop+27;
   assert.ok(Math.abs(rect[1]-(engine.H-rowBottom))<1e-6);
   assert.ok(Math.abs(rect[3]-(engine.H-rowTop))<1e-6);
   // The old bug sent a click at visible-row y + 23 to the next row.
   const clickY=engine.H-(rowTop+23);
   assert.ok(clickY>rect[1]&&clickY<rect[3]);
  }
 }
});
