import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

interface BookScreenProps {}

const BookScreen: React.FC<BookScreenProps> = () => {
  const navigate = useNavigate();

  const handleGame = () => {
    navigate('/game');
  };

  const handleQuests = () => {
    navigate('/questlist');
  };

  return (
    <div className="overflow-y-full">
      <Header />

      <div className="ml-32 mt-[6rem]">
        <div className="flex items">
          {/* Image */}
          <img src="litimg/adarna1.png" alt="Adarna 1" className="w-[500px] h-[300px]" />

          {/* Text and Button beside the image */}
          <div className="text-black mt-6 ml-4 flex flex-col">
            <div>
              <p className="text-4xl font-bold mb-4">Ibong Adarna</p>
              <p className="text-xl text-[#5C83C4] mb-4">Isinulat ni Jose De la Cruz</p>
              <p className="text-xl text-black leading-relaxed mb-4 mr-32">Sa kaharian ng Berbanya, nagkasakit si Haring Fernando. Para sa kanyang paggaling, kinakailangang hulihin ang Ibong Adarna. Si Don Juan ang nagtagumpay sa misyon na ito, ngunit kailangang harapin ang inggit at pag-aagam-agam ng kanyang mga kapatid.</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray bg-opacity-50 rounded-full h-4 mb-4 dark:bg-gray dark:bg-opacity-50 mr-32">
              <div className="bg-dblue h-4 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full dark:bg-dblue" style={{ width: '45%' }}>45%</div>
            </div>

            <div className="">
              <button onClick={handleQuests}>
                VIEW ALL
              </button>
            </div>

            {/* Button */}
            <div className="ml-[30rem] mr-32 -mt-[17rem]">
              <button onClick={handleGame}>
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-12 lg:w-48 mr-2 lg:mr-3" />
              </button>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookScreen;
