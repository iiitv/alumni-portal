import React from "react";
import "./Gallery.scss";
import "pure-react-carousel/dist/react-carousel.es.css";
import DesktopGallery from "./DesktopGallery/index";
import MobileGallery from "./MobileGallery/index";

const images = [
  "images/img1.jpeg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
];

const Gallery = () => {
  return (
    <>
      <div className="gallery" style={{ backgroundImage: `url(images/gallery-bg.png)`  }}>
        <div className="headContainer">
          <h1 className="GalleryHead">Gallery</h1>
        </div>
        <div className="galleryCarousel">
          <DesktopGallery images={images} className="desktop-gallery" />
        </div>
      </div>

      <div className="mobileGallery"  style={{ backgroundImage: `url(images/gallery-bg.png)`  }}>
        <div className="headContainer">
          <h1 className="mobileGallery__head">Gallery</h1>
        </div>

        <div className="mobileGallery__carousel">
          <MobileGallery images={images} />
        </div>
      </div>
    </>
  );
};

export default Gallery;
