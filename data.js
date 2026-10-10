/* SAMPLE DATA - replaced by the real Awin feed later.
b brand, n name, c category, now/was price, low = lowest price recorded in the last 90 days (leave out if unknown),
age = days since the price dropped, pop = interest signal, rt = rating, st = share of sizes in stock (0-1),
note = optional one-line opinion, url = retailer link, img = photo URL, full = 1 if all signals are present */
const PRODUCTS=[
{b:"NEXT",n:"Chunky knit crew jumper",c:"Knitwear",now:20,was:45,low:20,age:3,pop:4200,rt:4.6,st:.9,col:"#9b8570",full:1},
{b:"ASOS",n:"Oversized fleece hoodie",c:"Tops",now:14,was:32,low:14,age:1,pop:9800,rt:4.4,st:.8,col:"#6f8499",full:1},
{b:"H&M",n:"Wide-leg tailored trousers",c:"Trousers",now:16,was:40,low:13,age:6,pop:2100,rt:4.2,st:.7,col:"#5d6b5a",full:1},
{b:"M&S",n:"Wool-blend overcoat",c:"Coats",now:69,was:149,age:12,pop:1300,rt:4.7,st:.5,col:"#3f434d",full:1},
{b:"Zara",n:"Faux-suede bomber",c:"Coats",now:39,was:89,age:2,pop:null,rt:null,st:.6,col:"#8a6a48",full:0},
{b:"NEXT",n:"Slim stretch chinos",c:"Trousers",now:18,was:38,low:16,age:9,pop:3300,rt:4.3,st:.9,col:"#a29473",full:1},
{b:"ASOS",n:"Retro court trainers",c:"Shoes",now:28,was:60,low:28,age:0,pop:12500,rt:4.5,st:.6,col:"#6e737c",full:1},
{b:"H&M",n:"Ribbed cotton tee 3-pack",c:"Tops",now:9,was:25,age:20,pop:15000,rt:4.1,st:1,col:"#7f8896",full:1},
{b:"M&S",n:"Merino roll-neck",c:"Knitwear",now:35,was:69,low:35,age:4,pop:1800,rt:4.8,st:.4,col:"#6b3a3d",full:1},
{b:"Zara",n:"Pleated midi skirt",c:"Skirts",now:19,was:50,age:5,pop:null,rt:null,st:.7,col:"#4c5d7a",full:0}
];
const RETAILERS={NEXT:"https://www.next.co.uk",ASOS:"https://www.asos.com","H&M":"https://www2.hm.com/en_gb/","M&S":"https://www.marksandspencer.com",Zara:"https://www.zara.com/uk/"};
/* PICK OF THE WEEK: n must match a product name exactly. Replace the note with one honest sentence of your own. Set note:"" to hide the section. */
const PICK={n:"Chunky knit crew jumper",by:"Lila Willeman",note:"Sample note: swap this for one honest sentence about why you'd buy it."};
/* FOUND AND WORN: add real photos (with permission) like {img:"looks/one.jpg",alt:"Description",cap:"Hoodie £14, trainers £28",url:"https://..."}. Leave empty to hide the section. */
const LOOKS=[];
