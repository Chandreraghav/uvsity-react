import React from "react";
import Head from "next/head";
function CommonMetaInfo(props) {
  return (
    <Head>
     <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <link rel="stylesheet" href="/styles/external/animate.min.css" />
      <meta name="keywords" content={process.env.NEXT_PUBLIC_APP_KEYWORDS} />
      {/* Social Sharing Meta Tags */}
      <meta
        property="og:site_name"
        content={process.env.NEXT_PUBLIC_APP_OG_NAME}
      />
      <meta property="og:type" content={process.env.NEXT_PUBLIC_APP_OG_TYPE} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_HOME_URL} />
      <meta
        property="og:title"
        content={
          props?.options?.title
            ? props.options.title
            : process.env.NEXT_PUBLIC_APP_OG_TITLE
        }
      />

      <meta
        property="og:image"
        content={
          props?.options?.poster
            ? props.options.poster
            : process.env.NEXT_PUBLIC_APP_POSTER_IMAGE
        }
      />

      <meta
        property="og:description"
        content={
          props?.options?.desc
            ? props.options.desc
            : process.env.NEXT_PUBLIC_APP_DESC
        }
      />
      {/* PWA App Manifest */}
      <link rel="manifest" href={process.env.NEXT_PUBLIC_APP_MANIFEST_PATH} />
      <link rel="icon" href={process.env.NEXT_PUBLIC_APP_FAVICON_PATH} />
      <link
        rel="apple-touch-icon"
        href={process.env.NEXT_PUBLIC_APP_FAVICON_PATH}
      ></link>
      <meta
        name="theme-color"
        content={process.env.NEXT_PUBLIC_APP_THEME_COLOR}
      />
      <meta
        name="google-signin-client_id"
        content={process.env.NEXT_PUBLIC_GOOGLE_ID}
      />
      <title>
        {props?.options?.title
          ? props.options.title
          : process.env.NEXT_PUBLIC_APP_OG_TITLE}
      </title>
      <noscript>You need to enable JavaScript to run this app.</noscript>
    </Head>
  );
}

export default CommonMetaInfo;
