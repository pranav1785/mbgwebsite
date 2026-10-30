import http from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf'};
const port = Number(process.env.PORT || 4173);
http.createServer((req,res) => {
  try {
    let name = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if (name !== root && !name.startsWith(root+path.sep)) { res.writeHead(403);res.end();return; }
    if (statSync(name).isDirectory()) name = path.join(name,'index.html');
    const data=readFileSync(name);res.writeHead(200,{'Content-Type':mime[path.extname(name)] || 'application/octet-stream'});res.end(data);
  } catch { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(readFileSync(path.join(root,'404.html'))); }
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
