const W={d:.35,p:.30,f:.15,r:.10,s:.10},PAL=["#E8B4B8","#E4D8CC","#EBB07A","#C3CBF3","#D9A3A0"];
const SH={Tops:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Knitwear:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Coats:"M28 18L42 12L50 30L58 12L72 18L90 50L80 58L72 48V112H28V48L20 58L10 50Z",Trousers:"M30 15H70L74 112H55L50 50L45 112H26Z",Skirts:"M34 20H66L84 106H16Z",Shoes:"M10 80V60Q30 62 40 48L52 56Q60 70 90 74L92 90H10Z"};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money=n=>"£"+(Number.isInteger(n)?n:n.toFixed(2));
const sil=x=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'><path d='${SH[x.c]}' transform='translate(0 6)' fill='${x.col}' fill-opacity='.85'/></svg>`);
function score(x){const disc=Math.round((1-x.now/x.was)*100);
const s={d:Math.min(disc/70,1),f:Math.pow(.5,x.age/7),s:x.st};
if(x.pop!=null){s.p=Math.min(Math.log10(x.pop+1)/Math.log10(15001),1);s.r=(x.rt-3)/2}
let tw=0,t=0;for(const k in s){tw+=W[k];t+=W[k]*s[k]}
const sc=Math.round(t/tw*100);return{disc,score:sc,holes:sc>=80?4:sc>=65?3:sc>=50?2:1}}
function holes(n){const p=[[11,6],[6,11],[16,11],[11,16]];return `<svg class="holes" viewBox="0 0 22 22" width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="10.5" fill="#880015"/>${p.map((q,i)=>`<circle cx="${q[0]}" cy="${q[1]}" r="2.1" fill="${i<n?'#F2E9E3':'#a8334a'}"/>`).join("")}</svg>`}
function check(x){if(x.low==null)return`<span class="pc">Price history building</span>`;
return x.now<=x.low?`<span class="pc ok">Genuine drop: lowest in 90 days</span>`:`<span class="pc">Dipped lower before (${money(x.low)})</span>`}
const D=PRODUCTS.map((x,i)=>Object.assign(x,score(x),{tile:PAL[i%PAL.length],key:x.b+"|"+x.n}));
const link=x=>x.url||RETAILERS[x.b];
const photo=x=>`<img src="${x.img||sil(x)}" alt="${esc(x.n)}" loading="lazy">`;
let saved=new Set();try{saved=new Set(JSON.parse(localStorage.getItem("whoosh-saved")||"[]"))}catch(e){}
const keep=()=>{try{localStorage.setItem("whoosh-saved",JSON.stringify([...saved]))}catch(e){}};
const HEART='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5C5 15.5 2.5 12 2.5 8.6 2.5 5.9 4.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 2.4 0 4.5 1.900 4.500 4.600 0 3.400-2.500 6.900-9.500 11.900z"/></svg>';
function card(x,o={}){const tg=[x.age<=2?"Just dropped":"",x.st<.5?"Limited sizes":""].filter(Boolean).join(" · ");
return `<article class="card${o.big?" big":""}"><button class="sv" data-k="${esc(x.key)}" aria-pressed="${saved.has(x.key)}" aria-label="Save ${esc(x.n)}">${HEART}</button><a class="cl" href="${link(x)}" target="_blank" rel="noopener sponsored nofollow"><div class="img" style="background:${x.tile}">${photo(x)}<span class="off">-${x.disc}%</span></div><div class="meta"><span class="br">${esc(x.b)} · ${esc(x.c)}</span><span class="nm">${esc(x.n)}</span><span class="pr">${money(x.now)}<s>${money(x.was)}</s><em>Save ${money(x.was-x.now)}</em></span>${check(x)}<div class="tg">${tg}</div>${x.note?`<p class="nt">${esc(x.note)}</p>`:""}${o.small?"":`<div class="sc">${holes(x.holes)}<span><b>${x.holes==4?"Four-hole find":x.holes+" of 4 holes"}</b> · ${x.score}${x.full?"":" · limited data"}</span></div>`}</div></a></article>`}
const byScore=(a,b)=>b.score-a.score;
/* hero */
const top=[...D].sort(byScore)[0];
$("frame").innerHTML=`<div class="fi"><img src="${HERO_IMG||sil(top)}" alt="${HERO_IMG?"Whoosh campaign photo":esc(top.n)}" style="${HERO_IMG?"":"padding:14%"}"></div><div class="stk"><span>Top deal</span><b>-${top.disc}%</b><span>${esc(top.b)}</span></div>`;
const mq=[...D].sort(byScore).slice(0,6).map(x=>`${esc(x.b)} ${esc(x.n)} -${x.disc}% ${money(x.now)}`);
const strip=["Real discounts only",...mq].map(t=>`${t}<i>●</i>`).join("");$("mq").innerHTML=strip+strip;
/* pick */
const pk=D.find(x=>x.n===PICK.n);
if(pk&&PICK.note)$("pick").innerHTML=`<div class="w"><p class="num">01 / Pick of the week</p><a class="pick-a" href="${link(pk)}" target="_blank" rel="noopener sponsored nofollow"><div class="img" style="background:${pk.tile}">${photo(pk)}<span class="off">-${pk.disc}%</span></div><div class="pick-t"><h2>${esc(pk.n)}</h2><p class="pnote">${esc(PICK.note)}</p><p class="by">${esc(PICK.by)}, editor</p><p class="pr">${money(pk.now)}<s>${money(pk.was)}</s></p>${check(pk)}</div></a></div>`;else $("pick").hidden=true;
/* main grid */
let fb="All",fc="All",sort="score",only=false;
const brands=["All",...new Set(D.map(x=>x.b))],cats=["All",...new Set(D.map(x=>x.c))];
$("cat").innerHTML=cats.map(c=>`<option>${c}</option>`).join("");
function render(){
$("brands").innerHTML=brands.map(b=>`<button aria-pressed="${b==fb}" data-b="${esc(b)}">${esc(b)}</button>`).join("");
const L=D.filter(x=>(fb=="All"||x.b==fb)&&(fc=="All"||x.c==fc)&&(!only||saved.has(x.key))).sort((a,b)=>sort=="discount"?b.disc-a.disc:sort=="newest"?a.age-b.age:byScore(a,b));
$("count").textContent=L.length+(L.length==1?" deal":" deals");
$("grid").innerHTML=L.length?L.map(x=>card(x)).join(""):`<p class="mute">${only?"Nothing saved yet. Tap the heart on anything you like.":"Nothing here yet. Try another brand or category."}</p>`;
$("svb").textContent="Saved ("+saved.size+")";$("svb").setAttribute("aria-pressed",only)}
/* brand discovery */
$("bl").innerHTML=brands.slice(1).map(b=>{const L=D.filter(x=>x.b==b);return `<button class="bb" data-b="${esc(b)}"><span class="bn">${esc(b)}</span><span class="bi">${L.length} ${L.length==1?"deal":"deals"}<br>up to -${Math.max(...L.map(x=>x.disc))}%</span></button>`}).join("");
/* under 30 */
const u=D.filter(x=>x.now<30).sort(byScore);
if(u.length)$("u30l").innerHTML=u.map(x=>card(x,{big:1})).join("");else $("u30").hidden=true;
/* collection */
const cl=D.filter(x=>x.c==COLLECTION.cat);
if(cl.length&&COLLECTION.title)$("collc").innerHTML=`<div><p class="num">Collection 01</p><h2 class="ct">${esc(COLLECTION.title)}</h2><div class="cimg">${COLLECTION.img?`<img src="${COLLECTION.img}" alt="${esc(COLLECTION.title)}">`:`<img src="${sil(cl[0])}" alt="" style="padding:12%">`}</div></div><div class="cp">${cl.map(x=>card(x,{small:1})).join("")}</div>`;else $("coll").hidden=true;
/* latest */
$("latest").innerHTML=[...D].sort((a,b)=>a.age-b.age).slice(0,6).map(x=>card(x)).join("");
if(LOOKS.length)$("looks").innerHTML=`<div class="w"><h2 class="sh">Found and worn</h2><div class="lgrid">${LOOKS.map(l=>`<figure><img src="${l.img}" alt="${esc(l.alt||"")}" loading="lazy"><figcaption>${esc(l.cap||"")}${l.url?` <a href="${l.url}" target="_blank" rel="noopener sponsored nofollow">See it</a>`:""}</figcaption></figure>`).join("")}</div></div>`;else $("looks").hidden=true;
document.addEventListener("click",e=>{
const s=e.target.closest(".sv");if(s){const k=s.dataset.k;saved.has(k)?saved.delete(k):saved.add(k);keep();document.querySelectorAll(".sv").forEach(b=>{if(b.dataset.k==k)b.setAttribute("aria-pressed",saved.has(k))});$("svb").textContent="Saved ("+saved.size+")";if(only)render();return}
const b=e.target.closest("[data-b]");if(b){fb=b.dataset.b;only=false;render();if(b.classList.contains("bb"))$("deals").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})}});
$("cat").onchange=e=>{fc=e.target.value;render()};$("sort").onchange=e=>{sort=e.target.value;render()};$("svb").onclick=()=>{only=!only;render()};
render();
