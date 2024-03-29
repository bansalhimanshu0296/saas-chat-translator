This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## SAAS-CHAT-TRANSLATOR

### About application

It is a chat application with inbuilt translator in 10 languages which can be increased because application uses firebase extension for doing same and also firebase extesnion is used to integrate Stripe payment method.

### Install the dependencies

```bash
npm install
# or
yarn install
```

## Configuration File

```Set environment variables
NEXTAUTH_SECRET: Next Application authentication Secret which is generated by developer
FIREBASE_PRIVATE_KEY: Firebase project private key
FIREBASE_PROJECT_ID: Firebase project ID
FIREBASE_CLIENT_EMAIL: Firebase Project Email
STRIPE_SECRET_KEY: Stripe Payment Secret API key
GOOGLE_CLIENT_ID: Google App Client ID
GOOGLE_CLIENT_SECRET: Google App Secret Key


Also Change firebaseConfig json in firebase.js
```

### To run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
