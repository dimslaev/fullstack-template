import { AppProps } from "next/app";
import React, { createContext } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

export const GlobalContext = createContext<object>({});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{}}>
        <Head>
          <title>DS Fullstack</title>
        </Head>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
