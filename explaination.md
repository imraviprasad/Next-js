<!-- @format -->

## what is NextJS ?

The React Framework for production(A fullstack framework for reactjs)

## Why not ReactJS

It is Framework that can do many things instead of single thing, whereas react is a library.

NextJs solves common problems and makes building React apps easier

## Next JS - key Features and benefits

### 1. builtin server-side rendering

- Automatic page pre-rendering: Great for seo and initial load

- Blendering client-side and server-side: Fetch data on the server and render finished pages.

### 2. File-based Routing

- Define pages and routes with files and folders instead of code

- Less code, less work, highly understandable.

### 3. Fullstack Capabilities

- Easily add backend (server-side) code to your Next/React apps

- Storing data, getting data, authentication etc. can be added to your React projectes

(To be precise, NextJS allows us to determine when a page should be pre-rendered.)

---

## How to install NextJS

## npx create-next-app

(
Mentioned in udemy course:
npx create-next-app
what is your poject names? // type project name
would u like typescript // no
would u like eslint // no
would u like tailwind css // no
would u like src/directory // no
use app router // no
would u like customize default import alias // no
)

## npm run dev to start the server

## npm run build to built it for production to produce a optimised build

## npm run start to start a optimised server

## commond npm run dev will run the script in the package.json file

---

Course Outline

1. Basics and Foundation(introducing key features)

- File-based Routing
- PagePre-Rendering & Data Fetching
- Combining "Standard React & NextJS"
- API Routes & Fullstack capabilities

2. Advanced Concepts (Building for Production)

- Optimization, Opportuniites
- Looking Behind the scenes & Theory
- Deployment and configuration
- Authentication

3. Summaries and refreshers (Optimizing your Time)

- ReactJS Refresher
- NextJS Summary

# React Refresher (only functional components and hooks)

what is react ?

1. A client side js library
2. All about building modern, reactive user interfaces for the web

# Section 3: Pages & File-based Routing

Module content

1. Understanding File-based Routing
2. Static & Dynamic Routes
3. Navigating between pages.

### File based Routing instead of code-based routing(like in react)

- Instead: Create react components files and let Nextjs infer the routes from the folder structure.(using the pages folder)

### How file-based routing works

/pages  
 index.js --> Main starting page(my-domain.com/)
about.js --> About Page(my-domain.com/about)
/products
index.js --> All Products page(my-domain.com/products)
[id].js --> Products detail page(my-domain.com/products/1)

### Catch-All Routes

for example we create a folder name blog inside that instead of index, we create a file [...slug].js(you can name anything after 3 dots it will act as slug in nextjs), this file catches what ever comes the blog in url
my.domain.com/blog/what/ever/you/want
if you console it(router.query)
slug:[what/ever/you/want]
this is come in console

### Link component

buy clicking the link route will change

<Link  href="route you want to go">name of the link</Link>
(or)
<Link
href={{
    pathname:"/client/[id]",
    query:{id:query.id}
}}
>name of the link</Link>

- by hovering the link it will prefetch the page, to stop it you can add prefetch={false} prop to link

- you can add replace text as a prop so it will replace the current page, so the user cant go back to that page.

To change route we also have another method

route.push({
pathname: "new_page",
query: { param: value },
});

if can be added to a function, instead of clicking it will change the route progamatically.

### 404 page

if we add a 404.js file inside the pages folder, the nextjs will render the 404.js file to render the wrong route you enter

# section 4 : router project

Files and folders(example image folder) stored outside of public/ are not made accessible by nextjs - visitors can not load files from there.

# section 5 : Page Pre-Rendering & Data Fetching

### Module content

- What is "Data Fetching" Exactly?
- Static vs Server-Side Page Generation
- How to fetch Data

### The problem with traditional react apps

- in a react application , if i fetch data from a dummy backend and get a dummy data, that data will be on the screen, but when we view the page source code data is no where to be found that is fetched, we can only see it when we inspect the page, that actual dom that currently rendered, but the actual html content served by the server is the view source code and that code did that include that fetched data.

- this will cause some dis-advantages in some cases.

- for seo related pages, if we want the search engine to see the content inside for better seo, then this will be bad.(for example blog and shop websites need to have fetched data in source code for search engines to see for better seo)

## How NextJS Prepares & Pre-renders Pages

### Page pre-rendering

in the above situation, next js can help in that,
for example

