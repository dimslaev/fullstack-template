## DS Fullstack template

A modern yet stable fullstack template focusing on type-safety, developer experience, and maintaining balance between server and client side responsibilities.

Technologies:

- Next JS
- Typescript
- Prisma
- Custom JWT Auth
- Rest API
- React Query
- React Hook Form
- Joy UI
- Zod

### Motivation

Since Next.js 13, there's been a push towards SSR which ultimately results in higher server costs and less organized app architecture due to the blurred distinction between server and client responsabilities. Instead of just following the latest trends, this template sticks to Next.js Pages Router, ensuring Static Rendering for most pages without needing to write a `use client` directive on every page.

#### Type-safety

Thanks to **Prisma**, entity types can be automatically generated from DB schemas using `prisma generate` command. These types can then be used both server and client side.

Thanks to **Zod**, queries, post payloads and forms can be validated with the same schemas, both server and client side.

#### Rest API

Using a Rest API in conjunction with Playwright allows for entities to be developed using a test-driven approch. You can basically create your models, develop the API endpoint and test it with Playwright to make sure everything works before starting the front-end integration.

#### Custom Authentication

The `Next Auth` package is an overkill for the most basic authentication method - email and password authentication - and I also found it too cumbersome to work with when implementing custom login forms.

This templates uses a custom JWT auth flow which sends a cookie as response header to the client. This cookie is then verified inside `middleware.route.ts` for every requests, be it API or page request. This approach simplifies front-end auth verification a lot, and avoids `useSession` check on every single page.

#### Developer Experience

Joy UI is basically MUI's Material UI but looking much better. Robust, powerful and beautiful UI components out-of-the box.

Why not Chakra UI?
In terms of DX, Chakra UI is almost as good. However, I really don't like that Framer Motion is a required dependency which results in much larger bundle size.

Why not Tailwind CSS?
While Tailwind is much better that CSS-in-JS in terms of rendering performance and bundle size, it is basicaly just CSS, not a UI framework. Adding custom logic to make the components interactive would take weeks/months and will result in plenty UI of bugs.
