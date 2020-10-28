import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.provider.create({
    data: {
      name: 's3',
    },
  });

  await prisma.provider.create({
    data: {
      name: 'netlify',
    },
  });
}

main().catch(console.error);
