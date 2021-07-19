import "./AddBlog.scss";
import { Icon } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { addBlogs } from "../../../../services/firebase";

const AddBlog = () => {
  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [addingBlog, setAddingBlog] = useState(false);
  const [url, setUrl] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    date: null,
    place: "",
    text: "",
    image: null,
  });
  useEffect(() => {
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
      setBlog({
        ...blog,
        image: e.target.files[0],
      });
    }
  };
  const setInfo = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingBlog(true);
    await addBlogs(blog);
    history.push("dashboard");
  };
  return (
    <div className="add-news">
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <h2 className="heading">Create blog</h2>
          <form>
            <p className="line"></p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
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
            <label htmlFor="place">Place</label>
            <input
              type="text"
              name="place"
              id="place"
              onChange={setInfo}
              required
            />
            <label htmlFor="text">Text</label>
            <textarea
              name="text"
              id="text"
              onChange={setInfo}
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
              ></input>
            </p>
            {url && (
              <p className="img-par">
                <img className="preview-img" src={url} alt="hello"></img>
              </p>
            )}
            <p className="line"></p>
            <p className="btn-parent">
              {addingBlog ? (
                <button className="upload-img-btn">Adding...</button>
              ) : (
                <button className="upload-img-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
