import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "./NewsBlogsCard.scss";
import { useLocation } from "react-router";
import { getAllNews } from "../../../services/firebase";
import Loader from '../../Shared/Loader/Loader'

const NewsBlogsCard = () => {
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
  const websitePrefix = "https://iiitv-alumni-portal.netlify.app";
  const location = useLocation();
  const copyLink = (id) => {
    let link = websitePrefix + location.pathname + "/" + id;
    navigator.clipboard.writeText(link);
    toast({
      description: <p>Link Copied to Clipboard</p>,
    });
  };
  const renderNews = (obj) => {
    return (
      <div className="news-block">
        <div className="share-news-div">
          <Popup
            content="Copy Link"
            trigger={
              <img
                className="share-news-btn"
                src={"asset/svg/share.svg"}
                onClick={() => {
                  copyLink(obj.id);
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
    <div>
      {isLoading && <Loader />}
      {!isLoading &&
        <div className="all-news-info">
          <SemanticToastContainer />
          {news.map((obj, index) => (
            <div key={index}>{renderNews(obj)}</div>
          ))}
        </div>
      }
    </div>
  );
};

export default NewsBlogsCard;
