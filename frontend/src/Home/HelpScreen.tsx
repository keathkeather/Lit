import React, { useEffect, useState } from 'react';
import Header from './Header'
import { useLocation, useParams  } from 'react-router-dom';
import Accordion from './Accordion';
import axios from 'axios';

interface AccountEntity{
  accountId: number;
  email: string;
  firstName: string;
  lastname: string;
  gender: string;
}

const HelpScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<AccountEntity>();
  const location = useLocation();
  const { accountId } = useParams<{ accountId: string }>();
  const numAccountId = Number(accountId);

  useEffect(() => {
    const getUserData = async () => {
      console.log(`i am on the help page ${numAccountId}`)
      try {
        if (numAccountId !== undefined) {
          const response = await axios.get<AccountEntity>(`http://localhost:8080/account/${numAccountId}`);
          const responseAcc = response.data;
          setAccount(responseAcc);
        } else {
          console.error('accountId is undefined');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    getUserData();
  }, [numAccountId]);

  const faqData = [
    { question: '01\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0How are the stories gamefied?', answer: 'Our stories are gamified using the Monogatari visual novel engine. This engine allows us to create interactive and engaging narratives, providing users with choices that impact the storyline. Readers can make decisions at key points in the story, shaping their unique experience. With Monogatari, we bring a dynamic and immersive storytelling experience to our users, making literature an interactive adventure.' },
    { question: '02\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Who is the founder of Lit?', answer: 'Lit was founded by a talented group of individuals known as 01K. The team is led by Keath Ian Lavador, who worked alongside members Rynze RJ Ferrer Lozano, Shania Canoy, and Rustico John Ylaya. Together, they collaborated on Lit as the final project in their first semester as third-year college students at Cebu Institute of Technology - University, bringing their collective skills and passion for literature to create a platform that offers a unique and enjoyable reading experience.' },
    { question: '03\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0What are your subscription plans?', answer: 'Lit offers two subscription plans: the Standard Plan and the Premium Plan. The Standard Plan is free and includes the ability to read one book per month while earning up to 5 achievements. On the other hand, the Premium Plan provides unlimited access to our extensive library, allowing users to read unlimited books and earn an unlimited number of achievements. For more details on our subscription plans, please visit our Pricing page for more information.' },
    { question: '04\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Does this include folklore stories in the Philippines?', answer: 'Absolutely! Folklore is a distinct and captivating genre within Lit. We take pride in offering a collection of stories that delve into the rich and enchanting world of Philippine folklore. Readers can explore tales inspired by local myths, legends, and traditions, providing a unique and culturally immersive reading experience. Discover the magic and wonder of Philippine folklore right here on Lit!' },
  ];

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const openFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setFeedbackText('');
  };

  const handleSendFeedback = () => {
    // Ensure there is feedback text before sending
    if (!feedbackText) {
      alert('Please provide feedback before sending.');
      return;
    }

    // Fetch API endpoint for sending feedback
    fetch('http://localhost:8080/feedback/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: {
          accountId: accountId,
        },
        feedback: feedbackText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Feedback created successfully:', data);
        closeFeedbackForm();
        // Optionally: You can do something after successful feedback submission
      })
      .catch((error) => {
        console.error('Error creating feedback:', error);
        alert('An error occurred while sending feedback.');
      });
  };

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
          <div className="relative">
            <img src="/litimg/help.png" alt="Help" className="w-screen h-full" />
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="mb-14 ml-40">
                  <div className="text-white font-semibold text-2xl">Welcome to Lit Help Center</div>
                  <div className="text-white font-bold text-5xl mt-2">What can we help you for today?</div>
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

          <div className="fixed bottom-7 right-7">
            {showFeedbackForm && (
              <div className="feedback-form mt-20 flex flex-col items-center bg-lightg border border-dblue p-5 rounded-md">
                <h2 className="text-dblue font-semibold text-lg mb-3">Provide Feedback</h2>
                <textarea
                  placeholder={`Type your feedback here...`}
                  value={feedbackText}
                  className="border rounded-md py-2 px-2 mb-2 text-sm"
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
                <div className="flex flex-row mt-3">
                  <button onClick={handleSendFeedback} type="button"
                          className="mr-2 px-5 py-1 rounded bg-bgc1 text-white font-semibold cursor-pointer text-sm">
                    Send</button>
                  <button onClick={closeFeedbackForm} type="button"
                          className="px-3 py-1 rounded bg-bgc2 text-white font-semibold cursor-pointer text-sm">
                    Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-20 mb-20">
            <button onClick={openFeedbackForm}>
              <img src="/litimg/feedbackbtn.svg" alt="feedbackbtn" className="w-80" />
            </button>
          </div>


        </div>
    </div>
  );
};

export default HelpScreen;