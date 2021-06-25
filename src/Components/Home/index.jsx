import Gallery from './Gallery/index'
import ImageSlider from './Slider/index'
import NewsEvent from './NewsEvent/newsevent'
import Connect from './Connect/Connect'



const Home = ()=>{
    return (
        <div>
            <ImageSlider />
            <NewsEvent />
            <Connect />     
            <Gallery />
        </div>
    )
}

export default Home;