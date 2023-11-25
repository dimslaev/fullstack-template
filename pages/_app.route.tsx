import { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { theme } from "@/lib/client/theme";

import "@fontsource/inter";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>DS Fullstack</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </QueryClientProvider>
  );
};

export default App;
