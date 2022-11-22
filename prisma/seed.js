const fs = require('fs')
const csvParser = require('csv-parser');
const courseraFile = './Data/coursera.csv'
const edxFile = './Data/edX.csv'
const futureLearnFile = './Data/future-learn.csv'
const udacityFile = './Data/udacity.csv'
const udemyFile = './Data/udemy.csv'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient

async function translate() {
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

  const futureLearn = []
  fs.createReadStream(futureLearnFile, { encoding: 'utf-8' })
    .pipe(csvParser(Array[String]))
    .on('data', (data) => futureLearn.push(data))
    .on('end', async () => {
      for (let course of futureLearn) {
        const data = {
          url: course['link-href'],
          name: course.name,
          provider: course.provider,
          category: /(?<=subjects\/)(.+)(?=-courses)/.exec(course['web-scraper-start-url'])[0].replaceAll('-', ' '),
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

  const udacity = []
  fs.createReadStream(udacityFile, { encoding: 'utf-8' })
    .pipe(csvParser(Array[String]))
    .on('data', (data) => udacity.push(data))
    .on('end', async () => {
      for (let course of udacity) {
        const data = {
          url: course['link-href'],
          name: course.name,
          provider: 'Udacity',
          category: /(?<=field=)(.+)/.exec(course['web-scraper-start-url'])[0].replaceAll('-', ' '),
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

    const udemy = []
    fs.createReadStream(udemyFile, { encoding: 'utf-8' })
      .pipe(csvParser(Array[String]))
      .on('data', (data) => udemy.push(data))
      .on('end', async () => {
        for (let course of udemy) {
          price =  course.price === 'null' ? null: /\d+\.\d+/.exec(course.price)[0];
          const data = {
            url: course['link-href'],
            name: course.name,
            provider: course.provider,
            category: /(?<=courses\/)(.+)(?=\/)/.exec(course['web-scraper-start-url'])[0].replaceAll('-', ' '),
            image: course['image-src'],
            price
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