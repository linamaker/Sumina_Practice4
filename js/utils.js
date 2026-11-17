export const $ = (s, root=document)=>root.querySelector(s);
export const $$ = (s, root=document)=>Array.from(root.querySelectorAll(s));
export const money=n=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0}).format(n)+' ₽';
export const round10=n=>Math.round(n/10)*10;
export const escapeHtml=(str='')=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const uid=()=>globalThis.crypto?.randomUUID?.() || `order-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const dateText=ts=>new Intl.DateTimeFormat('ru-RU',{dateStyle:'medium',timeStyle:'short'}).format(ts);
export const itemSignature=i=>JSON.stringify([i.kind,i.id||null,i.name,i.size,i.ice,i.config||null]);
export const optionName=(list,id)=>list.find(o=>o.id===id)?.label||'';
