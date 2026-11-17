import {BASE_OPTIONS,FLAVOR_OPTIONS,GARNISH_OPTIONS,SIZE_MULTIPLIERS,COCKTAILS} from './data.js';
import {round10} from './utils.js';
export function readyPrice(c,size){return round10(c.price*(SIZE_MULTIPLIERS[size]??1))}
export function customPrice(b){
 const base=BASE_OPTIONS.find(o=>o.id===b.base)?.price??390;
 const flavor=FLAVOR_OPTIONS.find(o=>o.id===b.flavor)?.price??80;
 const garnish=GARNISH_OPTIONS.find(o=>o.id===b.garnish)?.price??0;
 return round10((base+flavor+garnish)*(SIZE_MULTIPLIERS[b.size]??1));
}
export function cartSum(cart){return cart.reduce((a,i)=>a+i.unitPrice*i.quantity,0)}
export const cartCount=cart=>cart.reduce((a,i)=>a+i.quantity,0);
export function getProduct(id){return COCKTAILS.find(c=>c.id===id)}
