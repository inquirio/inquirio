import {prisma} from '../../prisma/index'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      const user = await prisma.User.create({
        data: {
          name: name,
          email: email,
        }
      });
      res.status(201).json({ user });

    } catch (e) {
      console.log(e);
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await prisma.user.findMany();
      res.send(result)
      return {
        props: {
          allUsers: result
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}