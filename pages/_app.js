import "tailwindcss/tailwind.css";
import Head from "next/head";
import { useEffect } from "react";
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // service worker runs all the time in a REACT app(even if page is closeds)
      // service worker is leveraged to convert a web app in to a fully functional pwa apps
      // registering service worker
      // window.addEventListener('load', () => {
      navigator.serviceWorker
        .register("./serviceworker.js")
        .then((reg) => {
          console.log("Success:", reg.scope);
        })
        .catch((err) => {
          console.log("Failure:", err.message);
        });
      //  })
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        <meta
          name="keywords"
          content="Educational Social Network Signup today and get your free personal appointment app with integrated web conferencing. Host your online sessions and events on uvsity.com! "
        />
        {/* Social Sharing Meta Tags */}
        <meta property="og:site_name" content="uvsity.com: Log In or Sign Up" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.uvsity-next.com/" />
        <meta
          property="og:title"
          content="uvsity.com: Educational Social Network"
        />
        <meta
          property="og:image"
          content="/favicon.ico"
        />
        <meta
          property="og:description"
          content="Signup today and get your free personal appointment app with integrated web conferencing. Host your online sessions and events on uvsity.com!"
        />
        {/* PWA App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
