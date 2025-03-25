import { useAppKitAccount, useAppKitNetworkCore, useAppKitProvider } from '@reown/appkit/react';
import { JsonRpcSigner } from 'ethers';
import { Eip1193Provider } from 'ethers';
import { BrowserProvider } from 'ethers';
import { useEffect, useState } from 'react';

export const useProvider = () => {
  const { chainId } = useAppKitNetworkCore();
  const { address } = useAppKitAccount();
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155');

  useEffect(() => {
    if (!address) return;
    const loadProvider = async () => {
      const provider = new BrowserProvider(walletProvider, chainId);
      setProvider(provider);
      const signer = await provider.getSigner();
      setSigner(signer);
    };
    void loadProvider();
  }, [address, walletProvider, chainId]);
  return { provider, signer, address };
};
