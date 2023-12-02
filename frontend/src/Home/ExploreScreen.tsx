import Header from './Header'
import { useNavigate  } from 'react-router-dom';
import Carousel from './Carousel';

const ExploreScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    //logic here..
  };

  const handlePlay = () => {
    navigate('/book');
  };

  const handlePlus1 = () => {
    //logic here...
  };

  const handlePlus2 = () => {
    //logic here...
  };

  const handlePlus3 = () => {
    //logic here...
  };

  const handlePlus4 = () => {
    //logic here...
  };

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        <div className="mt-11 mb-4">
            <Carousel />
        </div>

        <div className="mt-5 mb-5 relative"
             style={{ width: '600px' }}>
            <div className="relative">
                <input
                type="text"
                placeholder="Search a title or an author"
                className="w-full border rounded-xl p-1 py-2 px-3 text-lg text-left"
                />
                <button onClick={handleSearch}>
                    <img
                    src="litimg/search.svg"
                    alt="Search"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8"
                    />
                </button>
            </div>
        </div>

        <div className="mt-5 mb-10">
          <div className="text-black text-xl font-bold absolute left-36">Fiction</div>
        </div>
        <div className="mb-5">
          <div className="flex flex-row items-center">
            <div className="flex flex-col mr-8 ml-8">
              <div className="relative">
                <img src="litimg/flora.svg" alt="Florante at Laura" className="w-72" />
                <button onClick={handlePlus2} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Florante at Laura</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Francisco Balagtas</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/fili.svg" alt="El Filibusterismo" className="w-72" />
                <button onClick={handlePlus4} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">El Filibusterismo</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Leon Ma. Geurrero</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/dekada.svg" alt="Dekada 70" className="w-72" />
                <button onClick={handlePlus1} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Dekada 70</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Lualhati Bautista </div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/smaller.svg" alt="Smaller and Smaller Cir.." className="w-72" />
                <button onClick={handlePlus1} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Smaller and Smaller Cir..</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">F.H. Batacan</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-10">
          <div className="text-black text-xl font-bold absolute left-36">Romance</div>
        </div>
        <div className="mb-5">
          <div className="flex flex-row items-center">
            <div className="flex flex-col mr-8 ml-8">
              <div className="relative">
                <img src="litimg/ghost.svg" alt="Ghost of a Feeling" className="w-72" />
                <button onClick={handlePlus1} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Ghost of a Feeling</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Celestine Trinidad</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/para.svg" alt="Para sa Hopeless Rom..." className="w-72" />
                <button onClick={handlePlus2} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Para sa Hopeless Rom...</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Marcello Santos III</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/apat.svg" alt="Ang Apat na Anghel" className="w-72" />
                <button onClick={handlePlus3} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Ang Apat na Anghel</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Maria Aguinaldo</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/before.svg" alt="Before Ever Afyer" className="w-72" />
                <button onClick={handlePlus4} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Before Ever Afyer</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Samantha Sotto</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-10">
          <div className="text-black text-xl font-bold absolute left-36">Folklore</div>
        </div>
        <div className="mb-20">
          <div className="flex flex-row items-center">
            <div className="flex flex-col mr-8 ml-8">
              <div className="relative">
                <img src="litimg/adarna.svg" alt="Ibong Adarna" className="w-72" />
                <button onClick={handlePlus1} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Ibong Adarna</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Jose de la Cruz</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/pinya.svg" alt="Alamat nng Pinya" className="w-72" />
                <button onClick={handlePlus3} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Alamat ng Pinya</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Boots S. Agbayani Pa...</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/gubat.svg" alt="Alamat ng Gubat" className="w-72" />
                <button onClick={handlePlus2} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Alamat ng Gubat</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Bob Ong</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/rosas.svg" alt="Alamat ng Rosas" className="w-72" />
                <button onClick={handlePlus4} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Alamat ng Rosas</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Virgilio S. Almario</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
          </div>
        </div>

        </div>
    </div>
  );
};

export default ExploreScreen;