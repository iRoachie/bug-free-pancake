import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = {
  id: 12,
  domain: 'cool-site.com',
  activeProvider: 'netlify',
  providers: [
    {
      name: 's3',
      dnsName: 'my-site.s3.com',
    },
    {
      name: 'netlify',
      dnsName: 'my-site.netlify.com',
    },
  ],
};

const main = async () => {
  const site = await prisma.site.create({
    data: {
      id: data.id,
      domain: data.domain,
      providers: {
        create: data.providers.map((a) => ({
          provider: {
            connect: {
              name: a.name,
            },
          },
          dnsName: a.dnsName,
        })),
      },
    },
    include: {
      providers: true,
    },
  });

  const newProvider = site.providers.find(
    (a) => a.providerName === data.activeProvider
  )?.id!;

  await prisma.$executeRaw(
    `INSERT INTO default.ActiveProvider (A, B) VALUES (${site.id}, ${newProvider})`
  );
};

main().catch(console.error);
