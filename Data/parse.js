const csvParser = require('csv-parser');
const fs = require('fs')

const courseraFile = 'coursera.csv'
const edXFile = 'edX.csv'

const results = [];
const edXResults = [];



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

fs.createReadStream(edXFile, {encoding: 'utf-8'})
.pipe(csvParser(Array[String]))
.on('data', (data) => edXResults.push(data))
.on('end', () => { 
  const stringifyResults = JSON.stringify(edXResults, null, 2)
  const removeSpaces = stringifyResults.replace(/\\n/g, ' ');
  console.log(edXResults);
  fs.writeFile('edX.json', removeSpaces, (error) => {
    if(error){
      console.error(error);
    } else {
      console.log('File Written Successfully');
      console.log(fs.readFileSync('edX.csv', 'utf8'))
  
    }
  })
})
