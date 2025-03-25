import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from './form-input';
import { toast } from 'sonner';
import { useProvider } from '../hooks/useProvider';
import { Contract } from 'ethers';

const sendNFTSchema = z.object({
  tokenAddress: z.string().min(1),
  receiver: z.string().min(1),
  tokenSerial: z.string(),
});

export const SendNFT = () => {
  const { signer, address } = useProvider();
  const methods = useForm({
    resolver: zodResolver(sendNFTSchema),
    defaultValues: {
      receiver: '',
      tokenAddress: '',
      tokenSerial: '',
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!address || !signer) {
      toast.error('Address or signer are not set');
    }
    const erc721Abi = ['function transferFrom(address _from, address _to, uint256 _tokenId) external payable'];
    const contract = new Contract(data.tokenAddress, erc721Abi, signer);
    try {
      const tx = await contract.transferFrom(address, data.receiver, Number(data.tokenSerial));
      await tx.wait();
      toast.success('Success!');
    } catch {
      toast.error('Failed to transfer token');
    }
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <FormInput label="Receiver" {...methods.register('receiver')} />
          <FormInput label="Token address" {...methods.register('tokenAddress')} />
          <FormInput type="number" label="Serial" {...methods.register('tokenSerial')} />
          <button>Send NFT</button>
        </form>
      </FormProvider>
    </div>
  );
};
