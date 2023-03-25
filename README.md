###  This is the simple NextJS application that will help to understand how we can build a Fullstack web application using NextJS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

**What are the changes and implementations it contains?**
- Made with Tailwind CSS 
- Integrated Dark mode and themeing part
- Integrated Database with **Prisma and Postgress**
- API integration.
- Next font implementation.
- Next auth integration with google.
- Next API (routes), client components and** React Query** integrations
- Restricted routes and API integrations.

## Setup .env

We need to set some environment variables which need to be set up before using the app.

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SECRET_KEY=
NEXTAUTH_SECRET=YOURKEY
NEXT_AUTH_URL=http://localhost:3000
```
Add your google authentication key and ID here and put your local database URL.

Now serve it...
```bash
npm  install 
# or 
pnpm install
# or 
yarn install
#=============================
npm run dev
# or
yarn dev
# or
pnpm dev
```
