import Header from './Header';

interface AboutusScreenProps {}

const AboutusScreen: React.FC<AboutusScreenProps> = () => {

  return (
    <div className="bg-bgc1 w-full relative">
        <img src="litimg/checkpointbg.png" alt="Checkpoint Background" className="w-full h-screen" />
        
        <Header/>
        
    </div>
  );
};

export default AboutusScreen;
