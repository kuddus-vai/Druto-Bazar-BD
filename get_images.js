const https = require('https');

function searchUnsplash(query) {
  return new Promise(resolve => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124' }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        // The HTML contains window.__INITIAL_STATE__ or similar, but we can just regex for photo URLs
        const matches = [...body.matchAll(/"\/photos\/([^"]+)"/g)];
        const ids = matches.map(m => m[1]).filter(id => id.length > 10 && id.includes('-'));
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
