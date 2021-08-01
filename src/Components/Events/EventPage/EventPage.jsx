import "./EventPage.scss";
import { Popup, Container } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const copyLink = (id) => {
  let link = `https://iiitv-alumni-portal.netlify.app/event/${id}`;
  navigator.clipboard.writeText(link);
  toast({
    description: <p>Event Link Copied to Clipboard</p>,
  });
};

let event = {
  id: 1,
  month: "July",
  date: 15,
  name: "Alumni Speaks : Getting the funds",
  timeline: "Future",
  details: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pedejusto, fringilla vel, aliquet nec, vulputate eget, arcu. In enimjusto, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullamdictum felis eu pede link mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequatvitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut ",
};

const EventPage = () => {
  return (
      <div className="event-wrapper">
        <SemanticToastContainer />
        <div className="particular-event">
          <div className="event-time-info">
            <p className="event-month">{event.month.toUpperCase()}</p>
            <p className="event-date">{event.date}</p>
          </div>
          <div className="event-info">
            <p className="event-timeline">{event.timeline}</p>
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
          <p>{event.details}</p>
        </div>
        <div className="event-button">
          <button className="register-event-btn">Register</button>
        </div>
      </div>
  );
};

export default EventPage;
