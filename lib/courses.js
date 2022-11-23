import { prisma } from '../prisma/index'


export default async function getCourses(query) {
  try {
    let allSearchQueries = [];
    if (query.search) allSearchQueries.push({
      name: {
        search: query.search.split(' ').join(' & ')
      }
    })
    if (query.provider) allSearchQueries.push({
      provider: {
        search: query.provider.split(' ').join(' & ')
      }
    })
    if (query.category) allSearchQueries.push({
      category: {
        search: query.category.split(' ').join(' & ')
      }
    })
    let page = query.page ? query.page - 1 : 0
    let limit = query.limit ? query.limit : 20

    let filter = {
      take: limit,
      skip: limit * page,
    }
    let dbQuery = {
      where: {
        AND: allSearchQueries
      }
    }

    let count = await prisma.course.count(dbQuery)
    let totalPages = Math.ceil(count / limit);
    let courses = await prisma.course.findMany({ ...filter, ...dbQuery });

    return { totalPages, courses }
  } catch (e) {
    console.log(e);
  }
}
