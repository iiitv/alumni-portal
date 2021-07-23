import React from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import "./NewsDashboard.scss";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import  { getAllNews, deleteNews } from "../../../../services/firebase";
import Loader from '../../../Shared/Loader/Loader';

const NewsAdminCard = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchData = async () => {
    let val = await getAllNews();
    setNews(val);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const deleteNewsHandler = async (obj) => {
    try {
      await deleteNews(obj);
      setLoading(true);
      fetchData();
      } catch(err) {
        console.log(err.message);
      }
  }
  const location = useLocation();
  const renderNews = (obj) => {
    return (
      <div className="news-block">
        <div className="icon-block-div">
        <Popup 
            content = "edit"
            trigger = {
              <img 
                className="icon-btn"
                src={"/asset/images/Home/Admin/NewsNBlogs/edit.png"}
                onClick={() => {
                  
                }}
                alt=""
              />
            }
          />
          <Popup 
            content = "delete"
            trigger = {
              <img 
                className="icon-btn"
                src={"/asset/images/Home/Admin/NewsNBlogs/delete.png"}
                onClick={() => {
                  deleteNewsHandler(obj);
                }}
                alt=""
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
              <p>News</p>
            </div>
            <div className="add-news-btn-div">
                <Link to="/admin/add-news">
                  <button className="add-news-btn">
                    +
                  </button>
                </Link>
            </div>
          </div>
          <SemanticToastContainer />
          {news.map((obj, index) => (
            <div key={index}>{renderNews(obj)}</div>
          ))}
        </div>
      }
    </div>
  );
};

export default NewsAdminCard;
