## Prisma bug

```
The change you are trying to make would violate the required relation 'ActiveProviderToSite' between the `ActiveProvider` and `Site` models.
```

### Steps to Reproduce

```bash
docker-compose up -d
yarn prisma migrate save --experimental
yarn prisma migrate up --experimental

yarn ts-node src/setup.ts
yarn ts-node src/createSite.ts
```
