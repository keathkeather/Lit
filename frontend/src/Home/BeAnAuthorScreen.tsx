import React, { useEffect, useState } from 'react';
import Header from './Header'
import { useAccount } from './AccountContext';

const BeAnAuthorScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {account} = useAccount();
  const [descriptionText, setDescriptionText] = useState('');
  const [portfolioText, setPorfolioText] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [portfolioError, setPortfolioError] = useState('');

  useEffect(() => {
    if(account){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);

  const handleSubmitClick = () => {
    //logic here..
  };

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col justify-center mt-16">
            <div className="mt-12 text-black text-4xl font-bold ml-32">Author Application</div>
            <div className="text-lgray text-2xl text-center">_________________________________________________________________________________________________________________________________</div>
            <div className="mt-6 ml-32">
                <div className="text-black text-xl font-semibold">About Yourself</div>
                {descriptionError && (
                    <div className="text-sm" style={{color: '#EE0000'}}>{descriptionError}</div>
                )}
                <textarea
                    placeholder={`Write a description about yourself!`}
                    value={descriptionText}
                    style={{ height: '200px', width: '800px'}}
                    className="mt-2 border rounded-md py-2 px-2 mb-2 text-sm"
                    onChange={(e) => {
                    setDescriptionText(e.target.value);
                    setDescriptionError('');
                    }}
                />
            </div>
            <div className="ml-32">
                <div className="text-black text-xl font-semibold">Link of Portfolio</div>
                {portfolioError && (
                    <div className="text-sm" style={{color: '#EE0000'}}>{portfolioError}</div>
                )}
                <textarea
                    placeholder={`johndoe.framer.website, etc..`}
                    value={portfolioText}
                    style={{ height: '40px', width: '800px'}}
                    className="mt-2 border rounded-md py-2 px-2 mb-2 text-sm"
                    onChange={(e) => {
                    setPorfolioText(e.target.value);
                    setPortfolioError('');
                    }}
                />
            </div>
            <button onClick={() => {
                let hasError = false;

                if (!descriptionText.trim()) {
                    setDescriptionError('Please provide description about yourself.');
                    hasError = true;
                } else {
                    setDescriptionError('');
                }

                if (!portfolioText.trim()) {
                    setPortfolioError('Please provide link of your portfolio.');
                    hasError = true;
                } else {
                    setPortfolioError('');
                }

                if (!hasError) {
                    handleSubmitClick();
                }
            }} className="ml-32 mt-4">
                <img src="/litimg/submitsbtn.svg" alt="submitbtn" className="w-36" />
            </button>
            <img id="bottomImage" src="/litimg/BEAbg.png" alt="bottom bg" className="fixed bottom-0 left-0 w-full z-n1" style={{ pointerEvents: 'none' }}/>
        </div>
    </div>
  );
};

export default BeAnAuthorScreen;