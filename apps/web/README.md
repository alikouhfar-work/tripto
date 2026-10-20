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

src/
├── app/
│ ├── index.tsx # App entry point
│ ├── App.tsx # Main App component, routing setup
│ └── main.css # Global styles
├── processes/ # (Optional) e.g., auth flow
│ └── auth/
│ ├── index.ts
│ └── ui/ # Components specific to this process
├── pages/
│ ├── HomePage/
│ │ ├── index.tsx # Composes widgets and features for the Home page
│ │ └── ui/ # Page-specific UI elements (if any)
│ ├── ProfilePage/
│ │ ├── index.tsx
│ │ └── ui/
│ └── ...
├── widgets/
│ ├── Header/
│ │ ├── index.tsx # Header component
│ │ ├── ui/ # Header UI elements
│ │ └── lib/ # Header-specific utilities
│ ├── ProductCard/
│ │ ├── index.tsx
│ │ └── ui/
│ └── ...
├── features/
│ ├── auth/
│ │ ├── index.ts # Public API for auth feature (e.g., LoginButton, auth selectors)
│ │ ├── login/ # Slice for login functionality
│ │ │ ├── index.ts
│ │ │ ├── components/ # Login form, modal
│ │ │ └── model/ # State management logic (if using Redux, Zustand, etc.)
│ │ ├── registration/
│ │ │ ├── index.ts
│ │ │ └── components/
│ │ └── ...
│ ├── products/
│ │ ├── index.ts # Public API for products (e.g., ProductCard, ProductList)
│ │ ├── products-list/ # Slice for displaying a list of products
│ │ │ ├── index.ts
│ │ │ ├── components/
│ │ │ └── model/
│ │ └── product-details/ # Slice for viewing single product details
│ │ ├── index.ts
│ │ ├── components/
│ │ └── model/
│ └── ...
├── segments/ # Formerly 'entities' - core domain models
│ ├── user/ # User entity and related logic
│ │ ├── index.ts # e.g., User type, User class
│ │ └── ...
│ ├── product/ # Product entity and related logic
│ │ ├── index.ts # e.g., Product type, Product class
│ │ └── ...
│ └── ...
└── shared/
├── ui/ # Reusable UI components (Button, Input, Modal)
│ ├── Button/
│ │ ├── index.tsx
│ │ └── Button.module.css
│ ├── Input/
│ └── ...
├── lib/ # General utility functions (date formatting, string manipulation)
│ ├── hooks/ # Custom React hooks
│ ├── types/ # TypeScript types/interfaces
│ ├── constants/ # Application-wide constants
│ └── ...
└── index.ts # Exports from shared layer
