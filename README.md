This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Start

To run the first project:

In the project folder, enter the command ` npm install ` in the terminal.

After the libraries are installed, enter the command ` npm run dev `.

In your browser, enter the address http://localhost:3000/en.

To build the project:

Enter the command ` npm run build `.

Then enter the command ` npm run start `.

## Description

This project is developed with Next.js 15.1.6 using TypeScript. In this project, we use the following libraries:

@nextui-org/react for designing the UI/UX section.

next-intl for implementing both Persian and English languages simultaneously.

The file Next-2Language/messages/en.json and /messages/fa.json contain the text for the selected languages on the site.

The following files are used for language settings:

Next-2Language/src/app/middleware.ts

Next-2Language/src/app/i18n/request.ts

Next-2Language/src/app/i18n/routing.ts

The following files are used for SEO implementation and settings on the site:

Next-2Language/src/app/[locale]/sitemap.ts

Next-2Language/src/app/[locale]/robots.ts

The file Next-2Language/src/app/[locale]/not-found.tsx is created for 404 errors.

The file Next-2Language/src/app/[locale]/loading.tsx is created for loading states between pages.

The Next-2Language/src/app/components/ImageCustom/ImageCustom.tsx file is a custom image tag that has load mode and can display an alternate image if an error occurs while loading the image.

In this project, there are two headers:

The header for the main page is located at Next-2Language/src/app/components/Header/HeaderHome.tsx.

The header for all other pages is located at Next-2Language/src/app/components/Header/Header.tsx.

The following hook is used to access subtitle files:

import { useTranslations } from 'next-intl'
const t = useTranslations("Services");

The following hook is used to detect the site language, and its output is either fa or en:

import { useLocale } from 'next-intl'
const local = useLocale

## Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/[local]/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## How Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

The easiest way to deploy your Next.jsapp is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

1. Create a Vercel Account
First, go to Vercel's website and create an account. You can sign up using your GitHub, GitLab, or Bitbucket account.

2. Install Vercel CLI
Install the Vercel CLI globally by running:

Git Bash ---> npm i -g vercel

3. Login to Vercel
Log in to your Vercel account using the following command:

Git Bash ---> vercel login

This will connect you to Vercel and allow you to manage your projects.

4. Prepare Your Project for Deployment
Navigate to your Next.jsproject directory and run:

Git Bash ---> vercel

This command will guide you through the configuration steps for your project, such as project name, output directory (default is out or .next), etc.

5. Deploy Your Project
After completing the configuration steps, your project will automatically be deployed on Vercel and you'll receive a unique URL to access your project. You can also redeploy your project at any time using the following command:

Git Bash ---> vercel --prod

This will deploy your project in production mode.

6. Add a Custom Domain

To add a custom domain to your project:

1_Go to the Vercel Dashboard.

2_Open your project.

3_Navigate to the "Domains" tab.

4_Add your custom domain and follow the instructions to configure your DNS settings.

7. Manage Your Project on Vercel

Once deployed, you can manage your projects through the Vercel dashboard. Go to the Vercel Dashboard to view and manage your projects.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!