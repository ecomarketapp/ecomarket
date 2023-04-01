import React from "react";
import '../styles/globals.css'
// import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";
import { AppProps } from "next/app";
import { CustomThemeProvider } from "@/contexts/userTheme";
import { Provider } from "react-redux"
// import store from "@/state/index"
import store from "@/state/store"

// import AppUpdater from "@/state/app/updater"
import {QueryClientProvider, QueryClient} from 'react-query'

// function Updaters() {
//   return (
//     <>
//       <AppUpdater />
//     </>
//   )
// }

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>

      
      {/* <CustomThemeProvider>
        
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          > */}

            {/* <Updaters/> */}
            <ApolloProvider client={client}>
              <div suppressHydrationWarning>
                {typeof window === "undefined" ? null : (
                  <Component {...pageProps} />
                )}
              </div>
            </ApolloProvider>
          {/* </SnackbarProvider>
      </CustomThemeProvider> */}
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
