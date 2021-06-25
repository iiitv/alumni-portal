import Gallery from './Gallery/index'
import ImageSlider from './Slider/index'
import Navbar from './Navbar/index'
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