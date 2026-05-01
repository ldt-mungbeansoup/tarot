import crypto from 'crypto';

const majorNames = [
  "00_Fool", "01_Magician", "02_High_Priestess", "03_Empress",
  "04_Emperor", "05_Hierophant", "06_Lovers", "07_Chariot",
  "08_Strength", "09_Hermit", "10_Wheel_of_Fortune", "11_Justice",
  "12_Hanged_Man", "13_Death", "14_Temperance", "15_Devil",
  "16_Tower", "17_Star", "18_Moon", "19_Sun",
  "20_Judgement", "21_World"
];
const suits = ["Wands", "Cups", "Swords", "Pentacles"];

for (const name of majorNames) {
  const file = `RWS_Tarot_${name}.jpg`;
  const hash = crypto.createHash('md5').update(file).digest('hex');
  console.log(`"https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash.substring(0, 2)}/${file}",`);
}
for (const suit of suits) {
  for (let i = 1; i <= 14; i++) {
    const num = i.toString().padStart(2, '0');
    // Wikipedia commons names: e.g. "Swords01.jpg"
    let file = `${suit}${num}.jpg`;
    if (suit === 'Pentacles') file = `Pents${num}.jpg`;
    let hash = crypto.createHash('md5').update(file).digest('hex');
    console.log(`"https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash.substring(0, 2)}/${file}",`);
  }
}
