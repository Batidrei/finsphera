# Finsphera - SpaceX Mission Dashboard 🚀

A modern, responsive, and animated dashboard designed to track SpaceX launches using real-time data from the SpaceX API (v5).

[Link Vercel](https://finsphera-fomprce55-batidreis-projects.vercel.app/)
[Link GitHub](https://github.com/Batidrei/finsphera)

---

## 1. Architecture & Tech Stack

- **Next.js:** 
- **Tailwind CSS:** 
- **Motion.dev:** 

```
finsphera
├─ app
│  ├─ api
│  │  └─ spacex
│  │     └─ launches
│  │        ├─ latest
│  │        │  └─ routes.ts
│  │        ├─ launches.ts
│  │        └─ LaunchesClient.tsx
│  ├─ components
│  │  ├─ Modal.tsx
│  │  ├─ ScrollIndicator.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ ThemeProvider.tsx
│  │  └─ ThemeToggle.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  ├─ page.tsx
│  └─ types
│     └─ spacex.ts
├─ eslint.config.mjs
├─ lib
│  └─ constants.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ 404.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ tsconfig.json
```

## 2. AI Usage (Transparency):

This project was developed with the assistance of AI **(Gemini)**.

I had to rely on AI, and I used Gemini because it's the most affordable and because it's the one I already have. Since it's been a while since I've fully immersed myself in a framework, I had to rely on it mainly for Next.js and generating functions and implementations, as well as for advice on architecture and best coding practices.

## 3. Design Decisions:

Due to the short time between design and development, I had to use the structure of a design that was provided. I considered the 4x4 grid layout to be the most optimal based on the data provided by the API. Furthermore, in terms of responsiveness, it's the most efficient for changing the grid size, and Tailwind is very helpful in this regard.

I wanted to incorporate the most demonstrative feature of the API, which is displaying the emblem. I aimed to keep it as simple as possible to avoid overwhelming the user's view. By clicking on it, the user can easily access all the information.

The theme color change feature was implemented for greater visual comfort.

## 4. Challenges & Trade-offs:
The biggest challenge was using technologies that were new to me; there was a bit of a learning curve with both Next.js and Tailwind CSS, but thanks to the AI's help, this curve was less steep. Regarding Tailwind, I think it wasn't too difficult for me because I know CSS very well, and it was just a matter of adapting to its class structure.

And well, with the knowledge I have, and the support of AI, I consider that a decent job was done, which could be greatly improved in terms of possibly improving the structure, the quality of the code, and even the design. 

The following explains in detail the challenges with each technology.

### Next.js
I found many similarities with React; I had never used it before, but I didn't feel too lost even though what I did and implemented was somewhat superficial.

### Tailwind CSS
I had heard of this CSS framework but had never used it before, and I was delighted. It implements the Modular CSS methodology, and although it does add more to the HTML code, it also makes it more practical by simply injecting classes without cluttering the CSS or barely touching it at all. I was thrilled with Tailwind CSS. At first, it was complicated, but using the documentation made it much easier. After a while, it felt like I'd been using it for ages.

### Motion.dev
I was completely unfamiliar with this library; I didn't even know it existed. I tried implementing a couple of functions, and while I haven't delved deeply into the documentation, I'm very pleased with the result.

### API
Regarding the API, I had no difficulty; I used **Insomnia** to view the data provided by the API and thus be able to implement it without any problems.