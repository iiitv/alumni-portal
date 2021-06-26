import "./Newsevent.scss";
import News from './News/Newsfeed'
import Event from './Event/Event'

const NewsEvent = ()=>{ 
    return (
        <div className="wrap">
                <News />
                <Event />
        </div>
    )
}

export default NewsEvent;