/* MOOD BAR single-file offline */
(function(){
"use strict";
/* data.js */
const CATEGORIES = [
  {id:'spicy', label:'ПРЯНЫЕ', short:'Пряные', color:'#f5b1a8'},
  {id:'fruity', label:'ФРУКТОВЫЕ', short:'Фруктовые', color:'#d9e9ad'},
  {id:'smoky', label:'ДЫМНЫЕ', short:'Дымные', color:'#c6deed'},
  {id:'velvety', label:'БАРХАТИСТЫЕ', short:'Бархатистые', color:'#e8d5ea'}
];
const BASES = ['Текила','Джин','Ром','Водка','Мескаль'];
const COCKTAILS = [
 {id:'picante',name:'Пиканте Маргарита',category:'spicy',base:'Текила',price:690,stock:6,strength:4,description:'Чили, лайм и немного дерзости. Сначала цитрус — потом огонь.',ingredients:['Текила','Лайм','Сироп агавы','Чили'],notes:'Острая · Цитрусовая',palette:'#ffc49a',liquid:'#f0a349',glass:'rocks',garnish:'chili',photo:'./assets/images/picante-photo.jpg'},
 {id:'ginger',name:'Имбирный драйв',category:'spicy',base:'Ром',price:650,stock:7,strength:3,description:'Живой имбирный характер, свежесть лайма и немного пузырьков.',ingredients:['Ром','Имбирь','Лайм','Сироп','Содовая'],notes:'Имбирная · Свежая',palette:'#d3e7a0',liquid:'#d9a73a',glass:'highball',garnish:'mint',photo:'./assets/images/ginger-photo.jpg'},
 {id:'garden',name:'Огненный сад',category:'spicy',base:'Джин',price:730,stock:0,strength:4,description:'Ягоды, травы и розовый перец в огненном сочетании.',ingredients:['Джин','Клубника','Розмарин','Розовый перец'],notes:'Пряная · Ягодная',palette:'#e5b6c8',liquid:'#be394a',glass:'coupe',garnish:'berry',photo:'./assets/images/garden-photo.jpg'},
 {id:'blackberry',name:'Ежевичный закат',category:'fruity',base:'Текила',price:690,stock:8,strength:3,description:'Сочная ежевика, мягкая агава и яркий лайм.',ingredients:['Текила','Ежевика','Лайм','Сироп агавы'],notes:'Ягодная · Кисло-сладкая',palette:'#cde3a0',liquid:'#9c245a',glass:'rocks',garnish:'berry',photo:'./assets/images/blackberry-photo.jpg'},
 {id:'passion',name:'Маракуйя Мартини',category:'fruity',base:'Водка',price:750,stock:5,strength:3,description:'Тропический отпуск с нотами маракуйи и ванили.',ingredients:['Водка','Маракуйя','Ваниль','Лайм'],notes:'Тропическая · Сладкая',palette:'#d5daef',liquid:'#f6a51b',glass:'coupe',garnish:'citrus',photo:'./assets/images/passion-photo.jpg'},
 {id:'paloma',name:'Палома',category:'fruity',base:'Текила',price:650,stock:9,strength:2,description:'Розовый грейпфрут, освежающий лайм и лёгкая содовая.',ingredients:['Текила','Розовый грейпфрут','Лайм','Содовая'],notes:'Цитрусовая · Освежающая',palette:'#f7d3c2',liquid:'#f39a7a',glass:'highball',garnish:'citrus',photo:'./assets/images/paloma-photo.jpg'},
 {id:'negroni',name:'Мескаль Негрони',category:'smoky',base:'Мескаль',price:790,stock:5,strength:5,description:'Тёмный характер, горькие ноты и мягкий дым.',ingredients:['Мескаль','Кампари','Красный вермут'],notes:'Дымная · Горьковатая',palette:'#b9deec',liquid:'#ab3122',glass:'rocks',garnish:'citrus',photo:'./assets/images/negroni-photo.jpg'},
 {id:'cherry',name:'Копчёная вишня',category:'smoky',base:'Ром',price:770,stock:6,strength:4,description:'Вишнёвая глубина, выдержанный ром и пряное послевкусие.',ingredients:['Выдержанный ром','Вишня','Пряный сироп','Дымный аромат'],notes:'Дымная · Насыщенная',palette:'#efc1cc',liquid:'#78232b',glass:'coupe',garnish:'berry',photo:'./assets/images/cherry-photo.jpg'},
 {id:'pineapple',name:'Ананасовый сауэр',category:'smoky',base:'Мескаль',price:790,stock:4,strength:4,description:'Сладкий ананас встречается с дымком и шелковистой пеной.',ingredients:['Мескаль','Ананас','Лайм','Аквафаба'],notes:'Дымная · Тропическая',palette:'#f3d58c',liquid:'#eeb62c',glass:'coupe',garnish:'citrus',photo:'./assets/images/pineapple-photo.jpg'},
 {id:'espresso',name:'Эспрессо Мартини',category:'velvety',base:'Водка',price:690,stock:8,strength:4,description:'Крепкий эспрессо, мягкая пенка и вечер без компромиссов.',ingredients:['Водка','Свежий эспрессо','Кофейный ликёр'],notes:'Кофейная · Насыщенная',palette:'#f0c7bd',liquid:'#54342c',glass:'coupe',garnish:'berry',photo:'./assets/images/espresso-photo.jpg'},
 {id:'coconut',name:'Кокосовый крем',category:'velvety',base:'Ром',price:720,stock:7,strength:2,description:'Кокосовая мягкость и ананас в бархатистой текстуре.',ingredients:['Ром','Кокосовые сливки','Ананас','Ваниль'],notes:'Сливочная · Тропическая',palette:'#e4e5ac',liquid:'#e9d3a1',glass:'highball',garnish:'mint',photo:'./assets/images/coconut-photo.jpg'},
 {id:'pear',name:'Ночная груша',category:'velvety',base:'Джин',price:710,stock:0,strength:3,description:'Спелая груша, нежная ваниль и капля лимона.',ingredients:['Джин','Груша','Ваниль','Лимон'],notes:'Нежная · Фруктовая',palette:'#e1c9de',liquid:'#d8c078',glass:'coupe',garnish:'mint',photo:'./assets/images/pear-photo.jpg'}
];
const BASE_OPTIONS = [
 {id:'vodka',label:'Водка',price:390},{id:'gin',label:'Джин',price:420},{id:'rum',label:'Ром',price:440},{id:'tequila',label:'Текила',price:460},{id:'mezcal',label:'Мескаль',price:520},{id:'zero',label:'Безалкогольная',price:280}
];
const FLAVOR_OPTIONS = [
 {id:'fruity',label:'Фруктовый',price:80,color:'#e64d71'},
 {id:'spicy',label:'Пряный',price:70,color:'#d77835'},
 {id:'smoky',label:'Дымный',price:100,color:'#852e43'},
 {id:'velvety',label:'Бархатистый',price:90,color:'#e5bf84'},
 {id:'fresh',label:'Свежий',price:60,color:'#a6c764'}
];
const GARNISH_OPTIONS = [
 {id:'none',label:'Без украшения',price:0},{id:'citrus',label:'Цитрус',price:20},
 {id:'mint',label:'Мята',price:20},{id:'rosemary',label:'Розмарин',price:20},
 {id:'berries',label:'Ягоды',price:30},{id:'chili',label:'Чили',price:30}
];
const SIZE_MULTIPLIERS={S:0.85,M:1,L:1.25};
const INITIAL_STOCK = Object.fromEntries(COCKTAILS.map(c=>[c.id,c.stock]));
/* utils.js */
const $ = (s, root=document)=>root.querySelector(s);
const $$ = (s, root=document)=>Array.from(root.querySelectorAll(s));
const money=n=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0}).format(n)+' ₽';
const round10=n=>Math.round(n/10)*10;
const escapeHtml=(str='')=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>globalThis.crypto?.randomUUID?.() || `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const dateText=ts=>new Intl.DateTimeFormat('ru-RU',{dateStyle:'medium',timeStyle:'short'}).format(ts);
const itemSignature=i=>JSON.stringify([i.kind,i.id||null,i.name,i.size,i.ice,i.config||null]);
const optionName=(list,id)=>list.find(o=>o.id===id)?.label||'';
/* pricing.js */
function readyPrice(c,size){return round10(c.price*(SIZE_MULTIPLIERS[size]??1))}
function customPrice(b){
 const base=BASE_OPTIONS.find(o=>o.id===b.base)?.price??390;
 const flavor=FLAVOR_OPTIONS.find(o=>o.id===b.flavor)?.price??80;
 const garnish=GARNISH_OPTIONS.find(o=>o.id===b.garnish)?.price??0;
 return round10((base+flavor+garnish)*(SIZE_MULTIPLIERS[b.size]??1));
}
function cartSum(cart){return cart.reduce((a,i)=>a+i.unitPrice*i.quantity,0)}
const cartCount=cart=>cart.reduce((a,i)=>a+i.quantity,0);
function getProduct(id){return COCKTAILS.find(c=>c.id===id)}
/* storage.js */
const STORAGE_KEY='moodbar_state_v1';
function loadState(){
 try{
  const raw=localStorage.getItem(STORAGE_KEY);
  if(!raw)return null;
  const data=JSON.parse(raw);
  if(!data||typeof data!=='object'||!Array.isArray(data.cart)||!Array.isArray(data.orders)||!data.stocks||typeof data.stocks!=='object')throw new Error('Некорректный формат данных');
  return data;
 }catch(err){console.warn('MOOD BAR: восстановление состояния не удалось',err);return {corrupted:true};}
}
function saveState(state){
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify({cart:state.cart,orders:state.orders,stocks:state.stocks,builder:state.builder,table:state.table}));return true;}
 catch(err){console.warn('MOOD BAR: сохранение недоступно',err);return false;}
}
function resetState(){try{localStorage.removeItem(STORAGE_KEY);return true}catch{return false}}
/* drink-art.js */
/* MOOD BAR / Soft-focus editorial illustration.
   The entire builder illustration is drawn with SVG, so it works offline, without WebGL. */
function drawDrinkArt(config) {
  const b={size:'M',ice:'normal',garnish:'none',flavor:'fruity',sweetness:'balanced',base:'gin',...config};
  const palettes={
    fruity:{top:'#ff90ba',mid:'#f7478b',bottom:'#bf145e',edge:'#bf2a6b',ambient:'#ffd4dd',bubble:'#ffb9d0',label:'#922d56'},
    spicy:{top:'#ffe08a',mid:'#ff9a36',bottom:'#ee572f',edge:'#ff8637',ambient:'#fff0c7',bubble:'#ffd48c',label:'#9b4d23'},
    smoky:{top:'#d987ae',mid:'#a73a73',bottom:'#632753',edge:'#9d3b6b',ambient:'#f6d6e4',bubble:'#eb9ebb',label:'#622b4d'},
    velvety:{top:'#ffedba',mid:'#ffd386',bottom:'#d79648',edge:'#f3c477',ambient:'#fff1d2',bubble:'#ffeccc',label:'#8b5a31'},
    fresh:{top:'#e8f9ab',mid:'#b5d84e',bottom:'#70a43e',edge:'#a7d55a',ambient:'#eff9d2',bubble:'#e2f6b8',label:'#4f713b'}
  };
  const p=palettes[b.flavor]||palettes.fruity;
  const glassPaths={
    S:{clip:'M105 195 Q120 297 278 338 Q436 297 451 195 Z',outline:'M105 195 Q120 297 278 338 Q436 297 451 195',liquid:'M110 222 Q278 250 446 222 Q424 299 278 334 Q132 299 110 222Z',rim:195,rimX:278,rimRX:173, bottom:338, shape:'coupe'},
    M:{clip:'M153 162 L180 507 Q278 530 376 507 L403 162Z',outline:'M153 162 L180 507 Q278 530 376 507 L403 162',liquid:'M157 215 Q278 237 399 215 L376 507 Q278 529 180 507Z',rim:162,rimX:278,rimRX:125,bottom:507,shape:'rocks'},
    L:{clip:'M178 104 L201 520 Q278 543 355 520 L378 104Z',outline:'M178 104 L201 520 Q278 543 355 520 L378 104',liquid:'M182 185 Q278 206 374 185 L355 520 Q278 542 201 520Z',rim:104,rimX:278,rimRX:100,bottom:520,shape:'collins'}
  };
  const g=glassPaths[b.size]||glassPaths.M;
  const sweetColor = b.sweetness==='sweet'?'#fff4d8':b.sweetness==='dry'?'#ecfbff':'#fff9f1';
  const iceCount=b.ice==='extra'?8:b.ice==='normal'?5:0;
  const positions=b.size==='S'
   ? [[209,239,34,-17],[306,244,31,19],[270,287,28,36],[360,223,30,-8],[160,223,28,24],[237,309,25,9],[331,284,27,-22],[278,224,32,13]]
   : b.size==='M'
   ? [[211,237,43,-15],[310,252,46,17],[272,318,45,-22],[222,395,44,30],[330,438,40,-10],[243,468,37,25],[310,360,38,33],[257,267,38,-17]]
   : [[240,225,34,-18],[314,252,35,15],[280,326,35,-11],[244,390,32,21],[307,441,35,-18],[261,493,30,16],[314,350,34,22],[231,292,32,-13]];
  function cube(x,y,s,ang,i){
    const rr=s*.13;
    return `<g transform="translate(${x} ${y}) rotate(${ang})" class="art-ice art-reveal" style="animation-delay:${i*32}ms">
      <rect x="${-s/2}" y="${-s/2}" width="${s}" height="${s}" rx="${rr}" fill="url(#art-ice-fill)" stroke="#fff" stroke-opacity=".73" stroke-width="2.2"/>
      <path d="M${-s/2+4} ${-s/2+5} L${s/2-5} ${-s/2+6} L${s/2-9} ${s/2-7} L${-s/2+5} ${s/2-4}Z" fill="#fff" opacity=".20" />
      <path d="M${-s/2+2} ${-s/2+9} L${-s/2+8} ${s/2-7} M${-s/2+6} ${-s/2+4} L${s/2-7} ${-s/2+4}" stroke="#fff" stroke-opacity=".82" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="${s/4}" cy="${-s/4}" r="${Math.max(2,s*.075)}" fill="#fff" opacity=".75" />
    </g>`;
  }
  const ice=positions.slice(0,iceCount).map((pos,i)=>cube(...pos,i)).join('');
  function citrus(cx,cy,r,angle=0,green=false){
    const peel=green?'#5a9b38':'#f4a138',inside=green?'#d3f88a':'#ffd074',div=green?'#f8ffd8':'#fff1c9';
    return `<g transform="translate(${cx} ${cy}) rotate(${angle})" class="art-fruit"><circle r="${r}" fill="${peel}"/><circle r="${r*.88}" fill="#fff6d8"/><circle r="${r*.79}" fill="${inside}"/>${Array.from({length:9},(_,i)=>{const a=(i/9)*2*Math.PI;return `<path d="M0 0 L${(r*.74*Math.cos(a)).toFixed(1)} ${(r*.74*Math.sin(a)).toFixed(1)}" stroke="${div}" stroke-width="${Math.max(2,r*.055)}" />`}).join('')}<circle r="${r*.11}" fill="#fff8dc"/><ellipse cx="${-r*.25}" cy="${-r*.38}" rx="${r*.34}" ry="${r*.13}" transform="rotate(-24)" fill="#fff" opacity=".32"/></g>`;
  }
  function berry(cx,cy,s,angle=0){
    return `<g transform="translate(${cx} ${cy}) rotate(${angle}) scale(${s})" class="art-fruit">
       <g fill="url(#art-berry)" stroke="#742447" stroke-width=".65">${[[0,0],[8,-8],[-8,-8],[-12,2],[12,2],[0,-16],[0,12],[9,10],[-9,10],[-16,-7],[16,-7]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7.5"/>`).join('')}</g>
       <path d="M-12 -21 Q-3 -32 0 -20 Q10 -33 14 -20 Q3 -23 0 -22 Q-5 -23 -12 -21" fill="#448a45"/>
       <path d="M0 -19 L2 -30" stroke="#47804a" stroke-width="2.2" stroke-linecap="round"/>
    </g>`;
  }
  function mint(cx,cy,scale=1,angle=0){
    return `<g transform="translate(${cx} ${cy}) rotate(${angle}) scale(${scale})" class="art-fruit"><path d="M0 25 Q0 -17 0 -58" stroke="#387a42" stroke-width="3" fill="none"/>
     ${[-28,-8,14].map((y,i)=>`<path d="M0 ${y+8} C${i%2?-39:-32} ${y-24} ${i%2?-46:-39} ${y-45} 0 ${y-34} Q15 ${y-11} 0 ${y+8}" fill="${i%2?'#58a845':'#70bc56'}" stroke="#438a43" stroke-width=".8" opacity=".96"/><path d="M0 ${y+8} Q-18 ${y-19} -28 ${y-29}" stroke="#b7e2a0" stroke-width="1" opacity=".65"/>`).join('')}
    </g>`;
  }
  function chili(cx,cy,scale=1,ang=0){return `<g transform="translate(${cx} ${cy}) rotate(${ang}) scale(${scale})" class="art-fruit"><path d="M-55 -1 Q-10 -28 34 -10 Q60 -4 76 -25 Q77 18 44 16 Q-7 18 -55 7Z" fill="url(#art-chili)" stroke="#a93a3a" stroke-width="2"/><path d="M-54 0 Q-70 -19 -71 -33" fill="none" stroke="#468345" stroke-width="7" stroke-linecap="round"/><path d="M-34 -7 Q4 -21 29 -8" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="4" stroke-linecap="round"/></g>`;}
  const decorations={
    fruity: `${berry(96,227,1.08,-12)}${berry(457,332,1.28,16)}${berry(421,101,.65,-20)}`,
    spicy: `${citrus(93,330,66,-24)}${chili(456,171,.78,-18)}${citrus(450,439,33,23)}`,
    smoky: `${citrus(91,381,59,-21)}${berry(458,165,.98,12)}${berry(466,416,.7,-10)}`,
    velvety: `${citrus(101,287,57,-20)}${citrus(465,424,38,12)}${berry(465,175,.72,22)}`,
    fresh: `${citrus(94,296,65,-15,true)}${mint(457,240,1.1,22)}${citrus(432,440,35,10,true)}`
  };
  const floatingGarnish={
    none:'',
    citrus:citrus(372,b.size==='L'?122:b.size==='S'?192:155,45,17,b.flavor==='fresh'),
    berries:berry(330,b.size==='L'?155:b.size==='S'?207:175,.93,-9),
    mint:mint(351,b.size==='L'?131:b.size==='S'?213:163,.86,16),
    rosemary:mint(349,b.size==='L'?137:b.size==='S'?206:159,.91,11),
    chili:chili(355,b.size==='L'?157:b.size==='S'?202:157,.52,-19)
  };
  let garnish=floatingGarnish[b.garnish]||'';
  // Matching the moodboard: soft-focus beverage artwork, luminous transparent layers,
  // close-up glass, blurred fruits and a typographic print finish, not photorealistic 3D.
  return `<svg class="mood-art-svg mood-art--${b.flavor}" viewBox="0 0 560 610" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Иллюстрация твоего коктейля: ${b.flavor}, размер ${b.size}, лёд ${b.ice}">
    <defs>
      <linearGradient id="art-drink" x1="0" y1="0" x2=".16" y2="1"><stop offset="0" stop-color="${p.top}"/><stop offset=".45" stop-color="${p.mid}"/><stop offset="1" stop-color="${p.bottom}"/></linearGradient>
      <radialGradient id="art-sideglow"><stop offset="0" stop-color="${p.bubble}" stop-opacity=".72"/><stop offset="1" stop-color="${p.bubble}" stop-opacity="0"/></radialGradient>
      <linearGradient id="art-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".11" stop-color="#fff" stop-opacity=".12"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".76" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient>
      <linearGradient id="art-ice-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".66"/><stop offset=".5" stop-color="#dbf6ff" stop-opacity=".19"/><stop offset="1" stop-color="#fff" stop-opacity=".38"/></linearGradient>
      <linearGradient id="art-stem" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#fff" stop-opacity=".14"/><stop offset=".32" stop-color="#fff" stop-opacity=".82"/><stop offset=".72" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".68"/></linearGradient>
      <radialGradient id="art-berry"><stop offset="0" stop-color="#e7679d"/><stop offset=".48" stop-color="#af366c"/><stop offset="1" stop-color="#5b1c47"/></radialGradient>
      <linearGradient id="art-chili" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff6e5e"/><stop offset=".55" stop-color="#d83441"/><stop offset="1" stop-color="#a62235"/></linearGradient>
      <radialGradient id="art-shine"><stop stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <filter id="art-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="13"/></filter>
      <filter id="art-soft-small" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="art-frost"><feGaussianBlur stdDeviation="1.7"/></filter>
      <filter id="art-shadow" x="-40%" y="-50%" width="180%" height="200%"><feGaussianBlur stdDeviation="13"/></filter>
      <clipPath id="art-clip"><path d="${g.clip}"/></clipPath>
    </defs>
    <!-- soft-focus editorial product-studio elements -->
    <ellipse cx="283" cy="551" rx="184" ry="26" fill="#75374e" opacity=".15" filter="url(#art-shadow)"/>
    <g class="art-floating art-floating-bg" filter="url(#art-soft)" opacity=".37" transform="translate(-17 -8)">${decorations[b.flavor]||decorations.fruity}</g>
    <ellipse cx="275" cy="294" rx="169" ry="194" fill="url(#art-sideglow)" opacity=".67" filter="url(#art-soft)"/>
    ${b.size==='S'?`<ellipse cx="278" cy="549" rx="90" ry="12" fill="url(#art-stem)" opacity=".5"/><path d="M274 339 L274 535" stroke="url(#art-stem)" stroke-width="22" stroke-linecap="round"/><path d="M279 345 L279 534" stroke="#fff" stroke-width="5" opacity=".47"/><ellipse cx="278" cy="546" rx="91" ry="11" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4"/>`:''}
    <!-- colorful blurred swirls inside the drink -->
    <g clip-path="url(#art-clip)">
      <path d="${g.liquid}" fill="url(#art-drink)" opacity=".90"/>
      <g filter="url(#art-soft)" opacity=".6">
        <ellipse cx="214" cy="270" rx="88" ry="145" fill="${p.top}"/>
        <ellipse cx="363" cy="401" rx="98" ry="128" fill="${p.bottom}"/>
        <ellipse cx="284" cy="385" rx="104" ry="75" fill="${p.mid}" opacity=".67"/>
      </g>
      <g filter="url(#art-soft-small)" opacity=".62">
       ${b.size==='S'?'':`<ellipse cx="244" cy="244" rx="56" ry="69" fill="#fff" opacity=".2"/>`}
       <path d="M207 274 Q266 200 337 272 T374 384" fill="none" stroke="${sweetColor}" stroke-width="48" opacity=".25"/>
       <path d="M162 370 Q224 415 298 352" fill="none" stroke="${p.top}" stroke-width="33" opacity=".44"/>
      </g>
      <!-- diffuse citrus and berries visible through translucent drink -->
      ${b.flavor==='fresh'?`<g opacity=".52" filter="url(#art-soft-small)">${citrus(280,374,88,-16,true)}${citrus(244,262,54,-12,true)}</g>`:''}
      ${b.flavor==='fruity'?`<g opacity=".39" filter="url(#art-soft-small)">${berry(233,343,2.5)}${berry(340,407,2)}</g>`:''}
      ${b.flavor==='spicy'?`<g opacity=".3" filter="url(#art-soft-small)">${citrus(277,385,87,-12)}${citrus(340,278,52,10)}</g>`:''}
      ${b.flavor==='velvety'?`<g opacity=".37" filter="url(#art-soft-small)"><path d="M130 315 C195 215 345 470 420 250" fill="none" stroke="#fff5d3" stroke-width="44"/></g>`:''}
      ${ice}
      ${['velvety','smoky'].includes(b.flavor)?`<ellipse cx="278" cy="${g.rim+48}" rx="${g.rimRX-24}" ry="20" fill="#fff1db" opacity=".64" filter="url(#art-soft-small)"/>`:''}
      ${Array.from({length:b.flavor==='fresh'?14:8},(_,i)=>{const x=187+((i*41)%175), y=(g.rim+84)+((i*71)%(g.bottom-g.rim-94));return `<circle cx="${x}" cy="${y}" r="${i%3===0?4:2}" fill="#fff" opacity="${i%3===0?.31:.45}"/>`}).join('')}
    </g>
    <!-- the glass: airy contour, refracted edges and translucent highlights -->
    <path d="${g.clip}" fill="url(#art-glass)" opacity=".68"/>
    <path d="${g.outline}" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="${b.size==='S'?7:7}"/>
    <path d="${g.outline}" fill="none" stroke="${p.edge}" stroke-opacity=".19" stroke-width="11" filter="url(#art-soft-small)"/>
    <ellipse cx="${g.rimX}" cy="${g.rim}" rx="${g.rimRX}" ry="${b.size==='S'?16:12}" fill="none" stroke="#fff" stroke-opacity=".70" stroke-width="4"/>
    <ellipse cx="${g.rimX}" cy="${g.rim-3}" rx="${g.rimRX-7}" ry="${b.size==='S'?10:7}" fill="#fff" opacity=".12"/>
    ${b.size==='S'?'':`<path d="M${b.size==='M'?171:190} ${g.rim+16} L${b.size==='M'?192:212} ${g.bottom-30}" stroke="#fff" stroke-width="12" opacity=".21" stroke-linecap="round"/><path d="M${b.size==='M'?389:364} ${g.rim+16} L${b.size==='M'?366:344} ${g.bottom-30}" stroke="#fff" stroke-width="9" opacity=".21" stroke-linecap="round"/>`}
    ${b.size==='S'?'<circle cx="278" cy="341" r="16" fill="url(#art-stem)" opacity=".52"/>':''}
    <!-- Soft editorial wordmark across the drink, inspired by the typography-led references -->
    <g class="art-cup-type" text-anchor="middle" fill="#fff">
      <text x="278" y="${b.size==='S'?270:b.size==='L'?420:458}" font-family="Montserrat,Manrope,Arial,sans-serif" font-weight="800" font-size="49" letter-spacing="-3" opacity=".85">MOOD.</text>
      <text x="278" y="${b.size==='S'?289:b.size==='L'?440:477}" font-family="Manrope,Arial,sans-serif" font-weight="700" font-size="9.5" letter-spacing="3.1" opacity=".67">СОЗДАН ДЛЯ ТЕБЯ</text>
    </g>
    <!-- floating fruit should look like a poster composition, not a physics simulation -->
    <g class="art-floating art-floating-front">${decorations[b.flavor]||decorations.fruity}</g>
    <g class="art-garnish art-reveal">${garnish}</g>
    <g class="art-sparkles" fill="url(#art-shine)" opacity=".87">
      <path d="M107 147 L112 163 L128 168 L112 173 L107 189 L102 173 L86 168 L102 163Z"/>
      <path d="M457 254 L461 265 L473 269 L461 273 L457 284 L453 273 L441 269 L453 265Z"/>
      <circle cx="${b.size==='L'?154:129}" cy="476" r="5" opacity=".7"/>
      <circle cx="404" cy="88" r="3"/>
    </g>
  </svg>`;
}
/* main.js */

const builderDefaults={base:'gin',flavor:'fruity',sweetness:'balanced',ice:'normal',garnish:'none',size:'M',quantity:1,name:'Мой коктейль'};
const recovered=loadState();
const state={
  cart:Array.isArray(recovered?.cart)?recovered.cart.filter(i=>i&&['ready','custom'].includes(i.kind)&&Number.isInteger(i.quantity)&&i.quantity>0&&i.quantity<=50&&Number.isFinite(i.unitPrice)&&i.unitPrice>=0):[],
  orders:Array.isArray(recovered?.orders)?recovered.orders.filter(o=>o&&typeof o.id==='string'&&Array.isArray(o.items)):[],
  stocks:{...INITIAL_STOCK},
  builder:{...builderDefaults},
  table:Number.isInteger(+recovered?.table)&& +recovered.table>=1&&+recovered.table<=40?String(recovered.table):''
};
for(const c of COCKTAILS){const val=recovered?.stocks?.[c.id];if(Number.isInteger(val)&&val>=0&&val<=100)state.stocks[c.id]=val}
if(recovered?.builder&&typeof recovered.builder==='object'){
 for(const field of ['base','flavor','sweetness','ice','garnish','size']){const v=recovered.builder[field];const allowed={base:BASE_OPTIONS.map(o=>o.id),flavor:FLAVOR_OPTIONS.map(o=>o.id),sweetness:['dry','balanced','sweet'],ice:['none','normal','extra'],garnish:GARNISH_OPTIONS.map(o=>o.id),size:['S','M','L']}[field];if(allowed.includes(v))state.builder[field]=v}
 if(typeof recovered.builder.name==='string')state.builder.name=recovered.builder.name.slice(0,40);
}
const filters={category:'all',base:'all',maxPrice:790};
let view='mosaic';let selected=null;let details={id:null,size:'M',ice:'normal',quantity:1};let activeDrawer=null;let lastFocus=null;let confirmVisible=false;let toastTimer=null;
const safeClone=value=>globalThis.structuredClone?globalThis.structuredClone(value):JSON.parse(JSON.stringify(value));

function persist(){if(!saveState(state))notify('Не удалось сохранить изменения в браузере. Проверь настройки хранилища.');}
function notify(message){const region=$('#toast-region');region.innerHTML=`<div class="toast">${escapeHtml(message)}</div>`;clearTimeout(toastTimer);toastTimer=setTimeout(()=>region.replaceChildren(),3600)}
function stock(id){return Math.max(0,state.stocks[id]||0)}
function photoMarkup(c,loading='lazy'){return `<img src="${c.photo}" alt="Коктейль ${escapeHtml(c.name)}" loading="${loading}" decoding="async" onerror="this.style.display='none'">`}
function initFilters(){
 $('#flavor-filters').innerHTML=`<button type="button" class="chip active" data-category="all" aria-pressed="true">Все</button>${CATEGORIES.map(c=>`<button type="button" class="chip" data-category="${c.id}" aria-pressed="false">${c.short}</button>`).join('')}`;
 $('#flavor-filters').addEventListener('click',ev=>{const btn=ev.target.closest('[data-category]');if(!btn)return;filters.category=btn.dataset.category;syncFilters();renderCatalog()});
 $('#base-filter').addEventListener('change',ev=>{filters.base=ev.target.value;renderCatalog()});
 $('#price-filter').addEventListener('input',ev=>{filters.maxPrice=Number(ev.target.value);$('#price-value').textContent=money(filters.maxPrice);renderCatalog()});
 $('#reset-filters').addEventListener('click',resetFilters);$('#empty-reset').addEventListener('click',resetFilters);
 $('#view-mosaic').addEventListener('click',()=>setView('mosaic'));$('#view-list').addEventListener('click',()=>setView('list'));
}
function syncFilters(){ $$('#flavor-filters button').forEach(b=>{const yes=b.dataset.category===filters.category;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))}) }
function resetFilters(){filters.category='all';filters.base='all';filters.maxPrice=790;$('#base-filter').value='all';$('#price-filter').value='790';$('#price-value').textContent='790 ₽';syncFilters();renderCatalog()}
function setView(next){view=next;['mosaic','list'].forEach(v=>{const btn=$(`#view-${v}`);btn.classList.toggle('active',v===view);btn.setAttribute('aria-pressed',String(v===view))});renderCatalog()}
function cardHtml(c,i=0){const qty=stock(c.id),notAvailable=!qty;const active=selected===c.id;const cat=CATEGORIES.find(x=>x.id===c.category);return `<article class="drink-card ${notAvailable?'sold-out':''} ${active?'selected':''}" style="--card-bg:${c.palette};--image-bg:${c.palette};--photo-ratio:${[.92,.94,.9,.96,.91][i%5]}"><button type="button" class="drink-card-button" data-drink-id="${c.id}" ${notAvailable?'disabled aria-disabled="true"':''} aria-label="${escapeHtml(c.name)}, ${money(c.price)}${notAvailable?', нет в наличии':''}"><div class="drink-image">${photoMarkup(c)}${notAvailable?'<span class="sold-out-label">НЕТ В НАЛИЧИИ</span>':''}</div><div class="drink-info"><div class="drink-kicker">${escapeHtml(cat?.short||'')} · ${escapeHtml(c.base)}</div><h3 class="drink-title">${escapeHtml(c.name)}</h3><p class="drink-description">${escapeHtml(c.description)}</p><div class="drink-meta"><div><strong>${money(c.price)}</strong><small>${notAvailable?'Нет в наличии':'Выбрать ↗'}</small></div><span class="tiny-diamond" aria-hidden="true">◆</span></div></div></button></article>`}
function customCard(){return `<button type="button" class="custom-tile" id="custom-tile"><span class="overline">ТВОЯ СОБСТВЕННАЯ ИСТОРИЯ</span><span class="custom-star" aria-hidden="true">✳</span><div><h3>СОЗДАЙ<br>СВОЙ ВКУС.</h3><p>Никаких правил. Только ты, вкус и настроение.</p></div><span class="custom-bottom">СОБРАТЬ СВОЙ КОКТЕЙЛЬ <b>↗</b></span></button>`}
function renderCatalog(){
 const shown=COCKTAILS.filter(c=>(filters.category==='all'||c.category===filters.category)&&(filters.base==='all'||c.base===filters.base)&&c.price<=filters.maxPrice);
 $('#results-count').textContent=`${shown.length} ${plural(shown.length,['напиток','напитка','напитков'])}`;
 const root=$('#cocktail-grid');
 root.classList.toggle('list-mode',view==='list');
 $('#empty-filter').classList.toggle('hidden',shown.length>0);
 if(!shown.length){root.innerHTML='';return}
 root.innerHTML=customCard()+shown.map((c,i)=>cardHtml(c,i)).join('');
 if(selected&&!shown.some(c=>c.id===selected))selected=null;
}
function plural(n,forms){let v=Math.abs(n)%100;if(v>=11&&v<=14)return forms[2];v%=10;return v===1?forms[0]:(v>=2&&v<=4)?forms[1]:forms[2]}
function initCatalog(){
 $('#cocktail-grid').addEventListener('click',e=>{if(e.target.closest('#custom-tile')){document.querySelector('#create').scrollIntoView({behavior:'smooth'});return}const btn=e.target.closest('[data-drink-id]');if(btn&&!btn.disabled)openDetails(btn.dataset.drinkId)});
}
function openDetails(id){const c=getProduct(id);if(!c||stock(id)<1)return;selected=id;details={id,size:'M',ice:'normal',quantity:1};renderCatalog();renderDetails();openDrawer('detail-drawer')}
function renderDetails(){const c=getProduct(details.id);if(!c)return;const price=readyPrice(c,details.size)*details.quantity;const cat=CATEGORIES.find(v=>v.id===c.category);$('#detail-body').innerHTML=`<div class="detail-photo" style="background:${c.palette}">${photoMarkup(c,'eager')}<span class="detail-hero-label">${escapeHtml(cat.short)} / ${escapeHtml(c.base)}</span></div><div class="detail-content"><h2 id="detail-title">${escapeHtml(c.name)}</h2><p>${escapeHtml(c.description)}</p><div class="detail-info-row"><span>КРЕПОСТЬ<br><strong>${'●'.repeat(c.strength)}${'○'.repeat(5-c.strength)}</strong></span><span>ПОРЦИЯ<br><strong>от ${money(readyPrice(c,'S'))}</strong></span><span>ОСНОВА<br><strong>${escapeHtml(c.base)}</strong></span></div><div class="control-subtitle">ЧТО ВНУТРИ</div><div class="ingredient-row">${c.ingredients.map(v=>`<span>${escapeHtml(v)}</span>`).join('')}</div><h3 class="detail-section-title">Настрой под себя</h3><div class="control-subtitle">РАЗМЕР</div><div class="detail-size">${['S','M','L'].map(s=>`<button data-detail-size="${s}" type="button" class="${details.size===s?'active':''}" aria-pressed="${details.size===s}">${s}</button>`).join('')}</div><div class="control-subtitle">ЛЁД</div><div class="detail-ice">${[['none','Без льда'],['normal','Стандартно'],['extra','Больше льда']].map(([id,label])=>`<button data-detail-ice="${id}" type="button" class="${details.ice===id?'active':''}" aria-pressed="${details.ice===id}">${label}</button>`).join('')}</div><div class="detail-qty"><span>КОЛИЧЕСТВО</span><div class="qty-control"><button data-detail-qty="-1" aria-label="Уменьшить количество">−</button><output>${details.quantity}</output><button data-detail-qty="1" aria-label="Увеличить количество">+</button></div></div><div class="detail-buy"><div class="detail-error" id="detail-error" role="status"></div><button type="button" class="button-main" id="detail-add">Добавить в заказ — ${money(price)} <span>↗</span></button></div></div>`}
function initDetails(){
 $('#detail-body').addEventListener('click',e=>{
  const size=e.target.closest('[data-detail-size]');const ice=e.target.closest('[data-detail-ice]');const qty=e.target.closest('[data-detail-qty]');
  if(size){details.size=size.dataset.detailSize;renderDetails();return}
  if(ice){details.ice=ice.dataset.detailIce;renderDetails();return}
  if(qty){details.quantity=Math.min(Math.min(stock(details.id),10),Math.max(1,details.quantity+Number(qty.dataset.detailQty)));renderDetails();return}
  if(e.target.closest('#detail-add')){
   const c=getProduct(details.id);const reserved=state.cart.filter(i=>i.kind==='ready'&&i.id===c.id).reduce((s,i)=>s+i.quantity,0);
   if(reserved+details.quantity>stock(c.id)){$('#detail-error').textContent=`Доступно ещё ${Math.max(0,stock(c.id)-reserved)} порц.`;return}
   addToCart({kind:'ready',id:c.id,name:c.name,size:details.size,ice:details.ice,quantity:details.quantity,unitPrice:readyPrice(c,details.size)});closeDrawer();notify('Коктейль добавлен в заказ');
  }
 });
}
function defaultBuilder(){return {...state.builder}}
function buildButton(opt,field){const active=state.builder[field]===opt.id;return `<button type="button" data-build-field="${field}" data-build-value="${opt.id}" aria-pressed="${active}" class="option-button ${active?'active':''}" style="--dot-color:${opt.color||'#dd8067'}"><span>${escapeHtml(opt.label)}</span><span class="option-price">${field==='base'?money(opt.price):(opt.price?`+ ${money(opt.price)}`:'БЕСПЛАТНО')}</span>${field==='flavor'?'<span class="option-dot" aria-hidden="true"></span>':''}</button>`}
function segmentedButtons(values,field){return values.map(([id,label])=>`<button type="button" data-build-field="${field}" data-build-value="${id}" class="${state.builder[field]===id?'active':''}" aria-pressed="${state.builder[field]===id}">${label}</button>`).join('')}
function renderBuilderControls(){
 $('#builder-base').innerHTML=BASE_OPTIONS.map(o=>buildButton(o,'base')).join('');
 $('#builder-flavor').innerHTML=FLAVOR_OPTIONS.map(o=>buildButton(o,'flavor')).join('');
 $('#builder-garnish').innerHTML=GARNISH_OPTIONS.map(o=>buildButton(o,'garnish')).join('');
 $('#builder-sweetness').innerHTML=segmentedButtons([['dry','Не сладкий'],['balanced','В меру'],['sweet','Сладкий']],'sweetness');
 $('#builder-ice').innerHTML=segmentedButtons([['none','Без льда'],['normal','Стандартно'],['extra','Много льда']],'ice');
 $('#builder-size').innerHTML=segmentedButtons([['S','S · 180 мл'],['M','M · 240 мл'],['L','L · 320 мл']],'size');
 $('#builder-name').value=state.builder.name;
 updateBuilderVisual();
}
function updateBuilderVisual(){
 const b=state.builder;const unit=customPrice(b);$('#builder-total').textContent=money(unit*b.quantity);$('#builder-unit').textContent=`${money(unit)} / порция`;
 $('#builder-quantity').textContent=b.quantity;
 $('#preview-name').textContent=`${optionName(FLAVOR_OPTIONS,b.flavor)} / ${optionName(BASE_OPTIONS,b.base)}`;
 const glassName={S:'Купе / 180 мл',M:'Рокс / 240 мл',L:'Хайбол / 320 мл'}[b.size];
 $('#preview-glass-label').textContent=glassName.toUpperCase();
 $('#size-description').textContent=glassName.replace(' / ',' · ');
 const previewThemes={
  fruity:['#fce8ed','#f0afc4','#ffdbb5'],
  spicy:['#fff2d9','#f5c99d','#fff0b2'],
  smoky:['#f6e9f0','#d1abc1','#efbfc5'],
  velvety:['#fff7e6','#f0d5b1','#ffe1a9'],
  fresh:['#f3fae9','#d6e9b7','#e8f7bf']
 };
 const theme=previewThemes[b.flavor]||previewThemes.fruity;
 const panel=$('#preview-panel');
 panel.style.setProperty('--preview-bg1',theme[0]);
 panel.style.setProperty('--preview-bg2',theme[1]);
 panel.style.setProperty('--preview-accent',theme[2]);
 panel.dataset.flavor=b.flavor;
 const stage=$('#art-stage');
 if(stage)stage.innerHTML=drawDrinkArt(b);
 $('#preview-rotate-hint').textContent='ТВОЯ КОМПОЗИЦИЯ';
}
function initBuilder(){
 const container=$('.builder-controls');container.addEventListener('click',ev=>{
  const option=ev.target.closest('[data-build-field]');if(option){state.builder[option.dataset.buildField]=option.dataset.buildValue;renderBuilderControls();persist();return}
  const qty=ev.target.closest('[data-builder-qty]');if(qty){state.builder.quantity=Math.max(1,Math.min(5,state.builder.quantity+Number(qty.dataset.builderQty)));updateBuilderVisual();persist()}
 });
 $('#builder-name').addEventListener('input',ev=>{state.builder.name=ev.target.value;$('#builder-name-error').textContent='';persist()});
 $('#builder-add').addEventListener('click',()=>{
  const b=state.builder;const name=b.name.trim();if(!name){$('#builder-name-error').textContent='Дай напитку название';$('#builder-name').focus();return}
  if(name.length>40){$('#builder-name-error').textContent='Не больше 40 символов';return}
  const config={base:b.base,flavor:b.flavor,sweetness:b.sweetness,ice:b.ice,garnish:b.garnish};
  addToCart({kind:'custom',id:null,name,size:b.size,ice:b.ice,config,quantity:b.quantity,unitPrice:customPrice(b)});
  notify('Твой авторский коктейль добавлен в заказ');
 });
 renderBuilderControls();

}
function addToCart(item){const sig=itemSignature(item);const found=state.cart.find(i=>itemSignature(i)===sig);if(found)found.quantity+=item.quantity;else state.cart.push({...item,cartId:uid()});persist();renderCart();renderHeader();}
function renderHeader(){const count=cartCount(state.cart);$('#cart-count').textContent=count;$('#mobile-cart-count').textContent=count;$('#mobile-cart-sum').textContent=money(cartSum(state.cart));$('#mobile-cart').classList.toggle('hidden',count===0||!!activeDrawer||confirmVisible)}
function renderCart(){const lines=$('#cart-lines');const checkout=$('#cart-checkout');
 if(!state.cart.length){lines.innerHTML='<div class="cart-empty"><div class="empty-glyph">◇</div><h3>ПОКА ПУСТО</h3><p>Самое время найти коктейль под настроение.</p><button class="button-main" type="button" data-go-menu>Выбрать коктейль ↗</button></div>';checkout.innerHTML='';return}
 lines.innerHTML=state.cart.map(item=>{const product=getProduct(item.id);const meta=item.kind==='ready'?`${item.size} · ${iceLabel(item.ice)}`:`${item.size} · ${optionName(BASE_OPTIONS,item.config?.base)} · ${optionName(FLAVOR_OPTIONS,item.config?.flavor)}`;return `<div class="cart-item"><div>${product?`<img class="cart-thumb" src="${product.photo}" alt="">`:'<div class="cart-custom-thumb">✳</div>'}</div><div><div class="cart-item-title">${escapeHtml(item.name)}</div><div class="cart-item-meta">${escapeHtml(meta)}</div><div class="cart-item-actions"><div class="cart-small-qty"><button data-cart-qty="-1" data-cart-id="${item.cartId}" aria-label="Уменьшить количество">−</button><b>${item.quantity}</b><button data-cart-qty="1" data-cart-id="${item.cartId}" aria-label="Увеличить количество">+</button></div><button class="cart-remove" data-cart-remove="${item.cartId}">Удалить</button></div></div><div class="cart-item-price">${money(item.unitPrice*item.quantity)}</div></div>`}).join('');
 checkout.innerHTML=`<div class="cart-checkout-wrap"><div class="cart-summary"><span>ИТОГО / ${cartCount(state.cart)} ПОРЦ.</span><strong>${money(cartSum(state.cart))}</strong></div><label class="checkout-label" for="table-number">НОМЕР СТОЛИКА (1–40)</label><input id="table-number" class="checkout-input" type="number" inputmode="numeric" min="1" max="40" step="1" placeholder="Например, 12" value="${escapeHtml(state.table)}"><div id="checkout-error" class="checkout-error" role="alert"></div><button type="button" id="submit-order" class="button-main cart-submit">Подтвердить заказ <span>↗</span></button><button type="button" id="clear-cart" class="cart-clear">Очистить корзину</button></div>`;
}
function iceLabel(value){return {'none':'без льда','normal':'обычный лёд','extra':'много льда'}[value]||'лёд'}
function initCart(){
 $('#header-cart').addEventListener('click',()=>{renderCart();openDrawer('cart-drawer')});$('#mobile-cart').addEventListener('click',()=>{renderCart();openDrawer('cart-drawer')});
 $('#cart-drawer').addEventListener('click',e=>{
  if(e.target.closest('[data-go-menu]')){closeDrawer();$('#menu').scrollIntoView({behavior:'smooth'});return}
  const remove=e.target.closest('[data-cart-remove]');if(remove){state.cart=state.cart.filter(i=>i.cartId!==remove.dataset.cartRemove);persist();renderCart();renderHeader();return}
  const change=e.target.closest('[data-cart-qty]');if(change){const item=state.cart.find(i=>i.cartId===change.dataset.cartId);if(!item)return;const next=item.quantity+Number(change.dataset.cartQty);
   if(next<=0){state.cart=state.cart.filter(i=>i.cartId!==item.cartId)}else if(next<=50){const other=state.cart.filter(i=>i!==item&&i.kind==='ready'&&i.id===item.id).reduce((s,i)=>s+i.quantity,0);if(item.kind==='ready'&&next+other>stock(item.id)){notify('Недостаточно порций в наличии');return}item.quantity=next}persist();renderCart();renderHeader();return}
  if(e.target.closest('#clear-cart')){if(confirm('Очистить всю корзину?')){state.cart=[];persist();renderCart();renderHeader()}return}
  if(e.target.closest('#submit-order'))submitOrder();
 });
 $('#cart-drawer').addEventListener('input',e=>{if(e.target.id==='table-number'){state.table=e.target.value;const err=$('#checkout-error');if(err)err.textContent=''}});
}
function submitOrder(){const err=$('#checkout-error');const num=Number(state.table);
 if(!Number.isInteger(num)||num<1||num>40){err.textContent='Укажи номер столика от 1 до 40';$('#table-number').focus();return}
 if(!state.cart.length){err.textContent='Сначала выбери хотя бы один напиток';return}
 const requested=new Map();for(const item of state.cart){if(!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>50){err.textContent='Некорректное количество порций';return}if(item.kind==='ready'){if(!getProduct(item.id)){err.textContent='Один из напитков недоступен';return}requested.set(item.id,(requested.get(item.id)||0)+item.quantity)}}
 for(const [id,needed] of requested){if(needed>stock(id)){err.textContent=`«${getProduct(id).name}»: доступно ${stock(id)} порц. — измени заказ`;return}}
 const button=$('#submit-order');button.disabled=true;
 const order={id:uid(),number:`MB-${String(Date.now()).slice(-7)}`,date:Date.now(),table:num,status:'placed',items:safeClone(state.cart),total:cartSum(state.cart)};
 const previousStocks={...state.stocks},oldCart=[...state.cart];
 for(const [id,needed] of requested)state.stocks[id]-=needed;
 state.orders.unshift(order);state.cart=[];
 if(!saveState(state)){state.orders.shift();state.cart=oldCart;state.stocks=previousStocks;button.disabled=false;err.textContent='Браузер не дал сохранить заказ. Проверь доступ к хранилищу.';return}
 selected=null;renderCart();renderCatalog();renderHeader();renderOrders();closeDrawer();showConfirmation(order);
}
function renderOrders(){const root=$('#orders-list');if(!state.orders.length){root.innerHTML='<div class="orders-empty"><div><strong>ЗДЕСЬ ПОКА ТИХО</strong><p>Твои заказы появятся тут после оформления.</p></div><a href="#menu" class="text-button">К барной карте ↗</a></div>';return}
 root.innerHTML=state.orders.map(o=>`<article class="order-card ${o.status==='cancelled'?'cancelled':''}"><div class="order-card-top"><span class="order-number">${escapeHtml(o.number)}</span><span class="order-status">${o.status==='cancelled'?'ОТМЕНЁН':'ОФОРМЛЕН'}</span></div><div class="order-date">${dateText(o.date)} · Столик №${o.table}</div><ul class="order-items">${o.items.map(i=>`<li><span>${escapeHtml(i.name)} · ${escapeHtml(i.size)} × ${i.quantity}</span><b>${money(i.unitPrice*i.quantity)}</b></li>`).join('')}</ul><div class="order-footer"><strong>${money(o.total)}</strong>${o.status==='placed'?`<button type="button" class="cancel-order" data-cancel-order="${o.id}">Отменить заказ ↗</button>`:'<span style="font-size:11px">Сохранён в истории</span>'}</div></article>`).join('');
}
function initOrders(){$('#orders-list').addEventListener('click',e=>{const btn=e.target.closest('[data-cancel-order]');if(!btn)return;const order=state.orders.find(o=>o.id===btn.dataset.cancelOrder);if(!order||order.status!=='placed')return;if(!confirm(`Отменить заказ ${order.number}?`))return;order.status='cancelled';for(const item of order.items){if(item.kind==='ready'&&state.stocks[item.id]!==undefined)state.stocks[item.id]+=item.quantity}persist();renderOrders();renderCatalog();notify('Заказ отменён. Позиции снова доступны.');});}
function showConfirmation(o){confirmVisible=true;$('#confirm-content').innerHTML=`<p>Заказ успешно сохранён. Твой номер:</p><div class="receipt-number">${escapeHtml(o.number)}</div><div class="dialog-receipt"><div class="dialog-receipt-row"><span>Столик</span><b>№${o.table}</b></div><div class="dialog-receipt-row"><span>Напитков</span><b>${cartCount(o.items)}</b></div><div class="dialog-receipt-row total"><span>Итого</span><b>${money(o.total)}</b></div></div>`;$('#confirm-overlay').classList.remove('hidden');document.body.classList.add('modal-open');$('#confirm-close').focus();renderHeader()}
function closeConfirmation(navigate=false){confirmVisible=false;$('#confirm-overlay').classList.add('hidden');document.body.classList.remove('modal-open');renderHeader();if(navigate)$('#orders').scrollIntoView({behavior:'smooth'});}
function initConfirm(){$('#confirm-done').addEventListener('click',()=>closeConfirmation(true));$('#confirm-close').addEventListener('click',()=>closeConfirmation());$('#confirm-overlay').addEventListener('click',e=>{if(e.target.id==='confirm-overlay')closeConfirmation()})}
function openDrawer(id){if(activeDrawer)closeDrawer();lastFocus=document.activeElement;activeDrawer=id;$('#drawer-overlay').classList.remove('hidden');const el=$('#'+id);el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');renderHeader();el.querySelector('[data-close-drawer]').focus()}
function closeDrawer(){if(!activeDrawer)return;const el=$('#'+activeDrawer);el.classList.remove('open');el.setAttribute('aria-hidden','true');$('#drawer-overlay').classList.add('hidden');document.body.classList.remove('modal-open');activeDrawer=null;renderHeader();if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true})}
function initDrawers(){$$('#detail-drawer [data-close-drawer],#cart-drawer [data-close-drawer]').forEach(b=>b.addEventListener('click',closeDrawer));$('#drawer-overlay').addEventListener('click',closeDrawer);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(confirmVisible)closeConfirmation();else if(activeDrawer)closeDrawer();return}if(e.key!=='Tab')return;const root=confirmVisible?$('#confirm-dialog'):(activeDrawer?$('#'+activeDrawer):null);if(!root)return;const nodes=$$('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled])',root).filter(el=>el.offsetParent!==null);if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
}
function initMaintenance(){const maintenance=document.createElement('button');maintenance.className='reset-demo';maintenance.type='button';maintenance.textContent='Сбросить данные';maintenance.setAttribute('aria-label','Сбросить локальные данные MOOD BAR');maintenance.style.cssText='font-size:10px;text-decoration:underline;color:#d7c9c3;padding:10px;';$('.footer-inner').appendChild(maintenance);maintenance.addEventListener('click',()=>{if(confirm('Удалить корзину, историю заказов и вернуть исходный ассортимент?')){if(resetState())location.reload();else notify('Не удалось очистить хранилище браузера')}})}
function boot(){initFilters();initCatalog();initDetails();initBuilder();initCart();initOrders();initConfirm();initDrawers();initMaintenance();renderCatalog();renderOrders();renderCart();renderHeader();if(recovered?.corrupted)notify('Сохранённые данные повреждены: использовано начальное состояние.')}
boot();
})();