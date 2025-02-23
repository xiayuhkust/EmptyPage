import { createContext, useContext, PropsWithChildren } from 'react';
import { createConfig, WagmiProvider, useConnect as useWagmiConnect } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';

const config = createConfig({
  chains: [mainnet],
  connectors: [injected()]
});

const queryClient = new QueryClient();

const ConnectionContext = createContext<ReturnType<typeof useWagmiConnect> | undefined>(undefined);

export function ConnectionProvider({ children }: PropsWithChildren) {
  const connection = useWagmiConnect();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectionContext.Provider value={connection}>
          {children}
        </ConnectionContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useConnect() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnect must be used within a ConnectionProvider');
  }
  return context;
}
