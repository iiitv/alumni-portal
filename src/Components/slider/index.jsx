import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import "./slider.css";

const ImageSlider = () => {
  const images = [
    "images/img1.jpeg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg"
  ];


  const properties = {
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
  };
  
  return (
    <div class="img-slider">
      <Slide {...properties}>
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