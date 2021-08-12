import "./EditBlog.scss";
import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { editBlog } from "../../../../services/blogsServices";

const EditBlog = (props) => {
  const history = useHistory();
  const info = useContext(UserContext);
  const { user, isLoading } = info;
  const [errorMessage, setErrorMessage] = useState("");
  const [addingBlog, setaddingBlog] = useState(false);
  const [url, setUrl] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [blog, setBlog] = useState({
    id: "",
    title: "",
    date:"",
    text: "",
    image: null,
    author: "",
  });

  useEffect(() => {
    if(props.location.obj) {
      setBlog({
        id: props.location.obj.id,
        title: props.location.obj.title,
        date: props.location.obj.date,
        place: props.location.obj.place,
        text: props.location.obj.text,
        image: props.location.obj.image,
        author: props.location.obj.author,
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
  const handleEdit = async (e) => {
    e.preventDefault();
    setaddingBlog(true);
    try {
    await editBlog(blog);
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
          <h2 className="heading">Edit Blog</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={setInfo}
              defaultValue={blog.title}
              required
            />
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              onChange={setInfo}
              defaultValue={blog.author}
              required
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={setInfo}
              defaultValue={blog.date}
              required
            />
            <label htmlFor="text">Text</label>
            <textarea
              name="text"
              id="text"
              onChange={setInfo}
              defaultValue={blog.text}
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
                defaultValue={blog.image}
              ></input>
            </p>
            {url && (
              <p className="img-par">
                <img className="preview-img" src={url} alt="hello"></img>
              </p>
            )}
            <p className="btn-parent">
              {addingBlog ? (
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

export default EditBlog;
