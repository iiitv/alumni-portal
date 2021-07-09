import Gallery from "./Gallery/Gallery";
import ImageSlider from "./Slider/Slider";
import NewsEvent from "./NewsEvent/Newsevent";
import Connect from "./Connect/Connect";

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <NewsEvent />
      <Connect />
      <Gallery />
    </div>
  );
};

export default Home;
