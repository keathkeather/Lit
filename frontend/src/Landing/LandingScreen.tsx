import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'

interface LandingScreenProps {}

const LandingScreen: React.FC<LandingScreenProps> = () => {
    const navigate = useNavigate();

    const handleGetstarted = () => {
        navigate('/signup');
    };

    return (
        <div className="overflow-y-auto">

            <Header/>
            
            <div className="flex flex-col items-center justify-center mt-10">
                
                <div className="bg-bgc1 p-10 flex items-center justify-center w-full lg:h-screen md:h-100 ">
                    <img src="litimg/litsy.png" alt="Litsy" className="w-30 mb-8 mt-15" />
                    <div className="flex flex-col items-center ml-8">
                        <div className="text-white font-bold first-letter text-5xl text-center leading-relaxed pb-5" style={{ width: '800px' }}>
                            <span>Your launchpad into the world of literature</span>
                        </div>
                        <div className="lg:text-2xl md:text-xl sm:text-md font-light text-white lg:mb-8 md:mb-8 sm:mb-4">Lits learn Literature</div>
                        <button
                            type="button"
                            onClick={handleGetstarted}
                            className="lg:px-12 lg:py-3 md:px-8 md:py-2 sm:px-6 sm:py-1 cursor-pointer"
                        >
                            <img src="litimg/getstartedbtn.svg" alt="Get Started Button" className="w-30 h-15" />
                        </button>
                    </div>
                </div>

                
                <div className="bg-white flex flex-col items-center">
                    <img src="litimg/land1.png" alt="Land 1" className="w-screen h-full" />
                    <div className="flex flex-row mt-20 mb-5">
                        <div className="mt-5 mr-40">
                            <div className="bg-white flex flex-row">
                                <div className="text-bgc1 font-bold text-5xl">free.&nbsp;</div>
                                <div className="text-bgc2 font-bold text-5xl">fun.</div>
                            </div>
                            <div className="mt-5">
                                <div className="text-bgc1 font-bold text-5xl">effective.</div>
                            </div>  
                        </div>
                        <div className="mt-5"
                             style={{ width: '600px' }}>        
                            <div className="text-bgc1 font-normal text-xl leading-relaxed">
                                Elevate your experience with Lit: a virtual library of visual novels, where entertainment meets education. Dive into captivating stories and unlock gamified learning for a seamless blend of fun and personal growth. Transform the way you enjoy and learn literature with Lit!
                            </div>
                        </div> 
                    </div>
                    <img src="litimg/land2.png" alt="Land 2" className="w-50% h-full" />
                    <div className="flex flex-row mt-20 mb-20">
                        <div className="flex flex-col items-center mr-10">
                            <div className="text-bgc1 font-bold text-4xl text-center mb-10"
                                 style={{ width: '400px' }}>
                                Reading Comprehension
                            </div>
                            <div className="text-bgc1 font-normal text-xl text-center leading-relaxed"
                                 style={{ width: '350px' }}>
                                Immerse yourself in captivating visual novels on Lit for a fun way to enhance reading comprehension effortlessly.
                            </div>
                        </div>
                        <div className="flex flex-col items-center mr-20">
                            <div className="text-bgc1 font-bold text-4xl text-center mb-10"
                                 style={{ width: '400px' }}>
                                Personal Growth Through Literature
                            </div>
                            <div className="text-bgc1 font-normal text-xl text-center leading-relaxed"
                                 style={{ width: '350px' }}>
                                Explore narratives on Lit that go beyond entertainment, fostering personal growth through diverse stories and character journeys.
                            </div>
                        </div>
                        <div className="flex flex-col items-center mr-10"
                             style={{ width: '300px' }}>
                            <div className="text-bgc1 font-bold text-4xl text-center mb-10">
                                Learning Experience
                            </div>
                            <div className="text-bgc1 font-normal text-xl text-center leading-relaxed"
                                 style={{ width: '350px' }}>
                                Transform your literature journey with Lit's gamified learning, making reading both informative and enjoyable for personal development.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-bgc1 w-full relative">
                    <img src="litimg/land3.png" alt="Land 3" className="w-full h-full" />
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgc1 p-10 flex flex-col items-center">
                        <div className="text-white font-semibold text-5xl text-center mb-10 leading-normal"
                            style={{ width: '650px' }}>
                            Have a wondrous adventure to the World of Filipino Literature with Lit
                        </div>
                        <button
                            type="button"
                            onClick={handleGetstarted}
                            className="lg:px-12 lg:py-3 md:px-8 md:py-2 sm:px-6 sm:py-1 cursor-pointer"
                        >
                            <img src="litimg/getstartedbtn.svg" alt="Get Started Button" className="w-30 h-15" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingScreen;
