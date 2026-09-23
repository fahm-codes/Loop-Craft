const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\n>>> PLEASE PASTE YOUR NEON DATABASE_URL HERE: ', (answer) => {
  if (answer && answer.trim().startsWith('postgres')) {
    fs.appendFileSync('.env.local', `\nDATABASE_URL="${answer.trim()}"\n`);
    console.log('Successfully saved DATABASE_URL to .env.local');
  } else {
    console.log('Invalid URL provided.');
  }
  rl.close();
});
