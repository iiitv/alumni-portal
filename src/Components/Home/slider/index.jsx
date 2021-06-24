import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import "./Slider.scss";

const ImageSlider = () => {
  const images = [
    "asset/images/Home/Slider/img1.jpeg",
    "asset/images/Home/Slider/img2.jpg",
    "asset/images/Home/Slider/img3.jpg",
    "asset/images/Home/Slider/img4.jpg"
  ];


  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
    pauseOnHover: true,
  };
  
  return (
    <div class="img-slider" style={{ backgroundImage: `url(asset/images/Home/Slider/bulb.png)`  }}>
      <Slide {...properties} className="slider">
        {images.map((each, index) => (
          <div key={index} className="innerDiv">
            <img src={each} alt="Slide Images"/>
          </div>
        ))}
      </Slide>
    </div>
  )
};

export default ImageSlider;