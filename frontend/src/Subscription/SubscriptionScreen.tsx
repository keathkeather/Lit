import React from 'react';
import Header from '../Home/Header';

interface SubscriptionScreenProps {}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = () => {
  return (
    <div className="flex flex-col h-screen bg-bgc1">
      <Header/>
      <div className="flex-grow mt-32 ml-36">
        <h1 className="text-white text-3xl font-bold">Your Subscriptions</h1>
        <h2 className="mt-8 text-white text-xl font-normal">These are your current subscription. They will be billed on the same 
        billing cycle. You can update any subscription at any time.</h2>

        <div className="mt-5 mr-32">
          <img src="litimg/subscriptionimg.png" alt="Land 2" className="w-1200 h-532" />
        </div>

        <div className="flex">
          <div className="w-100 h-100 mt-8 pl-8 pr-12 pt-[15px] pb-[25px] bg-white bg-opacity-50 rounded-xl flex-col justify-start items-start gap-[11px] inline-flex">
            <div className="text-center text-white text-2xl font-bold leading-[56.03px]">Your Subscriptions</div>
            <div className="text-white text-xl font-semibold leading-relaxed">Your subscriptions will automatically renew on <br/>
            December 30, 2023, and you’ll be charged<br/>₱ 50.00.</div>  
          </div>

          <div className="mt-8 mr-32 ml-[10rem]">
            <img src="litimg/buypremnow.png" alt="Land 2" className="w-[30rem]" />
          </div>
        </div>


      </div>
    </div>
  );
};

export default SubscriptionScreen;