const fs = require('fs')
const csvParser = require('csv-parser');
const courseraFile = './Data/coursera.csv'
const edxFile = './Data/edX.csv'
const prisma = require('.');

async function translate() {
  console.log('hello?')
  const coursera = []
  fs.createReadStream(courseraFile, { encoding: 'utf-8' })
    .pipe(csvParser(Array[String]))
    .on('data', (data) => coursera.push(data))
    .on('end', async () => {
      for (let course of coursera) {
        const data = {
          url: course['link-href'],
          name: course.name,
          provider: course.provider,
          category: /(?<=topic=)(.+)/.exec(course['web-scraper-start-url'])[0].replaceAll('%20', ' '),
          price: course.price,
          image: course['image-src'],
        }
        await prisma.course.upsert({
          where: { url: data.url },
          update: data,
          create: data,
        })
        console.log(data.name)
      }
    })

  const edx = []
  fs.createReadStream(edxFile, { encoding: 'utf-8' })
    .pipe(csvParser(Array[String]))
    .on('data', (data) => edx.push(data))
    .on('end', async () => {
      for (let course of edx) {
        const data = {
          url: course['link-href'],
          name: course.name,
          provider: course.school,
          category: /(?<=subject=)(.+)/.exec(course['web-scraper-start-url'])[0].replaceAll('+', ' '),
          price: course.price,
          image: course['image-src'],
        }
        await prisma.course.upsert({
          where: { url: data.url },
          update: data,
          create: data,
        })
        console.log(data.name)
      }
    })
}

translate()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })