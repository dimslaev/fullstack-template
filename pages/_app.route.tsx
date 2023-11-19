import { AppProps } from "next/app";
import React, { createContext } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import "@fontsource/inter";

export const GlobalContext = createContext<object>({});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{}}>
        <Head>
          <title>DS Fullstack</title>
        </Head>
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          <Component {...pageProps} />
        </CssVarsProvider>
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
