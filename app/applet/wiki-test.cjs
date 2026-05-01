const https = require('https');
https.get('https://commons.wikimedia.org/wiki/Special:FilePath/Wands01.jpg', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Wands01: ', res.statusCode, res.headers.location);
});
https.get('https://commons.wikimedia.org/wiki/Special:FilePath/Cups01.jpg', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Cups01: ', res.statusCode, res.headers.location);
});
https.get('https://commons.wikimedia.org/wiki/Special:FilePath/Swords01.jpg', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Swords01: ', res.statusCode, res.headers.location);
});
https.get('https://commons.wikimedia.org/wiki/Special:FilePath/Pentacles01.jpg', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Pentacles01: ', res.statusCode, res.headers.location);
});
