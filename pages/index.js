import Head from "next/head";
import Banner from "./components/Banner";
import TrendingSessions from "./components/TrendingSessions";
import UVSityStatsCounter from "./components/UVSityStatsCounter";
import UVSityTutorialMaster from "./components/UVSityTutorialMaster";
export default function Home() {
  return (
    <>
      <Head>
        <title>UVSITY | Educational Social Network</title>
      </Head>
      <Banner />
      <UVSityTutorialMaster />

      <TrendingSessions/>
      <UVSityStatsCounter />

      {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        UVSITY PWA APP ..with Next and tailwind
      </div> */}
    </>
  );
}
