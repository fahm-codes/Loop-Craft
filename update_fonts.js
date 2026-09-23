const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // run the regex twice to catch multiple occurrences of font- in the same class list
  let newContent = content.replace(/(<h[1-6][^>]*className=["'][^"'>]*)font-(?:sans|serif|mono|display)\s*([^"'>]*["'])/g, '$1font-display $2');
  newContent = newContent.replace(/(<h[1-6][^>]*className=["'][^"'>]*)font-(?:sans|serif|mono|display)\s*([^"'>]*["'])/g, '$1font-display $2');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
