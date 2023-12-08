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
  const [isSModalVisible, setSModalVisible] = useState(false);
  const [isFModalVisible, setFModalVisible] = useState(false);
  const allBEAModalVisible = isSModalVisible || isFModalVisible;

  useEffect(() => {
    if(account){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);

  const handleSubmitClick = async () => {
    if(loading){
      alert('Loading...');
      return;
    }
    if(account){
      console.log(account);
    }
  
    const jsonData = {
      account: {
        accountId: account?.accountId,
      },
      request: descriptionText,
      portfolioLink: portfolioText,
    };
  
    try {
      const response = await fetch('http://localhost:8080/authorRequest/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        setDescriptionText('');
        setPorfolioText('');
        const data = await response.json();
        console.log('Request submitted successfully:', data);
        toggleSModal();
      } else {
        console.error('Error submitting request:', response.statusText);
        toggleFModal();
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toggleFModal();
    }
  };

  const toggleSModal = () => {
    setSModalVisible(!isSModalVisible);
  };

  const toggleFModal = () => {
    setFModalVisible(!isFModalVisible);
  };

  return (
    <div className="overflow-y-auto">

        <Header/>

        {allBEAModalVisible && (
            <div className="bea-overlay"></div>
        )}

        <style>
            {`
            .bea-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 10;
            }

            .bea-modal {
                position: fixed;
                top: 31%;
                left: 36%;
                z-index: 11;
            }

            .bea-modal-open {
                overflow: hidden;
            }
            `}
        </style>
        
        <div
        id="beapopup-modal"
        className={`bea-modal ${isSModalVisible ? '' : 'hidden'}`}
        >
            <div className="w-full max-w-md max-h-full"
                style={{width: '400px'}}>
                <div className="relative bg-white border border-white rounded-lg">
                    <div className="flex flex-col items-center mt-4 mb-4">
                        <img src="/litimg/beas.png" alt="Success" className="w-16 mt-6" />
                        <div className="mt-4 font-bold text-2xl" style={{color: '#27AE60'}}>SUCCESS!</div>
                        <div className="mt-4 font-semibold text-md">Your request was submitted successfully.</div>
                        <div className="mt-1 font-normal text-sm">Goodluck with your application!</div>
                        <button type="button" onClick={toggleSModal} className="mt-6 mb-4">
                            <img src="/litimg/continuebtn.svg" alt="Continue Button" className="w-48" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div
        id="beapopup-modal"
        className={`bea-modal ${isFModalVisible ? '' : 'hidden'}`}
        >
            <div className="w-full max-w-md max-h-full"
                style={{width: '400px'}}>
                <div className="relative bg-white border border-white rounded-lg">
                    <div className="flex flex-col items-center mt-4 mb-4">
                        <img src="/litimg/beaf.png" alt="Success" className="w-16 mt-6" />
                        <div className="mt-4 font-bold text-2xl" style={{color: '#F21E1E'}}>OOPS!</div>
                        <div className="mt-4 font-semibold text-md">There was an issue submitting your application.</div>
                        <div className="mt-1 font-normal text-sm">If the problem persists, contact us for assistance.</div>
                        <button type="button" onClick={toggleFModal} className="mt-6 mb-4">
                            <img src="/litimg/tryagainbtn.svg" alt="Continue Button" className="w-48" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
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