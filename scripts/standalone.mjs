import {readFileSync,writeFileSync} from 'node:fs';
let html=readFileSync('dist/index.html','utf8');
html=html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/,(_,path)=>'<script>window.HANIP_STANDALONE=true;'+readFileSync('dist'+path,'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
// Place the bundled script after the root element so it exists before React mounts.
const script=html.match(/<script>[\s\S]*?<\/script>/)[0];
html=html.replace(script,'').replace('</body>',script+'</body>');
html=html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/,(_,path)=>'<style>'+readFileSync('dist'+path,'utf8')+'</style>');
html=html.replace(/<link rel="manifest"[^>]*>/,'').replace(/<link rel="icon"[^>]*>/,'<link rel="icon" href="data:image/svg+xml,'+encodeURIComponent(readFileSync('public/icon.svg','utf8'))+'">');
writeFileSync('hanip.html',html);
console.log('Generated hanip.html: self-contained, no external dependencies.');
