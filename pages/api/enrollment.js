import { prisma } from '../../prisma/index'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { courseId, userEmail } = req.body;
    try {
      const enrollment = await prisma.enrollment.create({
        data: {
          User: {
            connect: { email: userEmail },
          },
          Course: {
            connect: { id: courseId },
          },
        },
      })
      console.log(enrollment)
      res.status(200).json({ enrollment });

    } catch (e) {
      console.log(e);
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await prisma.enrollment.findMany();
      res.send(result)
      return {
        props: {
          enrollment: result
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}