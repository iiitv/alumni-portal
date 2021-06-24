import React from "react";
import "./DesktopGallery.scss";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

const renderSlides = (images) => {
  let imageUrlPrefix = "https://gaurkrishna.pythonanywhere.com/media/gallery/";

  return images.map((image, index) => {
    let imageUrl = `${imageUrlPrefix}img${index + 1}.jpg`;
    console.log(imageUrl);

    return (
      <Slide index={index}>
        <div className="largeImg">
          <img
            className="galleryImg"
            src={imageUrl}
            alt="kreiva gallery"
            draggable="false"
          />
        </div>
      </Slide>
    );
  });
};

const DesktopGallery = ({ images }) => {
  return (
    <>
      <CarouselProvider
        naturalSlideWidth={500}
        naturalSlideHeight={400}
        totalSlides={6}
        visibleSlides={2.5}
        interval={2000}
        isPlaying={true}
      >
        <Slider>{renderSlides(images)}</Slider>
        <ButtonBack className="prev">&#10094;</ButtonBack>
        <ButtonNext className="next">&#10095;</ButtonNext>
      </CarouselProvider>
    </>
  );
};

export default DesktopGallery;