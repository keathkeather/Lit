import React,{useState} from 'react';
import Slider, { Settings } from 'react-slick';

const Carousel: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div style={{ maxWidth: '1070px', margin: '0 auto' }}>
      <Slider {...settings}>
        <div style={{ textAlign: 'center' }}>
          {!isLoaded && <div>Loading...</div>}
          <img src="litimg/exadarna.svg" alt="Adarna" style={{ width: '100%', height: '300px', margin: '0 auto' }} onLoad={handleImageLoad}/>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="litimg/exflora.svg" alt="Flora" style={{ width: '100%', height: '300px', margin: '0 auto' }}onLoad={handleImageLoad} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="litimg/exdwellers.svg" alt="Dwellers" style={{ width: '100%', height: '300px', margin: '0 auto' }} onLoad={handleImageLoad}/>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
