import "./EventPost.scss";
import { Popup, Container } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getParticularEvent } from "../../../../services/eventsServices"
import { Link } from "react-router-dom";
import Loader from "../../../../Components/Shared/Loader/Loader"
import Error404 from "../../../Shared/Error404/Error404";

const copyLink = (id) => {
  let link = `https://iiitv-alumni-portal.netlify.app/event/${id}`;
  navigator.clipboard.writeText(link);
  toast({
    description: <p>Event Link Copied to Clipboard</p>,
  });
};

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

  const getEventStatus = (date) => {
    let eventDate = new Date(date);
    let currentDate = new Date();
    if (eventDate.getTime() < currentDate.getTime()) return "Past";
    else if (eventDate.getTime() > currentDate.getTime()) return "Future";
    else return "Present";
  };

const EventPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [event, setEvent] = useState();
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams();
    const fetchData = async () => {
      let data = await getParticularEvent(id);
      if (data == null) {
        setNotFound(true);
      } else {
        setEvent(data);
      }
      setLoading(false);
    }
    useEffect(() => {
      fetchData();
    })
  return (<>
    {isLoading && <Loader />}
    {!isLoading && notFound && <Error404 />}
    {!isLoading && !notFound &&
      <div className="event-wrapper">
        <SemanticToastContainer />
        <div className="particular-event">
          <div className="event-time-info">
            <p className="event-month"> {months[new Date(event.date).getMonth()]}</p>
            <p className="event-date">{event.date}</p>
          </div>
          <div className="event-info">
            <p className="event-timeline">{getEventStatus(event.date)}</p>
            <p className="event-name">
             {event.name}
            </p>
          </div>
          <Popup
            content="Copy Event Link"
            trigger={
              <img
                className="share-btn"
                src="./../asset/svg/share.svg"
                onClick={() => {
                  copyLink(event.id);
                }}
                alt="share-button"
              />
            }
          />
        </div>
        <Container textAlign="center">
        <img
         src="/asset/images/NewsAndBlogs/sample-news.png"
         alt="news"
         className="news-image"
        />
        </Container>
        <div className="event-details">
          <p>{event.description}</p>
        </div>
        <div className="event-button">
            <Link to={event.link}>
          <button className="register-event-btn">Register</button>
            </Link>
        </div>
      </div>}
      </>
  );
};

export default EventPage;
