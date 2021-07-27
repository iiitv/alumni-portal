import "./AddBlog.scss";
import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { addBlogs } from "../../../../services/blogsServices";

const AddBlog = () => {
  const history = useHistory();
  const info = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoading } = info;
  const [addingBlog, setAddingBlog] = useState(false);
  const [url, setUrl] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [blog, setBlog] = useState({
    title: "",
    date: null,
    text: "",
    author: "",
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
    try {
    await addBlogs(blog); 
  } catch(err) {
    setErrorMessage(err.message);
  }
    history.push("blogs");
  };
  return (
    <div className="add-news">
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <h2 className="heading">Create blog</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={setInfo}
              required
            />
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
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
            <p className="btn-parent">
              {addingBlog ? (
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

export default AddBlog;
