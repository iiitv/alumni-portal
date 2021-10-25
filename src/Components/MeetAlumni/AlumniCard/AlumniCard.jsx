import "./AlumniCard.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect, React } from "react";
import { Dropdown } from 'semantic-ui-react'
import Loader from '../../Shared/Loader/Loader';
import { getBatchProfiles, getBatches } from "../../../services/alumniServices";

const AlumniCard = () => {

  const [isLoading, setLoading] = useState(true);
  const [batch, setBatch] = useState([]);
  const [profile, setProfile] = useState([]);
  let [presentBatch, setPresentBatch] =useState("2017");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let val = await getBatches();
    setBatch(val);
    let profiles =await getBatchProfiles("2017");
    setProfile(profiles);
    setLoading(false);
  }
  const batchChange = async(e,{name, value }) =>{
    let profiles =await getBatchProfiles(value);
    setProfile(profiles);
    setPresentBatch(value);
  }

  const renderAlumniCard = (alumni) => {
    return (
      <div className="alumni-card">
        <div className="alumni-image">
          <img
            src={alumni.image}
            alt={alumni.studentId}
            className="profile-card-image"
          />
        </div>
        <div className="alumni-card-info">
          <h2 className="alumni-name">
            <NavLink to={`/alumni/${alumni.batch}/${alumni.id}`}>{alumni.name}</NavLink>
          </h2>
          <p>Batch- {alumni.batch} </p>
          <p>
            {alumni.company} | {alumni.city}
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
            placeholder='Select Batch'
            selection
            button
            header= 'BATCHES'
            options={batch}
            onChange={batchChange}
           />
        </div>
        <h3> Strength - {profile.length}</h3>
        <h1>
          Batch of <strong className="batch-year">{presentBatch}</strong>
        </h1>
      </div>
    );
  };

  return (
    <div >
      {isLoading && <Loader />}
      {!isLoading &&
        <div className="alumni-card-wrap">
          <div className="alumni-dir-head">
            <h1>Alumni Directory</h1>
          </div>
          <div className="head">
            <div>{selectionBatch()}</div>
          </div>
          <div className="alumni-card-area">
            {profile.map((alumni, index) => (
              <div key={index}>{renderAlumniCard(alumni)}</div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default AlumniCard;
