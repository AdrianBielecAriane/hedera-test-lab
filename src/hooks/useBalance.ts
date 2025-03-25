import { useAppKitAccount, useAppKitNetworkCore, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, formatEther } from 'ethers';
import { Eip1193Provider } from 'ethers';
import { useEffect, useState } from 'react';

export const useBalance = () => {
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Eip1193Provider>('eip155');
  const { chainId } = useAppKitNetworkCore();
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    if (!address) return;
    const fetchBalance = async () => {
      const provider = new BrowserProvider(walletProvider, chainId);
      const balance = await provider.getBalance(address);
      const eth = formatEther(balance);
      setBalance(eth);
    };
    void fetchBalance();
  }, [address, chainId, walletProvider]);
  return { balance: balance.length > 0 ? balance : '0' };
};
