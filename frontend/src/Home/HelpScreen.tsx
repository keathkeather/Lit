import React, { useEffect, useState } from 'react';
import Header from './Header'
import Accordion from './Accordion';
import { useAccount } from './AccountContext';



const HelpScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {account} = useAccount();
  const [feedbackText, setFeedbackText] = useState('');
  const [reportText, setReportText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPModalVisible, setPModalVisible] = useState(false);
  const [isFModalVisible, setFModalVisible] = useState(false);
  const [isSModalVisible, setSModalVisible] = useState(false);
  const [reportError, setReportError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const allModalVisible = isModalVisible || isPModalVisible || isFModalVisible || isSModalVisible;
  
  useEffect(() => {
    if(account){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [account]);
 

  const faqData = [
    { question: '01\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0How are the stories gamefied?', answer: 'Our stories are gamified using the Monogatari visual novel engine. This engine allows us to create interactive and engaging narratives, providing users with choices that impact the storyline. Readers can make decisions at key points in the story, shaping their unique experience. With Monogatari, we bring a dynamic and immersive storytelling experience to our users, making literature an interactive adventure.' },
    { question: '02\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Who is the founder of Lit?', answer: 'Lit was founded by a talented group of individuals known as 01K. The team is led by Keath Ian Lavador, who worked alongside members Rynze RJ Ferrer Lozano, Shania Canoy, and Rustico John Ylaya. Together, they collaborated on Lit as the final project in their first semester as third-year college students at Cebu Institute of Technology - University, bringing their collective skills and passion for literature to create a platform that offers a unique and enjoyable reading experience.' },
    { question: '03\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0What are your subscription plans?', answer: 'Lit offers two subscription plans: the Standard Plan and the Premium Plan. The Standard Plan is free and includes the ability to read one book per month while earning up to 5 achievements. On the other hand, the Premium Plan provides unlimited access to our extensive library, allowing users to read unlimited books and earn an unlimited number of achievements. For more details on our subscription plans, please visit our Pricing page for more information.' },
    { question: '04\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Does this include folklore stories in the Philippines?', answer: 'Absolutely! Folklore is a distinct and captivating genre within Lit. We take pride in offering a collection of stories that delve into the rich and enchanting world of Philippine folklore. Readers can explore tales inspired by local myths, legends, and traditions, providing a unique and culturally immersive reading experience. Discover the magic and wonder of Philippine folklore right here on Lit!' },
  ];

  const handleSendFeedback = async () => {
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
      feedback: feedbackText,
    };
  
    try {
      const response = await fetch('http://localhost:8080/feedback/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        setFeedbackText('');
        const data = await response.json();
        console.log('Feedback created successfully:', data);
      } else {
        console.error('Error creating feedback:', response.statusText);
        alert('An error occurred while sending feedback.');
      }
    } catch (error) {
      console.error('Error creating feedback:', error);
      alert('An error occurred while sending feedback.');
    }
  };  

  const handleSendReport = async () => {
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
      report: reportText,
    };
  
    try {
      const response = await fetch('http://localhost:8080/report/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        setReportText('');
        const data = await response.json();
        console.log('Report created successfully:', data);
      } else {
        console.error('Error creating feedback:', response.statusText);
        alert('An error occurred while sending report.');
      }
    } catch (error) {
      console.error('Error creating feedback:', error);
      alert('An error occurred while sending report.');
    }
  };  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    const modal1 = document.getElementById('popup-modal');
    setReportError('');
    setFeedbackError('');
    if(isPModalVisible === true){
      togglePModal();
    }
    if(isFModalVisible === true){
      toggleFModal();
    }
    if(isSModalVisible === true){
      toggleSModal();
    }
    if (modal1) {
      modal1.classList.toggle('hidden');
    }
  };  

  const togglePModal = () => {
    setPModalVisible(!isPModalVisible);
    const modal = document.getElementById('popup-pmodal');
    if (modal) {
      modal.classList.toggle('hidden');
    }
  };  

  const toggleFModal = () => {
    setFModalVisible(!isFModalVisible);
    const modal = document.getElementById('popup-fmodal');
    if (modal) {
      modal.classList.toggle('hidden');
    }
  };  

  const toggleSModal = () => {
    setSModalVisible(!isSModalVisible);
    const modal = document.getElementById('popup-smodal');
    if(isPModalVisible === true){
      togglePModal();
    }
    if(isFModalVisible === true){
      toggleFModal();
    }
    if (modal) {
      modal.classList.toggle('hidden');
    }
  };   

  return (
    <div className={`overflow-y-auto ${allModalVisible ? 'modal-open' : ''}`}>

        <Header/>

        {allModalVisible && <div className="help-overlay"></div>}

        <style>
          {`
            .help-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 10;
            }

            .help-modal {
              position: fixed;
              right: 1%;
              bottom: 2%;
              z-index: 11;
            }

            .help-modal-open {
              overflow: hidden;
            }
          `}
        </style>
        <div className="flex flex-col items-center justify-center mt-16">
            
          <div className="relative">
            <img src="/litimg/help.png" alt="Help" className="w-screen h-full" />
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="mb-14 ml-40">
                  <div className="text-white font-semibold text-2xl">Welcome to Lit Help Center</div>
                  <div className="text-white font-bold text-5xl mt-2">What can we help you with today?</div>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-10">
            <div className="text-dblue text-4xl font-bold absolute left-56">Frequently Asked Questions</div>
          </div>

          <div className="mt-14"
               style={{width: '900px'}}>
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          <div className="mt-20 mb-20">
            <button onClick={toggleModal}>
              <img src="/litimg/feedbackbtn.svg" alt="feedbackbtn" className="w-80" />
            </button>
          </div>

          <div
            id="popup-modal"
            className={`help-modal ${isModalVisible ? '' : 'hidden'}`}
          >
            <div className="w-full max-w-md max-h-full">
              <div className="relative bg-white border border-white rounded-lg">
                <div className="text-bgc1 font-bold text-lg text-center mt-3 mb-2">Leave your feedback!</div>
                <button type="button" onClick={toggleModal} className="absolute top-3 right-3">
                  <img src="/litimg/x.png" alt="feedbacksbtn" className="w-7" />
                </button>
                <div className="p-4 md:p-5 text-center">
                  <div className="flex flex-row mb-6">
                    <button className="mr-3" onClick={() => { toggleModal(); togglePModal(); }}>
                      <img src="/litimg/problemsbtn.svg" alt="feedbacksbtn" className="w-30" />
                    </button>
                    <button onClick={() => { toggleModal(); toggleFModal(); }}>
                      <img src="/litimg/feedbacksbtn.svg" alt="problemsbtn" className="w-30" />
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="popup-pmodal"
            className={`help-modal ${isPModalVisible ? '' : 'hidden'}`}
          >
            <div className="w-full max-w-md max-h-full">
              <div className="relative bg-white border border-white rounded-lg flex flex-col items-center"
                   style={{ width: '350px'}}>
                <button type="button" onClick={() => { toggleModal(); }} className="absolute top-3 left-3">
                  <img src="/litimg/back.png" alt="backbtn" className="w-7" />
                </button>
                <div className="flex flex-row items-center mt-3">
                  <img src="/litimg/bug.png" alt="feedbackbtn" className="mr-2 w-5 h-full" />
                  <div className="text-bgc1 font-bold text-lg">Report a Bug</div>
                </div>
                <button type="button" onClick={togglePModal} className="absolute top-3 right-3">
                  <img src="/litimg/x.png" alt="xbtn" className="w-7" />
                </button>
                <div className="p-4 md:p-5 mb-5 text-center">
                  <div className="flex flex-col"
                       style={{ width: '320px'}}>
                    <textarea
                      placeholder={`Type your report here...`}
                      value={reportText}
                      style={{ height: '80px'}}
                      className="border rounded-md py-2 px-2 mb-2 text-sm"
                      onChange={(e) => {
                        setReportText(e.target.value);
                        setReportError('');
                      }}
                    />
                    <button
                      onClick={() => {
                        if (!reportText.trim()) {
                          setReportError('Please provide report before sending.');
                          return;
                        }
                        handleSendReport();
                        toggleSModal();
                      }}
                      type="button"
                      className="px-5 py-2 rounded bg-bgc1 text-white font-semibold cursor-pointer text-sm"
                    >
                      Send feedback
                    </button>
                    {reportError && (
                      <div className="text-sm mt-2" style={{color: '#EE0000'}}>{reportError}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="popup-fmodal"
            className={`help-modal ${isFModalVisible ? '' : 'hidden'}`}
          >
            <div className="w-full max-w-md max-h-full">
              <div className="relative bg-white border border-white rounded-lg flex flex-col items-center"
                   style={{ width: '350px'}}>
                <button type="button" onClick={() => { toggleModal(); }} className="absolute top-3 left-3">
                  <img src="/litimg/back.png" alt="backbtn" className="w-7" />
                </button>
                <div className="flex flex-row items-center mt-3">
                  <img src="/litimg/idea.png" alt="feedbackbtn" className="mr-2 w-5 h-full" />
                  <div className="text-bgc1 font-bold text-lg">Feedback</div>
                </div>
                <button type="button" onClick={toggleFModal} className="absolute top-3 right-3">
                  <img src="/litimg/x.png" alt="xbtn" className="w-7" />
                </button>
                <div className="p-4 md:p-5 mb-5 text-center">
                  <div className="flex flex-col"
                       style={{ width: '320px'}}>
                    <textarea
                      placeholder={`Type your feedback here...`}
                      value={feedbackText}
                      style={{ height: '80px'}}
                      className="border rounded-md py-2 px-2 mb-2 text-sm"
                      onChange={(e) => {
                        setFeedbackText(e.target.value);
                        setFeedbackError('');
                      }}
                    />
                    <button
                      onClick={() => {
                        if (!feedbackText.trim()) {
                          setFeedbackError('Please provide feedback before sending.');
                          return;
                        }
                        handleSendFeedback();
                        toggleSModal();
                      }}
                      type="button"
                      className="px-5 py-2 rounded bg-bgc1 text-white font-semibold cursor-pointer text-sm"
                    >
                      Send feedback
                    </button>
                    {feedbackError && (
                      <div className="text-sm mt-2" style={{color: '#EE0000'}}>{feedbackError}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="popup-smodal"
            className={`help-modal ${isSModalVisible ? '' : 'hidden'}`}
          >
            <div className="w-full max-w-md max-h-full">
              <div className="relative bg-white border border-white rounded-lg flex flex-col items-center"
                   style={{ width: '350px' }}>
                <button type="button" onClick={toggleSModal} className="absolute top-3 right-3">
                  <img src="/litimg/x.png" alt="feedbacksbtn" className="w-7" />
                </button>
                <div className="p-4 md:p-5 mb-5 text-center">
                  <div className="flex flex-col items-center">
                    <img src="/litimg/success.png" alt="Success" className="w-11 mt-5 mb-3 h-full" />
                    <div className="text-black font-semibold text-lg mb-6">We appreciate the feedback!</div>
                    <button onClick={() => { toggleModal(); }}        
                            type="button"
                            className="px-5 py-2 rounded bg-bgc1 text-white font-semibold cursor-pointer text-sm">
                      Send another feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
};

export default HelpScreen;