import { FC, ReactNode, useState } from "react";
import pkg from '../../package.json';
import { Heading } from "./Heading";
import { RequestAirdrop } from "./RequestAirdrop";
import { WalletSolBalance } from "./WalletSolBalance";
import { LogIn } from "./LogIn";
import { useWallet } from '@solana/wallet-adapter-react';
import Home from './Home';
import Am from './Am';
import Pm from './Pm';
import Freewrite from "./Freewrite";
import ViewEntries from './ViewEntries'; // Import the ViewEntries component

export const Layout: FC = ({ children }) => {
  const { publicKey } = useWallet();

  // State variable to track which component to display
  const [activeComponent, setActiveComponent] = useState<'home' | 'am' | 'pm' | 'freewrite' | 'viewEntries'>('home');

  const handleComponentChange = (component: 'home' | 'am' | 'pm' | 'freewrite' | 'viewEntries') => {
    setActiveComponent(component);
  };

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        {/* <Heading>
          solo:<span className='text-sm font-normal align-top text-slate-700'></span>
        </Heading> */}
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p><i>a secret journal</i></p>
        </h4>

        <div className="text-center">
          {/* Display the buttons */}
          <button onClick={() => handleComponentChange('am')} className="group w-30 m-2 btn disabled:animate-none lowercase">Am Entry</button>
          <button onClick={() => handleComponentChange('pm')} className="group w-30 m-2 btn disabled:animate-none lowercase">Pm Entry</button>
          <button onClick={() => handleComponentChange('freewrite')} className="group w-30 m-2 btn disabled:animate-none lowercase">Freewrite</button>
          <button onClick={() => handleComponentChange('viewEntries')} className="group w-30 m-2 btn disabled:animate-none lowercase">View Entries</button>
          
          {publicKey && (
            <>
              {activeComponent === 'am' && <Am />}
              {activeComponent === 'pm' && <Pm />}
              {activeComponent === 'freewrite' && <Freewrite />}
              {activeComponent === 'viewEntries' && <ViewEntries />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
