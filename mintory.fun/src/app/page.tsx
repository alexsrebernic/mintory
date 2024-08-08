import { DisplayCard } from "@/components/DisplayCard/DisplayCard";
import Hero from "@/components/Hero/Hero";
import Latest from "@/components/Latest/Latest";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero />
    {/* <DisplayCard href="/sample.jpeg" chain="base" name="Test NFT" price="2ETH" creator="Nakamoto" collection="Limited Edition"/> */}
    <Latest />
    </>
  );
}
