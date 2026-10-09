const W={d:.35,p:.30,f:.15,r:.10,s:.10},C=['#1f3fff','#7b93ff','#12b76a','#f79009','#98a2b3'];
const SH={Tops:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Knitwear:"M30 20L42 14Q50 24 58 14L70 20L88 40L76 50L70 44V108H30V44L24 50L12 40Z",Coats:"M28 18L42 12L50 30L58 12L72 18L90 50L80 58L72 48V112H28V48L20 58L10 50Z",Trousers:"M30 15H70L74 112H55L50 50L45 112H26Z",Skirts:"M34 20H66L84 106H16Z",Shoes:"M10 80V60Q30 62 40 48L52 56Q60 70 90 74L92 90H10Z"};
function sil(x){const s=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${x.col}'/><stop offset='1' stop-color='#000' stop-opacity='.35'/></linearGradient></defs><rect width='100' height='125' fill='url(#g)'/><path d='${SH[x.c]}' transform='translate(0 6)' fill='#fff' fill-opacity='.6'/></svg>`;return"data:image/svg+xml,"+encodeURIComponent(s)}
function score(x){const disc=Math.round((1-x.now/x.was)*100);
const s={d:Math.min(disc/70,1),f:Math.pow(.5,x.age/7),s:x.st};
if(x.pop!=null){s.p=Math.min(Math.log10(x.pop+1)/Math.log10(15001),1);s.r=(x.rt-3)/2}
let tw=0,t=0;const parts={};for(const k in s){tw+=W[k];t+=W[k]*s[k]}
for(const k of['d','p','f','r','s'])parts[k]=s[k]==null?0:W[k]*s[k]/tw*100;
return{disc,score:Math.round(t/tw*100),parts,conf:x.full?"Strong data":"Limited data"}}
const D=PRODUCTS.map(x=>Object.assign(x,score(x)));
let fb="All",sort="score";const brands=["All",...new Set(D.map(x=>x.b))];
const chips=(l,c,k)=>l.map(v=>`<button class="chip" aria-pressed="${v==c}" data-k="${k}" data-v="${v}">${v}</button>`).join("");
function render(){
bar.innerHTML=chips(brands,fb,"b")+'<span class="sp"></span>'+chips(["score","discount","newest"],sort,"s");
const L=D.filter(x=>fb=="All"||x.b==fb).sort((a,b)=>sort=="discount"?b.disc-a.disc:sort=="newest"?a.age-b.age:b.score-a.score);
grid.innerHTML=L.map((x,i)=>`<article class="card"><a href="${x.url||RETAILERS[x.b]}" target="_blank" rel="noopener sponsored nofollow"><div class="img"><img src="${x.img||sil(x)}" alt="${x.n}" loading="lazy"><span class="rank">#${i+1}</span><span class="off">-${x.disc}%</span><span class="tag">${x.age==0?"Dropped today":"Dropped "+x.age+"d ago"}</span></div><div class="b"><span class="br">${x.b} · ${x.c}</span><span class="nm">${x.n}</span><span class="pr">£${x.now}<s>£${x.was}</s></span><div class="sc"><b>${x.score}</b><div class="bars">${["d","p","f","r","s"].map((k,j)=>`<i style="width:${x.parts[k]}%;background:${C[j]}"></i>`).join("")}</div></div><span class="conf">${x.conf}</span></div></a></article>`).join("")}
bar.onclick=e=>{const t=e.target.closest("button");if(!t)return;t.dataset.k=="b"?fb=t.dataset.v:sort=t.dataset.v;render()};
render();
