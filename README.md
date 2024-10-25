This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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


Blog Application Frontend
This is the frontend for a blog application built using Next.js. It includes pages for user registration, login, a homepage to display all blog posts, and an admin dashboard for managing users and blog content. The frontend uses Zustand for state management, React Query for handling API requests, and Shadcn for UI components.

Table of Contents
Features
Installation
Environment Variables
Usage
Project Structure
Notes
Features
User Authentication: Allows users to log in or sign up, storing JWT tokens in HTTP-only cookies for security.
Role-Based Access:
Regular users are directed to the homepage where they can view all posts.
Admin users are redirected to the dashboard with additional permissions.
Blog Post Management:
Regular users can view, like, and read specific blog posts.
Admins can create, update, and delete blog posts from the dashboard.
User Management (Admin only):
Admins can view, search, filter, block, and unblock users.
Responsive UI: Uses Shadcn components and is fully responsive across devices.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
