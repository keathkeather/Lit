import React from 'react';
import Header from './Header';

interface QuestListProps {}

const QuestList: React.FC<QuestListProps> = () => {

    return (
        <div className="overflow-y-auto">
          <Header />
            <div className="flex flex-col items-center justify-center mt-16">
                <div className="relative">
                <img src="litimg/QuestListHeaderbg.svg" alt="Home" className="w-screen h-full" />
                <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center"
                    style={{ width: '620px', marginRight: '100px' }}>
                    <img src="litimg/litsy.png" alt="Litsy" className="w-40 mr-4" />
                    <div className="text-white text-3xl font-semibold mt-2">Welcome! May you have a wondrous adventure to the World of Filipino Literature</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      );
  };

export default QuestList;