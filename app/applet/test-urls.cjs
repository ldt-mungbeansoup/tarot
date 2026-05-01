const https = require('https');
const check = (url, name) => {
  https.get(url, (res) => {
    console.log(name + ': ' + res.statusCode);
  });
};
check('https://raw.githubusercontent.com/iteles/tarot-deck/master/static/img/cards/ar00.jpg', 'iteles');
check('https://raw.githubusercontent.com/Fiona17x/Tarot-Cards-API/main/cards/0.jpeg', 'fiona');
check('https://raw.githubusercontent.com/jamesaoverton/tarot/master/images/cards/ar00.jpg', 'jamesaoverton');
check('https://raw.githubusercontent.com/ekelen/tarot-api/master/static/cards/m00.jpg', 'ekelen');
check('https://sakura-paris.org/tarot/Rider_Waite_Tarot/00_The_Fool.jpg', 'sakura');
check('https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg', 'wiki');
