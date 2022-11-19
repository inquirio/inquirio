const prisma = require('.');
const coursera = require('../Data/coursera.json');
const edx = require('../Data/edX.json');

async function translate() {
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
}

translate()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })