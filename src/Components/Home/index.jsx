import Gallery from './Gallery/Gallery'
import ImageSlider from './Slider/Slider'
import Navbar from '../Shared/Navbar/Navbar'
import Header from '../Shared/Header/Header'
import NewsEvent from './NewsEvent/Newsevent'
import Connect from './Connect/Connect'
import Footer from '../Shared/Footer/Footer'
import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920
    }
  });
  const mediaStyles = AppMedia.createMediaStyle();
  const { MediaContextProvider } = AppMedia;

const Home = ()=>{
    return (
        <div>
            <Header/>
            <style>{mediaStyles}</style>
            <MediaContextProvider>
                <Navbar>
                    <ImageSlider />
                    <NewsEvent />
                    <Connect />     
                    <Gallery />
                </Navbar>
            </MediaContextProvider>     
            <Footer />
        </div>
    )
}

export default Home;