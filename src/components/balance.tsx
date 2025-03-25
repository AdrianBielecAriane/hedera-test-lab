import { useBalance } from '../hooks/useBalance';

export const Balance = () => {
  const { balance } = useBalance();
  return <p>Your balance is: {Number(balance).toFixed(2)}Hbars</p>;
};
