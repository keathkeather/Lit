
import React from 'react';
import Header from '../Home/Header';

interface SubscriptionScreenProps {}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = () => {
  return (
    <div className="flex flex-col h-screen bg-bgc1">
      <Header/>
      <div className="flex-grow mt-32 ml-36"> {/* Add margin-top (mt-4) to push h1 below Header */}
        <h1 className="text-white text-2xl font-bold">Your Subscriptions</h1>
      

      </div>
    </div>
  );
};

export default SubscriptionScreen;