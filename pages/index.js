import Head from "next/head";
import Banner from "./components/Banner";
import UVSityStatsCounter from "./components/UVSityStatsCounter";
import UVSityTutorial from "./components/UVSityTutorial";
export default function Home() {
  return (
    <>
      <Head>
        <title>UVSITY | Educational Social Network</title>
      </Head>
      <Banner/>
      <UVSityTutorial/>
      {/* Trending/Popular  LiveSession Display */}
      <UVSityStatsCounter/>

      {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        UVSITY PWA APP ..with Next and tailwind
      </div> */}
    </>
  );
}
