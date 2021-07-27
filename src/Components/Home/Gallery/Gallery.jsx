import React from "react";
import "./Gallery.scss";
import "pure-react-carousel/dist/react-carousel.es.css";
import DesktopGallery from "./DesktopGallery/DesktopGallery";
import MobileGallery from "./MobileGallery/MobileGallery";
import { getGalleryImages } from "../../../services/galleryServices";
import { useState, useEffect } from "react";


const Gallery = () => {

  const [images, setImage] = useState([]);
  const fetchData = async () => {
    let img = await getGalleryImages();
    setImage(img);
  }
  useEffect(() => {
    fetchData();
  },[])
  return (
    <>
      <div className="gallery" style={{ backgroundImage: `url(asset/images/Home/Gallery/gallery-bg.png)` }}>
        <div className="headContainer">
          <h1 className="GalleryHead">Gallery</h1>
        </div>
        <div className="galleryCarousel">
          <DesktopGallery images={images} className="desktop-gallery" />
        </div>
      </div>

      <div className="mobileGallery" style={{ backgroundImage: `url(asset/images/Home/Gallery/gallery-bg.png)` }}>
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
