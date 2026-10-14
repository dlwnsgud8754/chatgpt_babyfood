import {readdirSync,writeFileSync} from 'node:fs';
const assets=readdirSync('dist/assets').map(f=>'/assets/'+f);
const cache='hanip-'+Date.now();
writeFileSync('dist/sw.js',`const CACHE=${JSON.stringify(cache)};const FILES=${JSON.stringify(['/', '/index.html','/manifest.webmanifest','/icon.svg','/icon-192.png','/icon-512.png',...assets])};
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('hanip-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request,{ignoreVary:true}).then(hit=>hit||fetch(event.request).catch(()=>event.request.mode==='navigate'?caches.match('/index.html'):Response.error())))});`);
