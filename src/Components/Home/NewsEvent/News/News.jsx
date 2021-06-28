import React from 'react'
import './News.scss';

const News = () => {
  let newsfeed = [
    {date:"25 July 2021",title:"Celebrating 5th alumni meet"},
    {date:"27 July 2021",title:"Seminar on developing scientific temper"},
    {date:"27 July 2021",title:"Alumni Speak : Success with Startup’s"},
    {date:"27 July 2021",title:"Start of IIITV giving month"},
    
  ]
  const renderEvent = (news)=>{
      return (
          <div className="particular-news">
              <div className="news-info">
                  <p className="news-name">{news.title}</p>
              </div>
              <div className="news-time-info">
                  <p className="news-date">{news.date}</p>
              </div>
          </div>
      )
  }
  return(
      <div className="news-card" style={{ backgroundImage: `url(asset/images/Home/Event/bg.png)`  }}>
          <h1 className="news-heading">NewsFeed</h1>
          {newsfeed.map((news,index)=>(
              <div key={index}>
                  {renderEvent(news)}
              </div>
          ))}
      </div>

  )
}

export default News