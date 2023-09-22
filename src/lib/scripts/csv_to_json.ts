const fs = require('fs');
const csv = require('csv-parser');

let jsonData = [];

fs.createReadStream('src/lib/scripts/spanish.csv')
  .pipe(csv())
  .on('data', (row) => {
    jsonData.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    fs.writeFileSync('src/lib/scripts/spanish.json', JSON.stringify(jsonData, null, 4)); // 4 spaces for indentation
  });