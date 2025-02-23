import { createContext, useContext, PropsWithChildren } from 'react';
import { createConfig, WagmiConfig, useConnect as useWagmiConnect } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains } from 'wagmi';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'MetaMask',
        shimDisconnect: true,
      },
    }),
  ],
});

const queryClient = new QueryClient();

type ConnectionContextType = ReturnType<typeof useWagmiConnect>;

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export function useConnect() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnect must be used within a ConnectionProvider');
  }
  return context;
}
