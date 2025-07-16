# Day13 Auth App - NextJS Authentication Project

This is a NextJS project with user authentication management, featuring a task manager dashboard with protected routes.

## Features

- 🔐 **User Authentication**: Login/logout functionality with API integration
- 🛡️ **Protected Routes**: Dashboard routes that require authentication
- 📊 **Dashboard Layout**: Task manager style interface
- 🔗 **API Integration**: Service layer for handling authentication API calls
- 🎨 **Modern UI**: Clean, responsive design using Tailwind CSS
- 🚀 **NextJS 15**: Built with the latest NextJS App Router

## Authentication Flow

1. **Unauthenticated users** → Redirected to `/login`
2. **Authenticated users** → Access to `/dashboard`
3. **Token management** → Stored in localStorage and cookies for middleware

## Demo Credentials

```text
Username: tungnt@softech.vn
Password: 123456789
```

## API Endpoint

```json
URL: https://server.aptech.io/auth/login
Method: POST
Body: {
  "username": "tungnt@softech.vn",
  "password": "123456789"
}
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
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
