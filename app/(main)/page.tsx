import Link from "next/link";
import Hero from "../../components/Home/hero";
import HeroShop from "../../components/Home/heroShop";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <Hero />
      <HeroShop />
    </div>
  );
}
