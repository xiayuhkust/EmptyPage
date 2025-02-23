import { useConnect } from '../providers/ConnectionProvider';
import { useAccount, useDisconnect } from 'wagmi';

export function WalletConnectButton() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const metamaskConnector = connectors.find(c => c.name === 'MetaMask');

  if (!metamaskConnector) {
    return <button className="px-4 py-2 bg-red-500 text-white rounded" disabled>
      MetaMask not available
    </button>;
  }

  if (address) {
    return (
      <button 
        onClick={() => disconnect()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: metamaskConnector })}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Connect MetaMask
    </button>
  );
}
