import React from 'react';
import Header from './Header';

interface FeaturesScreenProps {}

const FeaturesScreen: React.FC<FeaturesScreenProps> = () => {

  return (
    <div className="relative overflow-y-auto">
    <style>
      {`
        body {
          background-color: #0C2647;
        }
      `}
    </style>
       <Header/>

        <div className=" mt-16 p-4 text-center">
      {/* Add your headings here */}
      <h1 className="text-5xl font-bold mt-20 text-white">Gamify Your Filipino Literature Journey</h1>

      {/* The rest of your content goes here */}

       {/* Rows and Columns */}
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-20">
    {/* Column 1 */}
    <div className="text-center">
        {/* Image */}
    <div className="flex items-center justify-center -mb-3">
        <img src="litimg/learn1.png" alt="learn" className="w-44 h-44" />
    </div>

      {/* Text */}
        <div>
            <h2 className="text-3xl text-white font-semibold mb-10">Learn with<br />Interactivity</h2>
            <p className="text-white leading-8">Immerse yourself in captivating visual<br />novels on Lit for a fun way to enhance<br />reading comprehension effortlessly.</p>
        </div>
    </div>

    {/* Column 2 */}
    <div className="text-center">
    <div className="flex items-center justify-center -mb-8">
        <img src="litimg/learn2.png" alt="learn" className="w-48 h-48" />
    </div>
    
        <div>
            <h2 className="text-3xl text-white font-semibold mb-10">List Your Favorite<br/>Books</h2>
            <p className="text-white leading-8">Explore narratives on Lit that go<br/>beyond entertainment, fostering<br/>personal growth through diverse<br/>stories and character journeys.</p>
        </div>
    </div>

    {/* Column 3 */}
    <div className="text-center">
        <div className="flex items-center justify-center mb-4">
            <img src="litimg/learn3.png" alt="learn" className="w-36 h-36" />
            </div>
    
                <div>
                    <h2 className="text-3xl text-white font-semibold mb-10">Earn Rewards for<br/>Your Hardwork</h2>
                    <p className="text-white leading-8 mb-30">Transform your literature journey with<br/>Lit's gamified learning, making reading<br/>both informative and enjoyable for<br/>personal development.</p>
                </div>
            </div>
        </div>
    </div>

    {/* Fixed bottom image */}
      <img id="bottomImage" src="litimg/bgfeatures.png" alt="Description" className="w-screen h-[350px] object-cover" />

</div>
);
};

export default FeaturesScreen;