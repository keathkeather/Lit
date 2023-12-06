import React, { useEffect, useState } from 'react';
import Header from './Header'
import { useAccount } from './AccountContext';

const BeAnAuthorScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {account} = useAccount();

  useEffect(() => {
    if(account){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">

        <img id="bottomImage" src="/litimg/BEAbg.png" alt="bottom bg" 
            className="fixed bottom-0 left-0 w-full z-0" />
        </div>
    </div>
  );
};

export default BeAnAuthorScreen;