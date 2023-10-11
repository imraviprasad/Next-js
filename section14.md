<!-- @format -->

# What is NextJs ?

- It is a React framework for production
- It adds a lot of features in react app without any third party libraries

# NextJS-Key Features and Benefits

1. Built in server side rendering

- Server side rendering is all about preparing the content of a page on the server instead of on the client.

- In a standard react app, if you inspect the source code of a laoded page, it will be pretty empty with only basic html skeleton(bad for seo in certain cases), and the redering will be done by react.Since react is a client side library, rendering happens on client. (in this case search engine crawlers cannot see the page content)

- But in next js, the page user going to visit will be pre rendered on the server and the finished page will be served to the client and the search engine crawlers and thats the problem server-side rendering solves (next js pre renders by default).

- If we view the source code of next js page, it will be populated with actual context that is shown on the page

2. File-based Routing

- Built-in routing with files and folders without any coding need to be done.

- The pages folder in the root directory acts as the main page.

3. Fullstack Capabilities

- we can add backend code to the project by adding api folder inside the pages folder, file created inside the api folder will act as a endpoint and we can also use node js inside the file.

- Easily add backend (server-side) code to you Next/react apps

- Storing data, getting data, authntication etc. can be added to your react projects

# \_app.js file

1. It acts as a root component NextJS will render.

# How next js Page pre-renders actually works

```js
function HomePage() {
  const[(data, setData)] = useState();

  useEffect(() => {
    //send a http request and fetch data
    setData("http data");
  }, []);

  return <Component props={data} />;
}

export default HomePage
```

In the above example, when home page mounts and then the useffect will run fetch data and then component prop will get data. In this situation the server side will not render the data state, so the source code will not have the props data. (bad for seo in some cases)

To pre render page with that data state, nextjs offers two solutions

- Static Generation
- Server-side Rendering

1. static Generation

```js
function HomePage(props) {
  //props we got from getStaticProps()
  return <Component props={props.data} />;
}

//static generation
export function getStaticProps(context) {
  // react hook cannot be used here, so to get the dynamic id ,you can use the context prop to get it
  const paramId = context.params.id;
  // fetch data from an api
  return {
    props: {
      data: "fetched data",
    },
    // it will revalidate data in the server for the time(in seconds) we mentioned here.
    revalidate: 10,
  };
}

export default HomePage;
```

- The code inside the getStaticProps() will be executed during the build process and not in the client or server side.
- we can do whatever we want in the getStaticProps(), even we can import file system here
- After getStaticProps executed only HomePage component will execute.

## Using Dynamic path param in getStaticProps() and getStaticPaths()

To use param id, you need to use getStaticPaths() along with getStaticProps()

```js
function HomePage(props) {
  //props we got from getStaticProps()
  return <Component props={props.data} />;
}

//static generation
export function getStaticProps(context) {
  // react hook cannot be used here, so to get the dynamic id ,you can use the context prop to get it
  const paramId = context.params.id;
  // fetch data from an api
  return {
    props: {
      data: "fetched data",
    },
    revalidate: 10,
  };
}

// to use params in getStaticProps() you need to import getStaticPaths()
export function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export default HomePage;
```

- if the fallback key is set to false, only the mentioned id can be accesed in url, if a id not assigned here entered in url page will be navigated to 404 page,
- if the fallback is set to true, next js will try to generate a page for this meetup id dynamically on the server for the incomming request.
- fallback feature allows you to pregenerate some of your pags for specific id values

2. Server-side rendering

If we want to revalidate the page on every incoming http request ssr will be the suitable solution.

(Note: If the http data changes multiple times in a second or you need access to response object then only you need to use getServerSideProps() otherwise using getStaticProps() will be a better option)

```js
function HomePage(props) {
  //props we got from getStaProps()
  return <Component props={props.data} />;
}

//static generation
export function getServerSideProps(context) {
  // we have access to response object inside context of getServerSideProps
  const req = context.req;
  const res = context.res;

  // fetch data from an api
  return {
    props: {
      data: "fetched data",
    },
  };
}

export default HomePage;
```

- This getServerSideProps() will not run during the build process, but instead always on the server after deployment.

- We can use credential in getServerSideProps() because it only runs on the server.

- It generate the page on every request, but that can be a disadvantage because that means you need to wait for your page to be generated on every incoming request. it may change multiple times every seconds.

- if you dont need access to request object, lets say for authentication, getStaticProps is actually better
