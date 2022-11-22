import { handleAuth, handleCallback, session } from '@auth0/nextjs-auth0';
import { prisma } from '../../../prisma'

const afterCallback = async (req, res, session) => {
  const data = {
    name: session.user.name,
    email: session.user.email,
  }
  await prisma.User.upsert({
    where: { email: session.user.email },
    update: data,
    create: data
  });
  return session;
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