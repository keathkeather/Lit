import React from 'react';
import Header from './Header'

interface PricingScreenProps {}

const PricingScreen: React.FC<PricingScreenProps> = () => {
  return (
    <div className="overflow-y-auto" style={{ paddingTop: '64px' }}>
      <style>
        {`
          body {
            background-color: #0C2647; /* Replace with your desired color */
          }

          header {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
     
     <Header/>

      {/* Pricing section */}
      <section className="mt-16 flex justify-center items-center h-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-center items-center">

          {/* First pricing option */}
          <div className="bg-white rounded-lg p-6 mx-4 my-4 mt-10 " style={{ height: '350px', width: '450px' }}>
            <div className="bg-bgc1 rounded-lg p-3 mx-1 my-1 flex justify-center items-center">
              <h2 className="text-2xl font-bold text-white mb-0 p-3">Standard Plan</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-bgc2 mb-0 p-3">₱ 0.00</h2>
              <h2 className="text-2xl font-bold text-bgc2 mb-0 p-3 self-end">Month</h2>
            </div>
            <div className="bg-bgc1 rounded-lg p-3 mx-1 my-1  items-center">
              <div className="mx-1 my-1 flex items-center p-3">
                <svg
                  className="text-white w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="transparent" fill="#F88125"/>
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h6 className="text-white font-bold mb-0">Read 1 book</h6>
              </div>
              <div className="mx-1 my-1 flex items-center p-3">
                <svg
                  className="text-white w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="transparent" fill="#F88125"/>
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h6 className="text-white font-bold mb-0">Earn up to 5 achievements</h6>
              </div>
              
            </div>
          </div>

          {/* Second pricing option */}
          <div className="bg-white rounded-lg p-6 mx-4 my-4 mt-10" style={{ height: '350px', width: '450px' }}>
            <div className="bg-bgc2 rounded-lg p-3 mx-1 my-1 flex justify-center items-center">
              <h2 className="text-2xl font-bold text-white mb-0 p-3">Premium Plan</h2>
            </div>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-bgc1 mb-0 p-3">₱ 50.00</h2>
              <h2 className="text-2xl font-bold text-bgc1 mb-0 p-3 self-end">Month</h2>
            </div>
            <div className="bg-bgc2 rounded-lg p-2 mx-1 my-1  items-center ">
              <div className="mx-1 my-1 flex items-center p-3">
                <svg
                  className="text-white w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="transparent" fill="#0C2647"/>
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h6 className="text-white font-bold mb-0">Read unlimited books</h6>
              </div>
              <div className="mx-1 my-1 flex items-center p-3">
                <svg
                  className="text-white w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="transparent" fill="#0C2647"/>
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h6 className="text-white font-bold mb-0">Earn unlimited achievements</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <img id="bottomImage" src="litimg/bgPricing.png" alt="City" 
      className="fixed bottom-0 left-0 w-full z-0" />
    </div>
  );
};

export default PricingScreen;
