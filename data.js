/* SAMPLE DATA - replaced by real Awin feed data later. Fields: b brand, n name, c category, now/was price, age days since price drop, pop interest, rt rating, st stock share 0-1, url retailer link, img photo URL (optional), full = has all signals */
const PRODUCTS=[
{b:"NEXT",n:"Chunky knit crew jumper",c:"Knitwear",now:20,was:45,age:3,pop:4200,rt:4.6,st:.9,col:"#c9b8a6",full:1},
{b:"ASOS",n:"Oversized fleece hoodie",c:"Tops",now:14,was:32,age:1,pop:9800,rt:4.4,st:.8,col:"#8fa3b8",full:1},
{b:"H&M",n:"Wide-leg tailored trousers",c:"Trousers",now:16,was:40,age:6,pop:2100,rt:4.2,st:.7,col:"#6d7a6a",full:1},
{b:"M&S",n:"Wool-blend overcoat",c:"Coats",now:69,was:149,age:12,pop:1300,rt:4.7,st:.5,col:"#4a4f5a",full:1},
{b:"Zara",n:"Faux-suede bomber",c:"Coats",now:39,was:89,age:2,pop:null,rt:null,st:.6,col:"#a4825f",full:0},
{b:"NEXT",n:"Slim stretch chinos",c:"Trousers",now:18,was:38,age:9,pop:3300,rt:4.3,st:.9,col:"#b7a98c",full:1},
{b:"ASOS",n:"Retro court trainers",c:"Shoes",now:28,was:60,age:0,pop:12500,rt:4.5,st:.6,col:"#8a8f98",full:1},
{b:"H&M",n:"Ribbed cotton tee 3-pack",c:"Tops",now:9,was:25,age:20,pop:15000,rt:4.1,st:1,col:"#9aa3b0",full:1},
{b:"M&S",n:"Merino roll-neck",c:"Knitwear",now:35,was:69,age:4,pop:1800,rt:4.8,st:.4,col:"#7d4f50",full:1},
{b:"Zara",n:"Pleated midi skirt",c:"Skirts",now:19,was:50,age:5,pop:null,rt:null,st:.7,col:"#5c6f8f",full:0}
];
const RETAILERS={NEXT:"https://www.next.co.uk",ASOS:"https://www.asos.com","H&M":"https://www2.hm.com/en_gb/","M&S":"https://www.marksandspencer.com",Zara:"https://www.zara.com/uk/"};
