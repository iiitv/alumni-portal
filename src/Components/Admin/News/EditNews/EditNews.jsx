import "./EditNews.scss";
import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { editNews } from "../../../../services/newsServices";

const EditNews = (props) => {
  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [errorMessage, setErrorMessage] = useState("");
  const [addingNews, setAddingNews] = useState(false);
  const [url, setUrl] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [news, setNews] = useState({
    id: "",
    title: "",
    date:"",
    place: null,
    text: "",
    image: null,
  });

  useEffect(() => {
    if(props.location.obj) {
      setNews({
        id: props.location.obj.id,
        title: props.location.obj.title,
        date: props.location.obj.date,
        place: props.location.obj.place,
        text: props.location.obj.text,
        image: props.location.obj.image,
      });
      console.log(props.location.obj);
    } else setredirect("/admin/news")
    
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
      setNews({
        ...news,
        image: e.target.files[0],
      });
    }
  };
  const setInfo = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    setAddingNews(true);
    try {
    await editNews(news);
    } catch(err) {
      setErrorMessage(err.message);
    }
    history.goBack();
  };
  return (
    <div className="add-news">
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <h2 className="heading">Edit News</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={setInfo}
              defaultValue={news.title}
              required
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={setInfo}
              defaultValue={news.date}
              required
            />
            <label htmlFor="place">Place</label>
            <input
              type="text"
              name="place"
              id="place"
              onChange={setInfo}
              defaultValue={news.place}
              required
            />
            <label htmlFor="text">Text</label>
            <textarea
              name="text"
              id="text"
              onChange={setInfo}
              defaultValue={news.text}
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
                defaultValue={news.image}
              ></input>
            </p>
            {url && (
              <p className="img-par">
                <img className="preview-img" src={url} alt="hello"></img>
              </p>
            )}
            <p className="btn-parent">
              {addingNews ? (
                <button className="upload-img-btn">Saving changes...</button>
              ) : (
                <button className="upload-img-btn" onClick={handleEdit}>
                  Save Changes
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

export default EditNews;
