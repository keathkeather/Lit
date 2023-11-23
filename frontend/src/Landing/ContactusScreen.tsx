import Header from './Header';

interface ContactusScreenProps {}

const ContactusScreen: React.FC<ContactusScreenProps> = () => {
  return (
    <div className="bg-bgc1 w-full relative">
        <img src="litimg/checkpointbg.png" alt="Checkpoint Background" className="w-full h-screen" />
        
        <Header/>
        
    </div>
  );
};

export default ContactusScreen;
