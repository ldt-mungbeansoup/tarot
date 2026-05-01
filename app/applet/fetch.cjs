const https = require('https');
https.get('https://raw.githubusercontent.com/iteles/tarot-deck/master/data/tarot-images.json', (res) => {
  let body = '';
  res.on('data', d => body+=d);
  res.on('end', () => console.log(body.substring(0, 500)));
});
