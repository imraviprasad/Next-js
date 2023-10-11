/** @format */
import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    //Add your image later
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src={""} alt="An image showing ravi" width={300} height={300} />
      </div>
      <h1>Hi, I'm Ravi</h1>
      <p>
        I blog about web development - especially frontend frameworks like React
        or Next.
      </p>
    </section>
  );
}

export default Hero;
