export const STORAGE_KEY='moodbar_state_v1';
export function loadState(){
 try{
  const raw=localStorage.getItem(STORAGE_KEY);
  if(!raw)return null;
  const data=JSON.parse(raw);
  if(!data||typeof data!=='object'||!Array.isArray(data.cart)||!Array.isArray(data.orders)||!data.stocks||typeof data.stocks!=='object')throw new Error('Некорректный формат данных');
  return data;
 }catch(err){console.warn('MOOD BAR: восстановление состояния не удалось',err);return {corrupted:true};}
}
export function saveState(state){
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify({cart:state.cart,orders:state.orders,stocks:state.stocks,builder:state.builder,table:state.table}));return true;}
 catch(err){console.warn('MOOD BAR: сохранение недоступно',err);return false;}
}
export function resetState(){try{localStorage.removeItem(STORAGE_KEY);return true}catch{return false}}
