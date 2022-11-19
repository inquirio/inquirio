const csvParser = require('csv-parser');
const fs = require('fs')

const courseraFile = 'coursera.csv'

const results = [];

// fs.createReadStream('coursera.csv')
// .pipe(csv({}))
// .on('data', (data) => results.push(data))
// .on('end', () => {
  
//   console.log(results);
// })

fs.createReadStream(courseraFile, {encoding: 'utf-8'})
.pipe(csvParser(Array[String]))
.on('data', (data) => results.push(data))
.on('end', () => { 
  const stringifyResults = JSON.stringify(results, null, 2)
  console.log(results);
  fs.writeFile('coursera.json', stringifyResults, (error) => {
    if(error){
      console.error(error);
    } else {
      console.log('File Written Successfully');
      console.log(fs.readFileSync('coursera.csv', 'utf8'))
  
    }
  })
})


