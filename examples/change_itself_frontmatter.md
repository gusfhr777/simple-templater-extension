---
last-updated: 
status: 
weather: good
mood: qwer
diligence: false
---
<%*class te{constructor(t){this.tR='';try{this.v=app.vault;this.fs=this.v.adapter.fs;this.p=this.v.adapter.path;this.tp=t;this.b=this.v.adapter.basePath;this.state="vault";this.file=t.file;this.config=t.config;this.date=t.date;this.frontmatter=t.frontmatter;this.hooks=t.hooks;this.system=t.system;this.web=t.web;this.obsidian=t.obsidian}catch(e){this.fs=require('fs');this.state="nodejs"}}__report(m){console.error(m);this.tR+=m}getFrontmatter(p){let f={};if(this.fs.existsSync(p)){const c=this.fs.readFileSync(p,'utf-8').match(/^---([\s\S]*?)---/);if(c){for(let l of c[1].split('\n').slice(1,-1)){let[k,v]=l.split(":");f[k]=v.trim()}}else{this.__report("ERR: frontmatter does not exist or match error.");return null}}else{this.__report("ERR: file does not exist.");return null}return f}saveFrontmatter(p,f){const t=100;if(this.fs.existsSync(p)){setTimeout(()=>{const c=this.fs.readFileSync(p,'utf8').replace(/^---([\s\S]*?)---/,"---\n"+Object.entries(f).map(([k,v])=>`${k}: ${v}`).join('\n')+"\n---");this.fs.writeFileSync(p,c,'utf8')},t)}}getFilePath(f){return this.p.join(this.b,this.tp.file.find_tfile(f).path)}};tp=new te(tp);%>




<%*// modify frontmatter of itself.
let filename = tp.file.title;
let path = tp.getFilePath(filename);
let frontmatter = tp.getFrontmatter(path);

frontmatter.last_updated = tp.date.now("YYYY-MM-DD(dd)");
frontmatter.status = "modified";
frontmatter.mood = "too nice";
frontmatter.weather = "cloudy";
frontmatter.diligence = "true";

tp.saveFrontmatter(path, frontmatter);

%>