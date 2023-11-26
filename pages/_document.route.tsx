import * as React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/joy/styles";

const Document = () => {
  return (
    <Html data-color-scheme="light">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
