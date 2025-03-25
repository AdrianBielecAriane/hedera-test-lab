import { ContractFactory } from 'ethers';
import { useProvider } from '../hooks/useProvider';
import { toast } from 'sonner';
import { useState } from 'react';

const abi = [
  {
    inputs: [],
    name: 'get',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'set',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'storedValue',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const bytecode =
  '0x608060405234801561001057600080fd5b5061011e806100206000396000f3fe6080604052600436106100295760003560e01c806360fe47b11461002e5780636d4ce63c1461004c578063b3f98adc1461005e575b600080fd5b610036610076565b60405161004391906100c9565b60405180910390f35b61005461007c565b60405161006191906100c9565b60405180910390f35b610066610092565b60405161007391906100c9565b60405180910390f35b60005481565b60008054905090565b60008054905090565b6000819050919050565b6100a881610097565b82525050565b60006020820190506100c3600083018461009f565b92915050565b60008115159050919050565b600060ff8216905091905056fea2646970667358221220e5e09a9c2f0d36e6de6ee68c49a6d93f364b0bc50ff8e9a79201e55a514b1a3964736f6c63430008090033';

export const DeployContract: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const { signer } = useProvider();
  const deployContract = async () => {
    const factory = new ContractFactory(abi, bytecode, signer);

    try {
      const contract = await factory.deploy();
      setContractAddress(await contract.getAddress());
      toast.success('Contract deployed');
    } catch {
      toast.error('Failed to deploy contract');
    }
  };

  return (
    <div>
      <button type="button" onClick={deployContract}>
        Deploy contract
      </button>
      {!!contractAddress && (
        <div>
          <p>Your contract address: {contractAddress}</p>
        </div>
      )}
    </div>
  );
};
