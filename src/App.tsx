import './App.css';
import { useAppKitAccount } from '@reown/appkit/react';
import { Connect } from './components/connect';
import { hederaTestnet } from '@reown/appkit/networks';
import { Toaster } from 'sonner';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { env } from './env';
import { useState } from 'react';
import { Balance } from './components/balance';
import { SendHbar } from './components/send-hbar';
import { SendNFT } from './components/send-nft';
import { DeployContract } from './components/deploy-contract';

const metadata = {
  name: 'Test',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

const views = ['show-balance', 'send-hbar', 'send-nft', 'deploy-contract'] as const;
type View = (typeof views)[number];

const isView = (value: string): value is View => views.some((view) => view === value);

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [hederaTestnet],
  metadata,
  projectId: env.VITE_REOWN_PROJECT_ID,
});

function App() {
  const { isConnected } = useAppKitAccount();
  const [view, setView] = useState<View>('show-balance');

  if (!isConnected) {
    return <Connect />;
  }

  return (
    <div>
      <Toaster richColors />
      <select
        style={{ width: '100%', padding: '4px', marginBottom: '16px' }}
        onChange={(e) => {
          if (isView(e.target.value)) {
            setView(e.target.value);
          }
        }}
      >
        <option value="show-balance">Show Balance</option>
        <option value="send-hbar">Send hbar</option>
        <option value="send-nft">Send NFT</option>
        <option value="deploy-contract">Deploy contract</option>
      </select>
      {view === 'show-balance' && <Balance />}
      {view === 'send-hbar' && <SendHbar />}
      {view === 'send-nft' && <SendNFT />}
      {view === 'deploy-contract' && <DeployContract />}
    </div>
  );
}

export default App;
