import "./Event.scss";
import { NavLink, Link } from "react-router-dom";
import { getLink } from "../../../../services/utils"
import { getNewestEvents, getEventMonth, getEventStatus, getEventDate } from "../../../../services/eventsServices"
import { useEffect, useState } from "react";

const Event = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  
  const fetchEventsLatest = async () => {
    let events = await getNewestEvents();
    setLatestEvents(events);
    console.log(events)  
  }
  useEffect(() => {
    fetchEventsLatest()
  },[]);

  const renderEvent = (event) => {
    return (
      <div className="particular-event">
        <div className="event-time-info">
          <p className="event-month">{getEventMonth(event.date)}</p>
          <p className="event-date">{getEventDate(event.date)}</p>
        </div>
        <div className="event-info">
          <p className="event-timeline">{getEventStatus(event.date)}</p>
          <p className="event-name">
            <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
          </p>
          <Link to= {{ pathname: getLink(event.link) }} target="_blank">
            <button className="register-event-btn">Register</button>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div
      className="event-card"
      style={{ backgroundImage: `url(asset/images/Home/Event/bg.png)` }}
    >
      <h1 className="event-heading">Events</h1>

      {latestEvents.map((event, index) => {
        return(
          <div key={index}>{renderEvent(event)}</div>
        )
      })}
    </div>
  );
};

export default Event;
