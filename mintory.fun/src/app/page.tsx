import { DisplayCard } from "@/components/DisplayCard/DisplayCard";
import FilterBar from "@/components/FilterBar/FilterBar";
import Hero from "@/components/Hero/Hero";
import ImageTextBanner from "@/components/ImageTextBanner/ImageTextBanner";
import Latest from "@/components/Latest/Latest";
import PageSection from "@/components/PageSection/PageSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero />
    {/* <DisplayCard href="/sample.jpeg" chain="base" name="Test NFT" price="2ETH" creator="Nakamoto" collection="Limited Edition"/> */}
    <Latest />
      <FilterBar />
    <PageSection title="Top Art" />
      <ImageTextBanner title="Mintory.fun: NFTs Made Easy." buttonText="CreateNFT" imageurl="/colorfulSmileEmoticons.png" bgColor="#A7EF5A"/>
    <PageSection title="Trending" className=""/>
    <PageSection title="Recent" />

    </>
  );
}
