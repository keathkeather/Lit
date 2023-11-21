import { useNavigate, Link } from 'react-router-dom';

interface ContactusScreenProps {}

const ContactusScreen: React.FC<ContactusScreenProps> = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogoClick = () => {
        navigate('/');
      };

  return (
    <div className="bg-bgc1 w-full relative">
        <img src="litimg/checkpointbg.png" alt="Checkpoint Background" className="w-full h-screen" />
        
        <header className="bg-white fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between">
            <div className="flex items-center mb-0 ml-20">
                <button
                    onClick={handleLogoClick}
                >
                    <img src="litimg/litlogo2.png" alt="Lit Logo 2" className="w-20 lg:w-28 mr-3 lg:mr-5" />
                </button>
                <Link to="/landing" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                    Home
                </Link>
                <Link to="/features" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                    Features
                </Link>
                <Link to="/pricing" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                    Pricing
                </Link>
                <Link to="/aboutus" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                    About Us
                </Link>
            </div>
            <div className="flex items-center mr-20">
                <button
                    type="button"
                    onClick={handleLogin}
                    className="px-3 py-1 lg:px-4 lg:py-2 rounded bg-bgc1 text-white font-semibold cursor-pointer mb-0 lg:text-lg"
                >
                    Log in
                </button>
                <button
                    type="button"
                    onClick={handleSignup}
                    className="px-3 py-1 ml-2 lg:ml-5 lg:px-4 lg:py-2 rounded bg-bgc2 text-white font-semibold cursor-pointer mb-0 lg:text-lg"
                >
                    Sign up for Free
                </button>
            </div>
        </header>
        
    </div>
  );
};

export default ContactusScreen;
