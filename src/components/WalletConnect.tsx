import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useCallback } from 'react';

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading, error } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const handleConnect = useCallback(() => {
    try {
      connect();
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  }, [connect]);

  if (isConnected && address) {
    return (
      <button 
        onClick={() => disconnect()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`px-4 py-2 ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded transition-colors`}
      >
        {isLoading ? 'Connecting...' : 'Connect MetaMask'}
      </button>
      {error && (
        <p className="mt-2 text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
}
