import "./Event.scss";
import { NavLink } from "react-router-dom";

const Event = () => {
  let events = [
    {
      month: "July",
      date: 15,
      name: "Alumni Speaks : Getting the funds",
      timeline: "Future",
      id: 1,
    },
    {
      month: "July",
      date: 15,
      name: "Alumni Speaks : Getting the funds",
      timeline: "Future",
      id: 2,
    },
  ];
  const renderEvent = (event) => {
    return (
      <div className="particular-event">
        <div className="event-time-info">
          <p className="event-month">{event.month.toUpperCase()}</p>
          <p className="event-date">{event.date}</p>
        </div>
        <div className="event-info">
          <p className="event-timeline">{event.timeline}</p>
          <p className="event-name">
            <NavLink to={`/event/${event.id}`}>{event.name}</NavLink>
          </p>
          <button className="register-event-btn">Register</button>
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
      {events.map((event, index) => (
        <div key={index}>{renderEvent(event)}</div>
      ))}
    </div>
  );
};

export default Event;
