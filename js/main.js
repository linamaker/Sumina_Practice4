import {CATEGORIES,COCKTAILS,INITIAL_STOCK,BASE_OPTIONS,FLAVOR_OPTIONS,GARNISH_OPTIONS} from './data.js';
import {money,escapeHtml,$,$$,uid,dateText,itemSignature,optionName} from './utils.js';
import {readyPrice,customPrice,cartSum,cartCount,getProduct} from './pricing.js';
import {loadState,saveState,resetState} from './storage.js';

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
