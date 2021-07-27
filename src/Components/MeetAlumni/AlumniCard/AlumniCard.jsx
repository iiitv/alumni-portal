import "./AlumniCard.scss";
import { NavLink } from "react-router-dom";
import React from "react";
import { Dropdown } from "semantic-ui-react";

const AlumniCard = () => {
  let alumnis = [
    {
      name: "Ayush Patel",
      batch: 2017,
      present: "Company",
      city: "Lucknow",
      image: "/asset/images/MeetAlumni/man.png",
      id: 1,
    },
    {
      name: "Nitanshu Lokhende",
      batch: 2017,
      present: "Amazon",
      city: "Indore",
      image: "/asset/images/MeetAlumni/man.png",
      id: 2,
    },
    {
      name: "Aakash",
      batch: 2017,
      present: "Amazon",
      city: "Lucknow",
      image: "/asset/images/MeetAlumni/man.png",
      id: 3,
    },
    {
      name: "Kunal",
      batch: 2017,
      present: "Google",
      city: "Pune",
      image: "/asset/images/MeetAlumni/man.png",
      id: 4,
    },
    {
      name: "July",
      batch: 2017,
      present: "TCS",
      city: "Hyderabad",
      image: "/asset/images/MeetAlumni/man.png",
      id: 5,
    },
    {
      name: "Kriti",
      batch: 2017,
      present: "Adobe",
      city: "Delhi",
      image: "/asset/images/MeetAlumni/man.png",
      id: 6,
    },
  ];

  const friendOptions = [
    {
      key: "2017",
      text: "2017",
      value: "2017",
    },
    {
      key: "2018",
      text: "2018",
      value: "2018",
    },
    {
      key: "2019",
      text: "2019",
      value: "2019",
    },
    {
      key: "2020",
      text: "2020",
      value: "2020",
    },
    {
      key: "2021",
      text: "2021",
      value: "2021",
    },
  ];

  const renderAlumniCard = (alumni) => {
    return (
      <div className="alumni-card">
        <div className="alumni-image">
          <img
            src={alumni.image}
            alt={alumni.id}
            className="profile-card-image"
          />
        </div>
        <div className="alumni-card-info">
          <h2 className="alumni-name">
            <NavLink to={`/alumni/${alumni.id}`}>{alumni.name}</NavLink>
          </h2>
          <p>Batch- {alumni.batch} </p>
          <p>
            {alumni.present} | {alumni.city}
          </p>
        </div>
      </div>
    );
  };

  const selectionBatch = () => {
    return (
      <div className="alumni-batch-select">
        <div className="dropdown-alumni-batch">
          <Dropdown
            placeholder="Select Batch"
            selection
            button
            header="BATCHES"
            options={friendOptions}
          />
        </div>
        <h3> Strength - 120</h3>
        <h1>
          Batch of <strong className="batch-year">2023</strong>
        </h1>
      </div>
    );
  };

  return (
    <div className="alumni-card-wrap">
      <div className="alumni-dir-head">
        <h1>Alumni Directory</h1>
      </div>
      <div className="head">
        <div>{selectionBatch()}</div>
      </div>
      <div className="alumni-card-area">
        {alumnis.map((alumni, index) => (
          <div key={index}>{renderAlumniCard(alumni)}</div>
        ))}
      </div>
    </div>
  );
};

export default AlumniCard;
