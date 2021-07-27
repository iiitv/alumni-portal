import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getSliderImages } from "../../../services/slideshowServices";
import { useEffect, useState } from "react";
import "./Slider.scss";

const ImageSlider = () => {
  const [images, setImage] = useState([]);

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
    pauseOnHover: true,
  };
  
  const fetchData = async () => {
    let img = await getSliderImages();
    setImage(img);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="img-slider"
      style={{ backgroundImage: `url(asset/images/Home/Slider/bulb.png)` }}
    >
      <Slide {...properties} className="slider">
        {images.map((each, index) => (
          <div key={index} className="innerDiv">
            <img src={each.url} alt="Slide Images" />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
