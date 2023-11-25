'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';
// import { SessionProvider } from "next-auth/react";
import { MenuProvider } from './utils/context';
// import { DashboardMenuProvider } from './utils/dashboardContext';

export function Providers({ children }) {
  return (
    <CacheProvider>
      <MenuProvider>
        {/* <DashboardMenuProvider> */}
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        {/* </DashboardMenuProvider> */}
      </MenuProvider>
    </CacheProvider>
  );
}
