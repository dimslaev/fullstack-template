import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import "@fontsource/inter";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>DS Fullstack</title>
      </Head>
      <CssVarsProvider defaultMode="dark">
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </QueryClientProvider>
  );
};

export default App;
