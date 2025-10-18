"use client";

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Provider } from 'react-redux';
import { store } from '@/store';

function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </ReactQueryProvider>
    </Provider>
  )
}