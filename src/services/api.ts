import { Item } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ITEMS_KEY = 'laf_items_v1';

function read(){ try { return JSON.parse(localStorage.getItem(ITEMS_KEY)||'[]'); } catch { return []; } }
function write(data:any){ localStorage.setItem(ITEMS_KEY, JSON.stringify(data)); }

export async function getItems(): Promise<Item[]> {
  return read();
}

export async function createItem(payload:{title:string,description:string,foundAt?:string}){
  const data = read();
  const it = { id: uuidv4(), title: payload.title, description: payload.description, foundAt: payload.foundAt || '', claimed: false, reportedBy: null };
  data.push(it);
  write(data);
  return it;
}

export async function toggleClaim(id:string){
  const data = read();
  const idx = data.findIndex((d:any)=>d.id===id);
  if(idx===-1) throw new Error('Not found');
  data[idx].claimed = !data[idx].claimed;
  write(data);
  return data[idx];
}

export async function removeItem(id:string){
  let data = read();
  data = data.filter((d:any)=>d.id!==id);
  write(data);
}