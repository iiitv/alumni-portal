import { useEffect, useState } from "react";
import { getDashboardNews } from "../../../../services/newsServices";
import { Link } from "react-router-dom";
import "./News.scss";

const News = () => {
  const [newsfeed, setNews] = useState([]);
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchData = async () => {
    let data = await getDashboardNews();
    let tem_news = [];
    data.forEach((news) => {
      let tem_date = news.date;
      let year = tem_date.substr(0, 4);
      let mon = parseInt(tem_date.substr(5, 2));
      let date = tem_date.substr(8, 2);
      let new_date = `${date} ${month[mon]} ${year}`;
      tem_news.push({
        id: news.id,
        date: new_date,
        title: news.heading,
      });
    });
    setNews(tem_news);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const renderEvent = (news) => {
    return (
      <div className="particular-news">
        <div className="news-info">
          <Link to={"news/" + news.id}>
            <p className="news-name">{news.title}</p>
          </Link>
        </div>
        <div className="news-time-info">
          <p className="news-date">{news.date}</p>
        </div>
      </div>
    );
  };
  return (
    <div
      className="news-card"
      style={{ backgroundImage: `url(asset/images/Home/Event/bg.png)` }}
    >
      <h1 className="news-heading">NewsFeed</h1>
      {newsfeed.map((news, index) => (
        <div key={index}>{renderEvent(news)}</div>
      ))}
    </div>
  );
};

export default News;
