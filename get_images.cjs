const https = require('https');

function searchUnsplash(query) {
  return new Promise(resolve => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        const matches = [...body.matchAll(/https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?[\w=&]+/g)];
        const ids = matches.map(m => m[1]).filter(id => id.length > 10);
        resolve([...new Set(ids)].slice(0, 3));
      });
    });
  });
}

async function run() {
  const queries = ['mustard-oil', 'honey-jar', 'clarified-butter', 'hand-wash', 'dates-fruit', 'raw-beef', 'raw-mutton', 'white-rice', 'brown-sugar', 'pink-salt', 'sliced-cake'];
  for (const q of queries) {
    const ids = await searchUnsplash(q);
    console.log(`${q}: ${ids.join(', ')}`);
  }
}
run();
