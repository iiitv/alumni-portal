import Gallery from './Gallery/index'
import ImageSlider from './Slider/index'
import Navbar from './Navbar/index'
import 'semantic-ui-css/semantic.min.css'

const Home = ()=>{
    return (
        <div>
            <Navbar />
            <ImageSlider />
            <Gallery />
        </div>
    )
}

export default Home;