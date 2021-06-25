import "./newsevent.scss";
import News from './News/newsfeed'
import Event from './Event/event'

const NewsEvent = ()=>{ 
    return (
        <div className="wrap">
                <News />
                <Event />
        </div>
    )
}

export default NewsEvent;