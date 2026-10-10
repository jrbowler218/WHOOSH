const W={d:.35,p:.30,f:.15,r:.10,s:.10};
const SH={Tops:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Knitwear:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Coats:"M28 18L42 12L50 30L58 12L72 18L90 50L80 58L72 48V112H28V48L20 58L10 50Z",Trousers:"M30 15H70L74 112H55L50 50L45 112H26Z",Skirts:"M34 20H66L84 106H16Z",Shoes:"M10 80V60Q30 62 40 48L52 56Q60 70 90 74L92 90H10Z"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money=n=>"£"+(Number.isInteger(n)?n:n.toFixed(2));
function sil(x){const s=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'><rect width='100' height='125' fill='#ebe6dd'/><path d='${SH[x.c]}' transform='translate(0 6)' fill='${x.col}' fill-opacity='.8'/></svg>`;return"data:image/svg+xml,"+encodeURIComponent(s)}
function score(x){const disc=Math.round((1-x.now/x.was)*100);
const s={d:Math.min(disc/70,1),f:Math.pow(.5,x.age/7),s:x.st};
if(x.pop!=null){s.p=Math.min(Math.log10(x.pop+1)/Math.log10(15001),1);s.r=(x.rt-3)/2}
let tw=0,t=0;for(const k in s){tw+=W[k];t+=W[k]*s[k]}
return{disc,score:Math.round(t/tw*100)}}
const D=PRODUCTS.map(x=>Object.assign(x,score(x)));
let fb="All",fc="All",sort="score";
const brands=["All",...new Set(D.map(x=>x.b))],cats=["All",...new Set(D.map(x=>x.c))];
document.getElementById("cat").innerHTML=cats.map(c=>`<option>${c}</option>`).join("");
function render(){
document.getElementById("brands").innerHTML=brands.map(b=>`<button aria-pressed="${b==fb}" data-b="${esc(b)}">${esc(b)}</button>`).join("");
const L=D.filter(x=>(fb=="All"||x.b==fb)&&(fc=="All"||x.c==fc)).sort((a,b)=>sort=="discount"?b.disc-a.disc:sort=="newest"?a.age-b.age:b.score-a.score);
document.getElementById("count").textContent=L.length+(L.length==1?" deal":" deals");
document.getElementById("grid").innerHTML=L.map((x,i)=>{
const tg=[x.age<=2?"Just dropped":"",x.st<.5?"Limited sizes":""].filter(Boolean).join(" · ");
return `<article class="card"><a href="${x.url||RETAILERS[x.b]}" target="_blank" rel="noopener sponsored nofollow"><div class="img"><img src="${x.img||sil(x)}" alt="${esc(x.n)}" loading="lazy"><span class="off">-${x.disc}%</span></div><div class="meta"><span class="br">${esc(x.b)} · ${esc(x.c)}</span><span class="nm">${esc(x.n)}</span><span class="pr">${money(x.now)}<s>${money(x.was)}</s><em>Save ${money(x.was-x.now)}</em></span><div class="tg">${tg}</div><div class="sc">Whoosh score <b>${x.score}</b>${x.full?"":" · limited data"}<i><u style="width:${x.score}%"></u></i></div></div></a></article>`}).join("")}
document.getElementById("brands").onclick=e=>{const t=e.target.closest("button");if(t){fb=t.dataset.b;render()}};
document.getElementById("cat").onchange=e=>{fc=e.target.value;render()};
document.getElementById("sort").onchange=e=>{sort=e.target.value;render()};
render();
