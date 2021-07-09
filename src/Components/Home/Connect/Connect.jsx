import React from "react";
import "./Connect.scss";

const connect = () => {
  return (
    <div className="wrapper">
      <div
        className="connect"
        style={{ backgroundImage: ` url(asset/images/Home/homecon.png)`, backgroundSize: 'cover'}}>
        <div className="cont">
          <h1 className="heading">
            Connect with your <br /> classmates on the
            <br /> portal
          </h1>
          <button type="button" className="connect-btn">
            Connect
          </button>
        </div>
      </div>
      <div
        className="knowmore"
        style={{ backgroundImage: `url(asset/images/Home/Event/bg.png)` }}>
        <p className="info">
          - Create a profile
          <br />
          - Browse Members by company,Industry and Location.
          <br />
          - Post jobs and internships
          <br />
          - Share Memories
          <br />
          - Exchange Opportunities and a lot more....
          <br />
        </p>
        <button type="button" className="know-btn">
          Know More
        </button>
      </div>
    </div>
  );
};

export default connect;
