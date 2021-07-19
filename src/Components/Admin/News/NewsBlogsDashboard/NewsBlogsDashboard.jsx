import React from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import "./NewsBlogsDashboard.scss";
import { useLocation } from "react-router";

const NewsBlogsAdminCard = () => {
  let news = [
    {
      id: 1,
      heading: "Startup funding",
      body: "Blandit turpis cursus in hac habitasse platea dictumst. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Ut enim blandit volutpat maecenas. . Sit amet facilisis magna etiam tempor.....",
      date: "20 June 2020",
      place: " IIIT Vadodara",
      img: "/asset/images/NewsAndBlogs/sample-news.png",
    },
    {
      id: 2,
      heading: "IIIT Vadodara anounces alumni portal",
      body: "Blandit turpis cursus in hac habitasse platea dictumst. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Ut enim blandit volutpat maecenas. . Sit amet facilisis magna etiam tempor.....",
      date: "20 June 2020",
      place: " IIIT Vadodara",
      img: "/asset/images/NewsAndBlogs/sample-news.png",
    },
    {
      id: 3,
      heading: "Connections at IIITV",
      body: "Blandit turpis cursus in hac habitasse platea dictumst. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Ut enim blandit volutpat maecenas. . Sit amet facilisis magna etiam tempor.....",
      date: "20 June 2020",
      place: " IIIT Vadodara",
      img: "/asset/images/NewsAndBlogs/sample-news.png",
    },
    {
      id: 4,
      heading: "Job Fair at IIIT Vadodara",
      body: "Blandit turpis cursus in hac habitasse platea dictumst. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Ut enim blandit volutpat maecenas. . Sit amet facilisis magna etiam tempor.....",
      date: "20 June 2020",
      place: " IIIT Vadodara",
      img: "/asset/images/NewsAndBlogs/sample-news.png",
    },
    {
      id: 5,
      heading: "Idea turns into reality at IIITV",
      body: "Blandit turpis cursus in hac habitasse platea dictumst. Venenatis a condimentum vitae sapien pellentesque habitant morbi. Ut enim blandit volutpat maecenas. . Sit amet facilisis magna etiam tempor.....",
      date: "20 June 2020",
      place: " IIIT Vadodara",
      img: "/asset/images/NewsAndBlogs/sample-news.png",
    },
  ];
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
            <p className="news-body">{obj.body}</p>
          </div>
          <div className="news-image-div eq-h">
            <img src={obj.img} alt="sample-news.png" className="news-image" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="all-news-info">
      <SemanticToastContainer />
      {news.map((obj, index) => (
        <div key={index}>{renderNews(obj)}</div>
      ))}
    </div>
  );
};

export default NewsBlogsAdminCard;
