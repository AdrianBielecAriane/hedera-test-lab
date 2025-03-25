import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from './form-input';
import { toast } from 'sonner';
import { useBalance } from '../hooks/useBalance';
import { parseEther } from 'ethers';
import { useProvider } from '../hooks/useProvider';

const sendHbarSchema = z.object({
  value: z.string(),
  to: z.string(),
});

export const SendHbar = () => {
  const { balance } = useBalance();
  const { signer } = useProvider();
  const methods = useForm({
    resolver: zodResolver(sendHbarSchema),
    defaultValues: {
      to: '',
      value: '',
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    if (balance < data.value) {
      toast.error('Insufficient balance');
      return;
    }

    if (!signer) return;

    try {
      const tx = await signer.sendTransaction({
        to: data.to,
        value: parseEther(data.value),
      });
      await tx.wait();
      toast.success('Success!');
    } catch {
      toast.error('Failed to send hbars');
    }
  });

  return (
    <div>
      <p>Your balance: {Number(balance).toFixed(2)}</p>
      <FormProvider {...methods}>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <FormInput label="Receiver" {...methods.register('to')} />
          <FormInput type="number" label="Amount" {...methods.register('value')} />
          <button>Send HBar</button>
        </form>
      </FormProvider>
    </div>
  );
};
