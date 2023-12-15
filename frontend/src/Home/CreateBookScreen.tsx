import React, { useEffect, useState } from 'react';
import Header from './Header'
import { useAccount } from './AccountContext';

const CreateBookScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {account} = useAccount();
  const [titleText, setTitleText] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [genreText, setGenreText] = useState('');
  const [genreError, setGenreError] = useState('');
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
      bookName: titleText,
      bookDescription: descriptionText,
      genre: genreText,
    };
  
    try {
      const response = await fetch('http://localhost:8080/bookRequest/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        setTitleText('');
        setDescriptionText('');
        setGenreText('');
        const data = await response.json();
        console.log('Book request submitted successfully:', data);
        toggleSModal();
      } else {
        console.error('Error submitting book request 1:', response.statusText);
        toggleFModal();
      }
    } catch (error) {
      console.error('Error submitting book request 2:', error);
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
                        <div className="mt-4 font-semibold text-md">Your book request was submitted successfully.</div>
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
                        <div className="mt-4 font-semibold text-md">There was an issue submitting your book request.</div>
                        <div className="mt-1 font-normal text-sm">If the problem persists, contact us for assistance.</div>
                        <button type="button" onClick={toggleFModal} className="mt-6 mb-4">
                            <img src="/litimg/tryagainbtn.svg" alt="Continue Button" className="w-48" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col justify-center mt-16">
            <div className="mt-12 text-black text-4xl font-bold ml-32">Book Details</div>
            <div className="text-lgray text-2xl text-center">_________________________________________________________________________________________________________________________________</div>
            <div className="flex flex-row">
                <div className="ml-28 flex flex-col items-center">
                    <img src="/litimg/addbc.png" alt="Add Book Cover" className="w-80 ml-20 mt-10" />
                </div>
                <div className="flex flex-col items-center">
                <div className="mt-6 ml-24">
                        <div className="text-black text-xl font-semibold">Book Title</div>
                        {titleError && (
                            <div className="text-sm" style={{color: '#EE0000'}}>{titleError}</div>
                        )}
                        <textarea
                            placeholder={`Untitled Book`}
                            value={titleText}
                            style={{ height: '40px', width: '800px'}}
                            className="mt-2 border rounded-md py-2 px-2 mb-2 text-sm"
                            onChange={(e) => {
                            setTitleText(e.target.value);
                            setTitleError('');
                            }}
                        />
                    </div>
                    <div className="ml-24">
                        <div className="text-black text-xl font-semibold">Book Description</div>
                        {descriptionError && (
                            <div className="text-sm" style={{color: '#EE0000'}}>{descriptionError}</div>
                        )}
                        <textarea
                            placeholder={`Write a description about your book!`}
                            value={descriptionText}
                            style={{ height: '150px', width: '800px'}}
                            className="mt-2 border rounded-md py-2 px-2 mb-2 text-sm"
                            onChange={(e) => {
                            setDescriptionText(e.target.value);
                            setDescriptionError('');
                            }}
                        />
                    </div>
                    <div className="ml-24">
                        <div className="text-black text-xl font-semibold">Book Genre</div>
                        {genreError && (
                            <div className="text-sm" style={{color: '#EE0000'}}>{genreError}</div>
                        )}
                        <textarea
                            placeholder={`Fiction, Fable, Romance, Drama, etc...`}
                            value={genreText}
                            style={{ height: '40px', width: '800px'}}
                            className="mt-2 border rounded-md py-2 px-2 mb-2 text-sm"
                            onChange={(e) => {
                            setGenreText(e.target.value);
                            setGenreError('');
                            }}
                        />
                    </div>
                    <button onClick={() => {
                        let hasError = false;

                        if (!genreText.trim()) {
                            setGenreError('Please provide genre of your book.');
                            hasError = true;
                        } else {
                            setGenreError('');
                        }

                        if (!descriptionText.trim()) {
                            setDescriptionError('Please provide description about your book.');
                            hasError = true;
                        } else {
                            setDescriptionError('');
                        }

                        if (!titleText.trim()) {
                            setTitleError('Please provide title of your book.');
                            hasError = true;
                        } else {
                            setTitleError('');
                        }

                        if (!hasError) {
                            handleSubmitClick();
                        }
                    }} className="ml-24 mt-4">
                        <img src="/litimg/sbbtn.svg" alt="submit book btn" className="w-36" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateBookScreen;