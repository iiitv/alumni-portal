import React from "react";
import "./MobileGallery.scss";
import {
  CarouselProvider,
  Slider,
  Slide,
} from "pure-react-carousel";

const renderSlide = (images) => {

  return images.map((image, index) => {
    let imageUrl = image.url;
    return (
      <Slide index={index} key={index}>
        <div className="mobileGallery__container">
          <img
            alt="img"
            className="mobileGallery__container__img"
            src={imageUrl}
            draggable="false"
          />
        </div>
      </Slide>
    );
  });
};

const MobileGallery = ({ images }) => {
  return (
    <>
      <CarouselProvider
        naturalSlideWidth={500}
        naturalSlideHeight={400}
        totalSlides={images.length}
        interval={2000}
        visibleSlides={1}
      >
        <Slider>{renderSlide(images)}</Slider>
      </CarouselProvider>
    </>
  );
};

export default MobileGallery;
