import "./Event.scss";
import { NavLink, Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { getAllEvents } from "../../services/eventsServices";
import { useState, useEffect } from "react";
import Loader from "../Shared/Loader/Loader";

const Event = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getLink = (link) => {
    if(link.includes("http//:") || link.includes("https//:")) return link;
    else return "https//:" + link;
  }

  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchData = async () => {
    let allEvents = await getAllEvents();
    setEvents(allEvents);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getEventStatus = (date) => {
    let eventDate = new Date(date);
    let currentDate = new Date();
    if (eventDate.getTime() < currentDate.getTime()) return "Past";
    else if (eventDate.getTime() > currentDate.getTime()) return "Future";
    else return "Present";
  };

  const copyLink = (id) => {
    let link = `https://iiitv-alumni-portal.netlify.app/event/${id}`;
    navigator.clipboard.writeText(link);
    toast({
      description: <p>Event Link Copied to Clipboard</p>,
    });
  };
  const renderEvent = (event) => {
    return (
      <div className="particular-event">
        <div className="event-time-info">
          <p className="event-month">
            {months[new Date(event.date).getMonth()]}
          </p>
          <p className="event-date">{new Date(event.date).getDate()}</p>
        </div>
        <div className="event-info">
          <p className="event-timeline">{getEventStatus(event.date)}</p>
          <p className="event-name">
            <NavLink to={`/admin/events/${event.id}`}>{event.name}</NavLink>
          </p>
          <Link to={{ pathname: getLink(event.link) }} target="_blank" >
            <button className="register-event-btn">Register</button>
          </Link>
        </div>
        <Popup
          content="Copy Event Link"
          trigger={
            <img
              className="share-event-btn"
              src={"/asset/svg/share.svg"}
              onClick={() => {
                copyLink(event.id);
              }}
              alt=""
            />
          }
        />
      </div>
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <div className="all-event-info">
            <SemanticToastContainer />
            {events.map((event, index) => (
              <div key={index}>{renderEvent(event)}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Event;
