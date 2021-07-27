import React from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import "./BlogDashboard.scss";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import  { deleteBlog, getAllBlog } from "../../../../services/blogsServices";
import Loader from '../../../Shared/Loader/Loader';

const BlogsAdminCard = () => {
    const [blog, setBlog] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const fetchData = async () => {
      let val = await getAllBlog();
      setBlog(val);
      setLoading(false);
    }
    useEffect(() => {
      fetchData();
    }, []);
  const location = useLocation();
  const deleteBlogHandler = async (obj) => {
    try {
      await deleteBlog(obj);
      setLoading(true);
      fetchData();
    } catch(err) {
        console.log(err.message);
    }
  }
  const renderNews = (obj) => {
    return (
      <div className="news-block">
        <div className="icon-block-div">
        <Popup 
            content = "edit"
            trigger = {
              <Link to={{pathname: `${location.pathname}/edit-blog/${obj.id}`, obj: {
                id: obj.id,
                title: obj.heading,
                date: obj.date,
                place: obj.place,
                text: obj.body,
                image: obj.img,
                author: obj.author,
              }}}>
                <img 
                  className="icon-btn"
                  src={"/asset/images/Home/Admin/NewsNBlogs/edit.png"}
                  alt="edit-blog"
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
                  deleteBlogHandler(obj);
                }}
                alt="delete-blog"
              />
            }
          />
        </div>
        <div className="news">
          <div className="news-text eq-h">
            <Link to={`${location.pathname}/${obj.id}`} className="news-link">
              <p className="news-head">{obj.heading}</p>
            </Link>
            <p className="news-body">{(obj.body.length > 245) ? obj.body.substring(0,245) + "..." : obj.body}</p>
          </div>
          <div className="news-image-div eq-h">
            <img src={obj.img} alt="sample-news.png" className="news-image" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading &&
        <div className="all-news-info">
          <div className="news-header-div">
            <div className="admin-news-heading">
              <p>Blogs</p>
            </div>
            <div className="add-news-btn-div">
                <Link to="/admin/create-blog">
                  <button className="add-news-btn">
                    +
                  </button>
                </Link>
            </div>
          </div>
          <SemanticToastContainer />
          {blog.map((obj, index) => (
            <div key={index}>{renderNews(obj)}</div>
          ))}
        </div>
      }
    </div>
  );
};

export default BlogsAdminCard;
