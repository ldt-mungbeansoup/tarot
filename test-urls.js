const https = require('https');
https.get('https://raw.githubusercontent.com/iteles/tarot-deck/master/static/img/cards/ar00.jpg', (res) => {
  console.log('iteles 1: ' + res.statusCode);
});
https.get('https://raw.githubusercontent.com/howech/tarot-images/master/public/images/cards/ar00.jpg', (res) => {
  console.log('howech: ' + res.statusCode);
});
https.get('https://raw.githubusercontent.com/redrew/tarot/master/images/cards/00.jpg', (res) => {
  console.log('redrew: ' + res.statusCode);
});
https.get('https://raw.githubusercontent.com/ebullient/tarot-api/main/images/m00.jpg', (res) => {
  console.log('ebullient: ' + res.statusCode);
});
