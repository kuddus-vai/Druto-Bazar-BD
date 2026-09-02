const https = require('https');

const urls = [
  "1474979266404-7eaacbcd87c5",
  "1587049352846-4a222e784d38",
  "1631700611307-37dbcb89ef7e",
  "1584308666744-24d5c474f2ae",
  "1596040033229-a9821ebd058d",
  "1622483767028-3f66f32aef97",
  "1586201375761-83865001e31c",
  "1556228720-195a672e8a03",
  "1544787219-7f47ccb76574",
  "1509358271058-acd22cc93898",
  "1578985545062-69928b1d9587"
];

const req = https.request({
  hostname: 'unsplash.com',
  port: 443,
  path: `/photos/${urls[0]}`,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const match = body.match(/<title>(.*?)<\/title>/);
    console.log(`${urls[0]}: ${match ? match[1] : 'No title'}`);
  });
});
req.end();
