
import Gallery from './Gallery/Gallery'
import ImageSlider from './Slider/Slider'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import NewsEvent from './NewsEvent/Newsevent'
import Connect from './Connect/Connect'
import Footer from './Footer/Footer'

const Home = ()=>{
    return (
        <div>
            <Header/>
            <Navbar />
            <ImageSlider />
            <NewsEvent />
            <Connect />     
            <Gallery />
            <Footer />
        </div>
    )
}

export default Home;