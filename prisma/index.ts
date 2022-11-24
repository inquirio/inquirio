import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

export const prisma =
  global.prisma ||
  new PrismaClient()

/* It's a way to make sure that the prisma client is only instantiated once. */
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default {};
