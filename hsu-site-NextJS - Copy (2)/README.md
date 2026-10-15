This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CAIR dataset API

The restricted client-data layer uses dataset IDs rather than accepting raw server paths from a browser. Configuration is supplied through environment variables; see `.env.example`.

Endpoints:

- `GET /api/v1/datasets` — datasets authorized for the signed-in user.
- `GET /api/v1/datasets/:datasetId/files?path=...` — list an authorized directory inside the configured dataset root.
- `GET /api/v1/datasets/:datasetId/download?path=...` — stream an authorized file from the CAIR SFTP server.

The current permission store is JSON configuration (`CAIR_DATASET_ACCESS_JSON`) so the access boundary can be tested before a PostgreSQL metadata/permissions database is introduced. Dataset roots are server-only and are stripped from API responses.

This phase adds the `ssh2` package. Run `npm install` once after pulling these changes so your normal npm registry can update `package-lock.json`.
