export const CATEGORIES = [
  {id:'spicy', label:'ПРЯНЫЕ', short:'Пряные', color:'#f5b1a8'},
  {id:'fruity', label:'ФРУКТОВЫЕ', short:'Фруктовые', color:'#d9e9ad'},
  {id:'smoky', label:'ДЫМНЫЕ', short:'Дымные', color:'#c6deed'},
  {id:'velvety', label:'БАРХАТИСТЫЕ', short:'Бархатистые', color:'#e8d5ea'}
];
export const BASES = ['Текила','Джин','Ром','Водка','Мескаль'];
export const COCKTAILS = [
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
export const BASE_OPTIONS = [
 {id:'vodka',label:'Водка',price:390},{id:'gin',label:'Джин',price:420},{id:'rum',label:'Ром',price:440},{id:'tequila',label:'Текила',price:460},{id:'mezcal',label:'Мескаль',price:520},{id:'zero',label:'Безалкогольная',price:280}
];
export const FLAVOR_OPTIONS = [
 {id:'fruity',label:'Фруктовый',price:80,color:'#e64d71'},
 {id:'spicy',label:'Пряный',price:70,color:'#d77835'},
 {id:'smoky',label:'Дымный',price:100,color:'#852e43'},
 {id:'velvety',label:'Бархатистый',price:90,color:'#e5bf84'},
 {id:'fresh',label:'Свежий',price:60,color:'#a6c764'}
];
export const GARNISH_OPTIONS = [
 {id:'none',label:'Без украшения',price:0},{id:'citrus',label:'Цитрус',price:20},
 {id:'mint',label:'Мята',price:20},{id:'rosemary',label:'Розмарин',price:20},
 {id:'berries',label:'Ягоды',price:30},{id:'chili',label:'Чили',price:30}
];
export const SIZE_MULTIPLIERS={S:0.85,M:1,L:1.25};
export const INITIAL_STOCK = Object.fromEntries(COCKTAILS.map(c=>[c.id,c.stock]));
