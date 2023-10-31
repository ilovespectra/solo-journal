import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';
import { text } from 'stream/consumers';

export const LogIn: FC = () => {
  const { publicKey } = useWallet();
  
  const isWalletConnected = !!publicKey;

  const onClick = useCallback(async () => {
    if (!isWalletConnected) {
      console.log('error', 'Wallet not connected!');
      notify({ type: 'error', message: 'Error', description: 'Wallet not connected!' });
      return;
    }

    console.log('You are connected with', publicKey?.toBase58()); // Log the user's public key
    // You can add your logic here for what to do when the wallet is connected.

  }, [isWalletConnected, publicKey]);

  return (
    <div>
      {isWalletConnected ? (
        <p><i>You are connected with {publicKey?.toBase58()}</i></p>
      ) : (
        <button
          className={`px-8 m-2 btn btn-outline btn-secondary`}
          onClick={onClick}
          disabled={!isWalletConnected}
        >
          <span>Log In</span>
        </button>
      )}
    </div>
  );
};
