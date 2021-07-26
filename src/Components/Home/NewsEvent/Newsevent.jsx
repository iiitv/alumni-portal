import "./Newsevent.scss";
import News from "./News/News";
import Event from "./Event/Event";

const NewsEvent = () => {
  return (
    <div className="wrap">
      <News />
      <Event />
    </div>
  );
};

export default NewsEvent;
