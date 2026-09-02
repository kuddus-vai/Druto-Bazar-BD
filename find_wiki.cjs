const https = require('https');

function searchWiki(query) {
  return new Promise(resolve => {
    https.get(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          const pages = data.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].original) {
            resolve(pages[pageId].original.source);
          } else {
            resolve(null);
          }
        } catch(e) { resolve(null); }
      });
    });
  });
}

async function run() {
  const queries = ['Ghee', 'Clarified_butter', 'Liquid_soap', 'Goat_meat', 'Cake'];
  for (const q of queries) {
    const url = await searchWiki(q);
    console.log(`${q}: ${url}`);
  }
}
run();
