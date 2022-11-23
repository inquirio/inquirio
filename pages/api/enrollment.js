import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { prisma } from '../../prisma/index'
import { addEnrollment, updateEnrollment, deleteEnrollment } from '../../lib/enrollment'

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method === 'POST') {
    const { courseId, userId } = JSON.parse(req.body);
    try {
      const enrollment = await addEnrollment(courseId, userId)
      res.status(200).send(enrollment);
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message)
    }
  }

  if (req.method === 'PUT') {
    const { id, status } = JSON.parse(req.body)
    try {
      const enrollment = await updateEnrollment(id, status)
      res.status(200).send(enrollment)
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }

  if (req.method === 'DELETE') {
    const { id } = JSON.parse(req.body)
    try {
      let response = await deleteEnrollment(id)
      res.status(200).send(response)
    } catch (e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
})