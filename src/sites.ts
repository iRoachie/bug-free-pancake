import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const site = await prisma.site.findMany({
    select: {
      id: true,
      activeProvider: {
        select: {
          provider: {
            select: {
              providerName: true,
            },
          },
        },
      },
      providers: {
        select: {
          providerName: true,
          dnsName: true,
        },
      },
    },
  });

  console.dir(site, { depth: null });
};

main().catch(console.error);
