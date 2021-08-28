import "./EventDashboard.scss";
import { NavLink, Link, Redirect } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { deleteEvent, getAllEvents, getEventStatus, getEventMonth, getEventDate } from "../../../../services/eventsServices";
import { useState, useEffect, useContext } from "react";
import { getLink } from "../../../../services/utils"
import { UserContext } from "../../../../providers/UserProvider";
import { useLocation } from "react-router";
import Loader from "../../../Shared/Loader/Loader";

const Event = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");
  const location = useLocation();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const fetchData = async () => {
    let allEvents = await getAllEvents();
    setEvents(allEvents);
    setLoading(false);
  };
  useEffect(() => {
    if (!user && !isLoading) {
      setRedirect("/admin-login");
    } else fetchData();
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const deleteEventHandler = async (obj) => {
    try {
      await deleteEvent(obj);
      setLoading(true);
      fetchData();
    } catch(err) {
        console.log(err.message);
    }
  }

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
        <div className="icon-block-div">
        <Popup 
            content = "edit"
            trigger = {
              <Link to={{pathname: `${location.pathname}/edit-events/${event.id}`, event: {
                id: event.id,
                name: event.name,
                date: event.date,
                venue: event.venue,
                description: event.description,
                image: event.image,
                link: event.link,
                time: event.time
              }}}>
                <img 
                  className="icon-btn"
                  src={"/asset/images/Home/Admin/NewsNBlogs/edit.png"}
                  alt="edit-event"
                />
            </Link>
            }
          />
          <Popup 
            content = "delete"
            trigger = {
              <img 
                className="icon-btn"
                src={"/asset/images/Home/Admin/NewsNBlogs/delete.png"}
                onClick={() => {
                  deleteEventHandler(event);
                }}
                alt="delete-blog"
              />
            }
          />
        </div>
        <div className="event-time-info">
          <p className="event-month">
            {getEventMonth(event.date)}
          </p>
          <p className="event-date">{getEventDate(event.date)}</p>
        </div>
        <div className="event-info">
          <p className="event-timeline">{getEventStatus(event.date)}</p>
          <p className="event-name">
            <NavLink to={`/admin/events/${event.id}`}>{event.name}</NavLink>
          </p>
          <Link
          to={{ pathname: getLink(event.link) }}
             target="_blank" >
            <button className="register-event-btn">Register</button>
          </Link>
        </div>
        <Popup
          content="Copy Event Link"
          trigger={
            <img
              className="share-event-btn"
              src={"asset/svg/share.svg"}
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
      {loading && <Loader />}
      {!loading && (
        <div className="events-container">
          <div className="news-header-div">
            <div className="admin-news-heading">
              <p>Events</p>
            </div>
            <div className="add-news-btn-div">
              <Link to="/admin/add-events">
                <button className="add-news-btn">+</button>
              </Link>
            </div>
          </div>
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
