import { prisma } from '../../prisma/index'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { courseId, userId } = req.body;
    try {
      const enrollment = await prisma.enrollment.create({
        data: {
          User: {
            connect: { id: userId },
          },
          Course: {
            connect: { id: courseId },
          },
        },
      })
      res.status(200).send(enrollment);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message)
    }
  }

  if (req.method === 'GET') {
    try {
      const { query } = req;
      let allSearchQueries = [];
      allSearchQueries.push({
        User: {
          is: {
            id: query.userId
          }
        }
      })
      if (query.search) allSearchQueries.push({
        Course: {
          is: {
            name: {
              search: query.search.split(' ').join(' & ')
            }
          }
        }
      })
      if (query.provider) allSearchQueries.push({
        Course: {
          is: {
            provider: {
              search: query.provider.split(' ').join(' & ')
            }
          }
        }
      })
      if (query.category) allSearchQueries.push({
        Course: {
          is: {
            category: {
              search: query.category.split(' ').join(' & ')
            }
          }
        }
      })
      let page = query.page ? query.page - 1 : 0;
      let limit = query.limit ? parseInt(query.limit) : 20

      let filter = {
        take: limit,
        skip: limit * page,
        include: {
          Course: true
        }
      }
      let dbQuery = {
        where: {
          AND: allSearchQueries
        }
      }
      let count = await prisma.enrollment.count(dbQuery)
      let totalPages = Math.ceil(count / limit);
      let courses = await prisma.enrollment.findMany({ ...filter, ...dbQuery });

      res.status(200).send({ totalPages, courses })
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message)
    }
  }

  if (req.method === 'PUT') {
    try {
      const enrollment = await prisma.enrollment.update({
        where: { id: req.body.id },
        data: { status: req.body.status }
      })
      res.status(200).send(enrollment)
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.enrollment.delete({
        where: { id: req.body.id }
      })
      res.status(200).send('Enrollment Deleted')
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
}