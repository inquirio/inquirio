import { prisma } from '../prisma/index'

async function addEnrollment(courseId, userId) {
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
    return enrollment;
  } catch (e) {
    console.log(e);
  }
}

async function getEnrollment(query) {
  try {
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
    let limit = query.limit ? query.limit : 20

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

    return { totalPages, courses };
  } catch (e) {
    console.log(e);
  }
}

async function updateEnrollment(id, enrollmentStatus) {
  try {
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: { status: enrollmentStatus }
    })
    return enrollment;
  } catch (e) {
    console.log(e)
  }
}

async function deleteEnrollment(id) {
  try {
    await prisma.enrollment.delete({
      where: { id }
    })
    return 'Enrollment Deleted';
  } catch (e) {
    console.log(e)
  }
}
export { addEnrollment, getEnrollment, updateEnrollment, deleteEnrollment }