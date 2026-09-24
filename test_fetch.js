
fetch('http://localhost:3000/dsa-sheets/apna-college')
  .then(res => res.text())
  .then(text => console.log('Contains Apna College:', text.includes('Apna College DSA Sheet')))

