import { handleAuth, handleCallback, session } from '@auth0/nextjs-auth0';
import { prisma } from '../../../prisma'

const afterCallback = async (req, res, session) => {
  try {
    const data = {
      name: session.user.name,
      email: session.user.email,
    }
    let dbUser = await prisma.User.upsert({
      where: { email: session.user.email },
      update: data,
      create: data
    });
    session.user.dbid = dbUser.id;
    return session;
  } catch (error) {
    res.status(500).send(e.message)
  }
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});