1. image having some page in route /some-route, if user wants to visit that page next js will return a prerendered page and that a difference to standard react
2. In standard react we get an html file with javascript code, and then the javascript code runs and display on screen super fast.
3. But in next js, it pre-renders a page and all the html content with all the data needed. it loads that in advance and then pre-generate the finished html page, which can be sent back to the client, so to visitors. So thats god for seo.
4. we use react in that next js for handling user interaction, for eatching frum and showing validation errors, for reacting to button clicks.
5. And therefore nextjs will not just send back this pre-rendered page, but it will als send back all the javascript code that belongs to it.
6. Then it will so something, which is called hydrating the page, So it will send back that js code, and that code will then take over that pre-rendered page and again let react do it job.

## Two forms of Pre-Rendering

1. Static generation (recommended)

- all the pages are pre-generated in advance during the build time.

2. Server-side rendering

- pages are created just in time after deployment when a request reaches the server.

### static generation

- pre-generate a page (with data preapred on the server-side) during build time

- Then pages are prepared ahead to time and can be cached by the server/ CDN serving the app

export async functon getStaticProps(context){}

## NextJS pre-renders by default

-next js pre-renders any page by default

## adding get static prop to pages

(This will generate your pagr statically once during the build time)

- by using export async function getStaticProps() {} page will first render the getstaticprop function and then render the component

## Incremental static generation

- it means that you dont just generate your page staticallly once at build time, but that its continuously updated even after deployment without you re-deploying it.

### Server-side rendering

- sometimes, you need to pre-render for every request OR you need access to the request object (e.g. for cookies)

- NextJS allows you to run "real server-side code" as well.

export async function getServerSideProps(){}

### Client side data fetching (and when to use it)

1. Some data doesn't need to be pre-rendered

- Data changing with high frequency(eg.Stock data)
- Highly user-specific data (eg. last orders in an online shop)
- Partial data (eg. data that's only used on a part of an page)

2.  Pre-fetching the data for page generation might not work or be required

3.  "Traditional" client-side data fetching (eg. useEffect with fetch() is fine)

### useSWR nextjs hook (stale-while-revalidate)

### section 6 : project Time: page pre-rendering and data fetching

Module content

- Adding static site generation & server-side rendering
- When to use SWR
- Adding client-side data fetching

### secion 7 : Optimizing NextJS Apps

Module content

- Adding Meta and <head> Tag
- Re-using components, logic and configuration
- Optimizing Images

# Head from nextjs

-Head content entered in \_app.js will be set by default to all components,unless it is overwritten in that specific component.

# \_documnet.js file

-it has to be added directly in the pages folder

### section 08 : Adding Backend Code and API Routes

Module content

- What are API Routes?
- Adding & Using API Routes
- Working with Requests & Responses

# What are API Routes

- Some websiites are about more than just serving pages(eg. accept user feedback submission, newsletter signups,...)

api is special folder name
any pages inside it will treated in a special way

any code written here will not be exposed to client side webpage

### section 9 : API Routes Project

Module Content

- Add a newsletter Registration flow
- Adding a "Comments" Feature

### section 10 : Working with app wide state(react context)

Module Content

- How to use React Context in NextJS Apps

### section 11 : A Complete blog App

### section 12 : Deploying nextjs apps

1. Module content

- Different Deployment options
- Configuring & preparing the project
- Deployment in Action

2. Deployment Options

- Standard Build

  - Next build (next build command)
  - Produces optimized production bundles and a server-side app: Requires a NodeJS server
  - Pages are pre-rendered (if possible) but NodeJS server is required for API routes, server-side pages and page revalidations
  - Re-deploy needed if code changes or you don't use revalidations and need page updates.

- Full Static Build
  - next export (need to add "export":"next export" in package.json script) to run that
  - Produces 100% static app (HTML, CSS ,JS): No Node JS server required.
  - Doesn't work if your app uses API routes, server-side pages or wants to use page revalidations
  - Re-deploy needed for all code and content changes

3. Deployment Steps and Considerations

- Add page metadata, optimize code, remove unnecessary dependencies
- Use environment variables for variable data (eg. daabase credentials, API keys,..)
- Do a test build and test the production-ready app locally or on some test server(if any error found repeat the process)
- Deploy

4. The NextJS config file and working with environment variables

- add next.config.js file in the root folder
- An example of next.config.js file for that blog app in section 11

```js
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = () => {
  //env will change depending upon when its in deployment server

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: " ",
        mongodb_password: " ",
        mongodb_clustername: " ",
        mongodb_database: "my-site-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: " ",
      mongodb_password: " ",
      mongodb_clustername: " ",
      mongodb_database: "my-site",
    },
  };
};
```

To use the env above

```js
{process.env.desired file inside env object}
```

### section 13 : Authentication

1. Module content

- How does authentication work?
- Implementing sign up and login
- Controlling page access

2. How does Authentication works ?
