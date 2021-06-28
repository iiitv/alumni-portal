import React from "react";
import "./MobileGallery.scss";
import {
  CarouselProvider,
  Slider,
  Slide,
} from "pure-react-carousel";

const renderSlide = (images) => {
  let imageUrlPrefix = "https://gaurkrishna.pythonanywhere.com/media/gallery/";

  return images.map((Image, index) => {
    let imageUrl = `${imageUrlPrefix}img${index + 1}.jpg`;
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
        totalSlides={12}
        interval={2000}
        visibleSlides={1}
      >
        <Slider>{renderSlide(images)}</Slider>
      </CarouselProvider>
    </>
  );
};

export default MobileGallery;
