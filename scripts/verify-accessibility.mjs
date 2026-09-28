import fs from 'node:fs'; import {createRequire} from 'node:module'; import assert from 'node:assert/strict';
const require=createRequire('C:/Users/mugen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const routes=['/','/projects','/projects/multi-uav','/projects/remote-4g-drone','/projects/mugen-no-sekai','/30-projects','/about'];
const findings=[]; const base=process.env.CHECK_BASE_URL || 'http://localhost:3000';
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 for(const route of routes){
  await page.goto(base+route,{waitUntil:'load'});
  const a=await page.evaluate(()=>{
   function rgb(v){const values=[...v.matchAll(/[0-9.]+/g)].map(x=>Number(x[0])); if(v.startsWith('color('))for(let i=0;i<3;i++)values[i]*=255; if(values.length===3)values.push(1);return values;}
   function lum(c){return c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
   const contrast=[],smallTargets=[];
   for(const el of document.querySelectorAll('body *')){
    if(el.closest('svg,[aria-hidden="true"],nextjs-portal')||!el.getClientRects().length)continue;
    const css=getComputedStyle(el),rect=el.getBoundingClientRect();
    if(el.matches('a,button')&&rect.width>0&&rect.height<24)smallTargets.push({text:el.textContent.trim().slice(0,50),w:rect.width,h:rect.height});
    if(![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;
    if(css.visibility==='hidden'||Number(css.opacity)===0)continue;
    let bg=[11,13,12],opacity=1;
    const chain=[];for(let p=el;p;p=p.parentElement)chain.push(p);
    for(const p of chain.reverse()){
     const ps=getComputedStyle(p),color=rgb(ps.backgroundColor);
     if(color.length>=4)bg=bg.map((v,i)=>color[i]*color[3]+v*(1-color[3]));
     opacity*=Number(ps.opacity);
    }
    const fg=rgb(css.color).slice(0,3).map((v,i)=>v*opacity+bg[i]*(1-opacity));
    const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    const large=parseFloat(css.fontSize)>=24||(parseFloat(css.fontSize)>=18.66&&Number(css.fontWeight)>=700);
    if(ratio<(large?3:4.5))contrast.push({class:el.className,text:el.textContent.trim().slice(0,65),ratio:ratio.toFixed(2),size:css.fontSize});
   }
   return {contrast,smallTargets};
  });
  findings.push({route,...a});
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% overflow '+route);
  assert.ok(await page.locator('.skip-link').evaluate(el=>el.getBoundingClientRect().bottom<=0),'200% skip hidden');
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto(base+'/projects',{waitUntil:'load'});
 await page.evaluate(()=>document.activeElement?.blur()); await page.locator('.showcase-control').screenshot({path:'artifacts/polish-control-mobile.png'});
 await page.locator('.showcase-mission').screenshot({path:'artifacts/polish-mission-mobile.png'});
 await page.setViewportSize({width:768,height:1024});
 await page.goto(base+'/projects',{waitUntil:'load'});
 await page.evaluate(()=>document.activeElement?.blur()); await page.locator('.showcase-control').screenshot({path:'artifacts/polish-control-tablet.png'});
 await page.locator('.showcase-lab').screenshot({path:'artifacts/polish-lab-tablet.png'});
 fs.writeFileSync('artifacts/polish-accessibility-findings.json',JSON.stringify(findings,null,2));
 for(const finding of findings){assert.deepEqual(finding.contrast,[],finding.route+' contrast');assert.deepEqual(finding.smallTargets,[],finding.route+' compact targets');} console.log('PASS: seven routes at 200% text, computed text contrast and compact target heights.');
}finally{await browser.close()}
