const C="taipan-v2";
const CDN="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(["/","/icon-192.png",CDN].map(u=>c.add(u).catch(()=>{})))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;})
      .catch(()=>caches.match(e.request).then(m=>m||caches.match("/"))));
  }else if(u.hostname==="cdn.jsdelivr.net"){
    e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;})));
  }
});
