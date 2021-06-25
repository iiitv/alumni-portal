import Gallery from './Gallery/Gallery'
import ImageSlider from './Slider/Slider'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import 'semantic-ui-css/semantic.min.css'

const Home = ()=>{
    return (
        <div>
            <Header/>
            <Navbar />
            <ImageSlider />
            <Gallery />
        </div>
    )
}

export default Home;