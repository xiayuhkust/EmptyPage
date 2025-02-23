import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

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
    <button
      onClick={() => connect()}
      disabled={isLoading}
      className={`px-4 py-2 ${
        isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white rounded transition-colors`}
    >
      {isLoading ? 'Connecting...' : 'Connect MetaMask'}
    </button>
  );
}
