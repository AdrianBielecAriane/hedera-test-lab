import { useAppKit } from '@reown/appkit/react';

export const Connect = () => {
  const { open } = useAppKit();

  return (
    <div>
      <h1>You are not logged in</h1>
      <button type="button" onClick={() => open()}>
        Open modal to log in
      </button>
    </div>
  );
};
