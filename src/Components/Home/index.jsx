
import Gallery from './Gallery/Gallery'
import ImageSlider from './Slider/Slider'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import NewsEvent from './NewsEvent/newsevent'
import Connect from './Connect/Connect'

const Home = ()=>{
    return (
        <div>
            <Header/>
            <Navbar />
            <ImageSlider />
            <NewsEvent />
            <Connect />     
            <Gallery />
        </div>
    )
}

export default Home;