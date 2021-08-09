import "./AddEvent.scss";
import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { addEvents } from "../../../../services/eventsServices";

const AddEvent = () => {
  const history = useHistory();
  const info = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoading } = info;
  const [addingEvent, setAddingEvent] = useState(false);
  const [redirect, setredirect] = useState(null);
  const [event, setEvent] = useState({
    name: "",
    date: null,
    time: "",
    venue: "",
    description: "",
    link: ""
  });

  useEffect(() => {
    if (!user && !isLoading) {
      setredirect("/admin-login");
    }
  }, [user, isLoading]);
 
  if (redirect) {
    return <Redirect to={redirect} />;
  }

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
    await addEvents(event); 
  } catch(err) {
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
              required
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={setInfo}
              required
            />
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="time"
              onChange={setInfo}
              required
            />
             <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              onChange={setInfo}
              required
            />
             <label htmlFor="link">Registration link</label>
            <input
              type="text"
              name="link"
              id="link"
              onChange={setInfo}
              required
            />
            <label htmlFor="description">About Event </label>
            <textarea
              name="description"
              id="description"
              onChange={setInfo}
              required
            ></textarea>
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
