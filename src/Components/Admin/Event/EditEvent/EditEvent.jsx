import "./EditEvent.scss";
import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { editEvent } from "../../../../services/eventsServices";

const AddEvent = (props) => {
  const history = useHistory();
  const info = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoading } = info;
  const [addingEvent, setAddingEvent] = useState(false);
  const [url, setUrl] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [event, setEvent] = useState({
    name: "",
    date: null,
    time: "",
    venue: "",
    description: "",
    image: null,
    link: "",
    id: "",
  });

  useEffect(() => {
    setEvent({
      id: props.location.event.id,
      name: props.location.event.name,
      date: props.location.event.date,
      venue: props.location.event.venue,
      description: props.location.event.description,
      image: props.location.event.image,
      link: props.location.event.link,
      time: props.location.event.time,
    });
    setUrl(props.location.event.image);
    if (!user && !isLoading) {
      setredirect("/admin-login");
    }
  }, [user, isLoading]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleImage = (e) => {
    if (e.target.files) {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setEvent({
        ...event,
        image: e.target.files[0],
      });
    }
  };
  const setInfo = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingEvent(true);
    try {
      await editEvent(event);
    } catch (err) {
      setErrorMessage(err.message);
    }
    history.push("events");
  };
  return (
    <div className="add-news">
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <h2 className="heading">Create Event</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={setInfo}
              value={event.name}
              required
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={setInfo}
              value={event.date}
              required
            />
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="time"
              onChange={setInfo}
              value={event.time}
              required
            />
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              onChange={setInfo}
              value={event.venue}
              required
            />
            <label htmlFor="link">Registration link</label>
            <input
              type="text"
              name="link"
              id="link"
              onChange={setInfo}
              value={event.link}
              required
            />
            <label htmlFor="description">About Event </label>
            <textarea
              name="description"
              id="description"
              onChange={setInfo}
              value={event.description}
              required
            ></textarea>
            <p className="btn-parent">
              <label className="upload-img-btn" htmlFor="upload-img">
                <Icon name="cloud upload"></Icon> Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="upload-img"
                onChange={(e) => handleImage(e)}
                value={event.image}
              ></input>
            </p>
            {url && (
              <p className="img-par">
                <img className="preview-img" src={url} alt="hello"></img>
              </p>
            )}
            <p className="btn-parent">
              {addingEvent ? (
                <button className="upload-img-btn">Adding...</button>
              ) : (
                <button className="upload-img-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </p>
            <Message error header="Oops!!" content={errorMessage} />
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
