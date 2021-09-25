import React from "react";
import Head from "next/head";
import {
  APP_OG_NAME,
  APP_OG_TYPE,
  APP_OG_TITLE,
  APP_DESC,
  APP_IMAGE,
  APP_HOME_URL,
  APP_KEYWORDS,
  APP_MANIFEST_PATH,
  APP_FAVICON_PATH,
  APP_THEME_COLOR
} from "../../constants/AppConstants";
function CommonMetaInfo() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="keywords" content={APP_KEYWORDS} />
      {/* Social Sharing Meta Tags */}
      <meta property="og:site_name" content={APP_OG_NAME} />
      <meta property="og:type" content={APP_OG_TYPE} />
      <meta property="og:url" content={APP_HOME_URL} />
      <meta property="og:title" content={APP_OG_TITLE} />
      <meta property="og:image" content={APP_IMAGE} />
      <meta property="og:description" content={APP_DESC} />
      {/* PWA App Manifest */}
      <link rel="manifest" href={APP_MANIFEST_PATH} />
      <link rel="icon" href={APP_FAVICON_PATH} />
      <link rel="apple-touch-icon" href={APP_FAVICON_PATH}></link>
      <meta name="theme-color" content={APP_THEME_COLOR} />
    </Head>
  );
}

export default CommonMetaInfo;
