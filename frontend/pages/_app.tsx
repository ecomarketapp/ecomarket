import React, { useMemo } from 'react';
import '../styles/globals.css';
import type { WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import {
  WalletDisconnectedError,
  WalletNotFoundError,
} from '@tronweb3/tronwallet-abstract-adapter';
// @ts-ignore
import { toast } from 'react-hot-toast';
// import { SnackbarProvider } from "notistack";
// import { ApolloProvider } from '@apollo/client';
// import client from '@/apollo-client';
import { AppProps } from 'next/app';
import { CustomThemeProvider } from '@/contexts/userTheme';
import { Provider } from 'react-redux';
// import store from "@/state/index"
import store from '@/state/store';

import {
  TronLinkAdapter,
  WalletConnectAdapter,
} from '@tronweb3/tronwallet-adapters';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';

// import AppUpdater from "@/state/app/updater"
// import { QueryClientProvider, QueryClient } from 'react-query';

// function Updaters() {
//   return (
//     <>
//       <AppUpdater />
//     </>
//   )
// }

// const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any): React.ReactElement {
  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      toast.error(e.message);
    } else if (e instanceof WalletDisconnectedError) {
      toast.error(e.message);
    } else toast.error(e.message);
  }
  const adapters = useMemo(function () {
    const tronLink1 = new TronLinkAdapter();
    const ledger = new LedgerAdapter({
      accountNumber: 2,
    });
    const walletConnect1 = new WalletConnectAdapter({
      network: 'Nile',
      options: {
        relayUrl: 'wss://relay.walletconnect.com',
        // example WC app project ID
        projectId: '5fc507d8fc7ae913fff0b8071c7df231',
        metadata: {
          name: 'Test DApp',
          description: 'JustLend WalletConnect',
          url: 'https://your-dapp-url.org/',
          icons: ['https://your-dapp-url.org/mainLogo.svg'],
        },
      },
    });
    return [tronLink1, walletConnect1, ledger];
  }, []);

  return (
    <Provider store={store}>
      {/* <QueryClientProvider client={queryClient}> */}
        {/* <CustomThemeProvider>
        
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          > */}

        {/* <Updaters/> */}
        {/* <ApolloProvider client={client}> */}
          <WalletProvider onError={onError} adapters={adapters}>
            <WalletModalProvider>
              <div suppressHydrationWarning>
                {typeof window === 'undefined' ? null : (
                  <Component {...pageProps} />
                )}
              </div>{' '}
            </WalletModalProvider>
          </WalletProvider>
        {/* </ApolloProvider> */}
        {/* </SnackbarProvider>
      </CustomThemeProvider> */}
      {/* </QueryClientProvider> */}
    </Provider>
  );
}

export default MyApp;
