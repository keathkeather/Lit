import { useNavigate } from 'react-router-dom';

interface CheckpointScreenProps {}

const CheckpointScreen: React.FC<CheckpointScreenProps> = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-bgc1 w-full relative">
        <img src="litimg/checkpointbg.png" alt="Checkpoint Background" className="w-full h-screen" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgc1 p-10 flex flex-col items-center">
            <div>
                <img src="litimg/litlogo4.png" alt="Lit Logo" className="w-40 mt-10" />
            </div>
            <div className="text-6xl font-bold mb-5 text-white flex flex-col items-center">
                NOICE!
            </div>
            <div className="text-2xl font-light text-white mb-8">
                Your account was successfully created.
            </div>
            <button
                type="button"
                onClick={handleStartClick}
                className="px-10 py-3 rounded bg-bgc2 text-white font-semibold cursor-pointer text-xl"
            >
                Back to Login
            </button>
        </div>
    </div>
  );
};

export default CheckpointScreen;
