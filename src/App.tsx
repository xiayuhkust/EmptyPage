import { ConnectionProvider } from './providers/ConnectionProvider';
import { WalletConnectButton } from './components/WalletConnect';

function App() {
  return (
    <ConnectionProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">EmptyPage</h1>
        <WalletConnectButton />
      </div>
    </ConnectionProvider>
  );
}

export default App;
