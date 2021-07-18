import React, { Suspense } from "react";
import Loader from "../Shared/Loader/Loader";
const Connect = React.lazy(() => import("./Connect/Connect"));
const NewsEvent = React.lazy(() => import("./NewsEvent/Newsevent"));
const Gallery = React.lazy(() => import("./Gallery/Gallery"));
const ImageSlider = React.lazy(() => import("./Slider/Slider"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <section>
          <ImageSlider />
          <NewsEvent />
          <Connect />
          <Gallery />
        </section>
      </Suspense>
    </div>
  );
};

export default Home;
