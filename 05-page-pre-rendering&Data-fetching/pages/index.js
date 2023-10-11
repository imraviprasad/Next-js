/** @format */
import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      // this will redirect the page to the destination we enter
      redirect: {
        destination: "./no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      // if this is true it will render the 404 not found page
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    // Incremental static generation
    // value need to be entered in seconds
    revalidate: 10,
  };
}

export default HomePage;
