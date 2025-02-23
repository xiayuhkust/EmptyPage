import { ConnectionProvider } from './providers/ConnectionProvider';
import { WalletConnectButton } from './components/WalletConnect';

function App() {
  return (
    <ConnectionProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <WalletConnectButton />
      </div>
    </ConnectionProvider>
  );
}

export default App;
