const W={d:.35,p:.30,f:.15,r:.10,s:.10};
const SH={Tops:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Knitwear:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Coats:"M28 18L42 12L50 30L58 12L72 18L90 50L80 58L72 48V112H28V48L20 58L10 50Z",Trousers:"M30 15H70L74 112H55L50 50L45 112H26Z",Skirts:"M34 20H66L84 106H16Z",Shoes:"M10 80V60Q30 62 40 48L52 56Q60 70 90 74L92 90H10Z"};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money=n=>"£"+(Number.isInteger(n)?n:n.toFixed(2));
function sil(x){const s=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'><rect width='100' height='125' fill='#ebe6dd'/><path d='${SH[x.c]}' transform='translate(0 6)' fill='${x.col}' fill-opacity='.8'/></svg>`;return"data:image/svg+xml,"+encodeURIComponent(s)}
function score(x){const disc=Math.round((1-x.now/x.was)*100);
const s={d:Math.min(disc/70,1),f:Math.pow(.5,x.age/7),s:x.st};
if(x.pop!=null){s.p=Math.min(Math.log10(x.pop+1)/Math.log10(15001),1);s.r=(x.rt-3)/2}
let tw=0,t=0;for(const k in s){tw+=W[k];t+=W[k]*s[k]}
const sc=Math.round(t/tw*100);
return{disc,score:sc,holes:sc>=80?4:sc>=65?3:sc>=50?2:1}}
function holes(n){const p=[[11,6],[6,11],[16,11],[11,16]];return `<svg class="holes" viewBox="0 0 22 22" width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="10.5" fill="#880015"/>${p.map((q,i)=>`<circle cx="${q[0]}" cy="${q[1]}" r="2.1" fill="${i<n?'#f7f4ef':'#a8334a'}"/>`).join("")}</svg>`}
function check(x){if(x.low==null)return`<span class="pc">Price history building</span>`;
return x.now<=x.low?`<span class="pc ok">Genuine drop: lowest in 90 days</span>`:`<span class="pc">Dipped lower before (${money(x.low)})</span>`}
const D=PRODUCTS.map(x=>Object.assign(x,score(x)));
const link=x=>x.url||RETAILERS[x.b];
let fb="All",fc="All",sort="score";
const brands=["All",...new Set(D.map(x=>x.b))],cats=["All",...new Set(D.map(x=>x.c))];
$("cat").innerHTML=cats.map(c=>`<option>${c}</option>`).join("");
const photo=x=>`<img src="${x.img||sil(x)}" alt="${esc(x.n)}" loading="lazy">`;
function render(){
$("brands").innerHTML=brands.map(b=>`<button aria-pressed="${b==fb}" data-b="${esc(b)}">${esc(b)}</button>`).join("");
const L=D.filter(x=>(fb=="All"||x.b==fb)&&(fc=="All"||x.c==fc)).sort((a,b)=>sort=="discount"?b.disc-a.disc:sort=="newest"?a.age-b.age:b.score-a.score);
$("count").textContent=L.length+(L.length==1?" deal":" deals");
$("grid").innerHTML=L.length?L.map(x=>{
const tg=[x.age<=2?"Just dropped":"",x.st<.5?"Limited sizes":""].filter(Boolean).join(" · ");
return `<article class="card"><a href="${link(x)}" target="_blank" rel="noopener sponsored nofollow"><div class="img">${photo(x)}<span class="off">-${x.disc}%</span></div><div class="meta"><span class="br">${esc(x.b)} · ${esc(x.c)}</span><span class="nm">${esc(x.n)}</span><span class="pr">${money(x.now)}<s>${money(x.was)}</s><em>Save ${money(x.was-x.now)}</em></span>${check(x)}<div class="tg">${tg}</div>${x.note?`<p class="nt">${esc(x.note)}</p>`:""}<div class="sc">${holes(x.holes)}<span><b>${x.holes==4?"Four-hole find":x.holes+" of 4 holes"}</b> · ${x.score}${x.full?"":" · limited data"}</span></div></div></a></article>`}).join(""):`<p class="mute">Nothing here yet. Try another brand or category.</p>`}
const pk=D.find(x=>x.n===PICK.n);
if(pk&&PICK.note)$("pick").innerHTML=`<a class="pick-a" href="${link(pk)}" target="_blank" rel="noopener sponsored nofollow"><div class="img">${photo(pk)}<span class="off">-${pk.disc}%</span></div><div class="pick-t"><p class="eyebrow">Pick of the week</p><h2>${esc(pk.n)}</h2><p class="pnote">&ldquo;${esc(PICK.note)}&rdquo;</p><p class="by">${esc(PICK.by)}, editor</p><p class="pr">${money(pk.now)}<s>${money(pk.was)}</s></p>${check(pk)}</div></a>`;
if(LOOKS.length)$("looks").innerHTML=`<h2 class="sh">Found and worn</h2><div class="lgrid">${LOOKS.map(l=>`<figure><img src="${l.img}" alt="${esc(l.alt||"")}" loading="lazy"><figcaption>${esc(l.cap||"")}${l.url?` <a href="${l.url}" target="_blank" rel="noopener sponsored nofollow">See it</a>`:""}</figcaption></figure>`).join("")}</div>`;
$("brands").onclick=e=>{const t=e.target.closest("button");if(t){fb=t.dataset.b;render()}};
$("cat").onchange=e=>{fc=e.target.value;render()};
$("sort").onchange=e=>{sort=e.target.value;render()};
render();
