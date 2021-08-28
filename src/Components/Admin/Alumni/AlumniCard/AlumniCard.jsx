import "./AlumniCard.scss";
import { NavLink , Link, Redirect} from "react-router-dom";
import { useState, useEffect, useContext, React } from "react";
import { useLocation } from "react-router";
import { Dropdown, Popup } from 'semantic-ui-react'
import { UserContext } from "../../../../providers/UserProvider";
import { getBatchProfiles, deleteProfile, getBatches } from "../../../../services/alumniServices";


const AlumniCard = () => {

    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [redirect, setredirect] = useState(null);
    const [isLoadingBatch, setLoading] = useState(true);
    const [batch, setBatch] = useState([]);
    const [profile, setProfile] = useState([]);
    const location = useLocation();
    let [presentBatch, setPresentBatch] =useState("2017");

    useEffect(() => {
        if (!user && !isLoading) {
          setredirect("/admin-login");
        }
        fetchData();
      }, [user, isLoading]);
      if (redirect) {
        return <Redirect to={redirect} />;
    }

    const fetchData = async () => {
        let val = await getBatches();
        setBatch(val);
        let profiles =await getBatchProfiles(presentBatch);
        console.log(profiles[0]);
        setProfile(profiles);
        setLoading(false);
    }

    const batchChange = async(e,{name, value }) =>{
        setLoading(true);
        let profiles =await getBatchProfiles(value);
        setProfile(profiles);
        setPresentBatch(value);
        setLoading(false);
    }

    const deleteAlumniProfile = async(alumni) =>{
        try {
            setLoading(true);
            await deleteProfile(alumni);
            fetchData();
        }catch(err) {
            console.log(err.message);
        }
    }

    const renderAlumniCard = (alumni) => {
        return (
            <div className="alumni-card">
                <div className="alumni-card-header">
                <Popup 
                    content = "edit"
                    trigger = {
                    <Link to={{pathname: `/admin/alumni/edit-alumni/${alumni.id}`, alumni: {
                        id: alumni.id,
                        batch: alumni.batch,
                        name: alumni.name,
                        studentId: alumni.studentId,
                        email: alumni.email,
                        city: alumni.city,
                        company: alumni.company,
                        description: alumni.description,
                        linkedin: alumni.linkedin,
                        twitter: alumni.twitter,
                        gender: alumni.gender,
                        image: alumni.image ,
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
                            deleteAlumniProfile(alumni);
                        }}
                        alt="delete-blog"
                    />
                    }
                />
                </div>
                <div className="alumni-image">
                    <img
                        src={alumni.image}
                        alt={alumni.StudentId}
                        className="profile-card-image"
                    />
                </div>
                <div className="alumni-card-info">
                    <h2 className="alumni-name">
                        <NavLink to={`/admin/alumni/${alumni.batch}/${alumni.id}`}>{alumni.name} </NavLink>
                    </h2>
                    <p>Batch- {alumni.batch} </p>
                    <p>{alumni.company} | {alumni.city}</p>
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
                <h1> Batch of <strong className='batch-year'>{presentBatch}</strong></h1>
            </div>
        );
    };

    return (
        <div className="alumni-card-wrap">
            <div className="alumni-dir-head-admin">
                <h1>Alumni Directory</h1>
                <div className="alumni-admin-add-area">
                <Link to="/admin/alumni/add-batch">
                  <button className="alumni-admin-add-btn">Add Batch</button>
                </Link>
                <Link to="/admin/alumni/add-alumni">
                  <button className="alumni-admin-add-btn">Add Alumni</button>
                </Link>
            </div>
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
    );
}

export default AlumniCard;
