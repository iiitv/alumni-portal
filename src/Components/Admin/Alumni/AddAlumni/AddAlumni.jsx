import "./AddAlumni.scss";
import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Dropdown } from 'semantic-ui-react'
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { addAlumni, getBatches } from "../../../../services/alumniServices";

const AddAlumni = () => {
  const history = useHistory();
  const info = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoading } = info;
  const [addingAlumni, setAddingAlumni] = useState(false);
  const [url, setUrl] = useState(null);
  const [redirect, setredirect] = useState(null);
  const [isLoadingBatch, setLoading] = useState(true);
  const [batch, setBatch] = useState([]);
  const [profile, setProfile] = useState({
    batch:"",
    name: "",
    studentId: "",
    email: "",
    city: "",
    company: "",
    description: "",
    linkedin: "",
    twitter: "",
    gender: "",
    image: null,
  });

  const fetchData = async () => {
    let val = await getBatches();
    setBatch(val);
    setLoading(false);
  }

  useEffect(() => {
    if (!user && !isLoading) {
      setredirect("/admin-login");
    }
    fetchData();
  }, [user, isLoading]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleImage = (e) => {
    if (e.target.files) {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setProfile({
        ...profile,
        image: e.target.files[0],
      });
    }
  };

  const setInfo = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const setInfoDropdown = (e,{ name, value }) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingAlumni(true);
    try {
    await addAlumni(profile); 
  } catch(err) {
    setErrorMessage(err.message);
  }
    history.goBack();
  }; 


  const genderOption = [
    { key : 1, text: 'Male', value: "Male"},
    { key: 2, text: 'Female', value: "Female"}
]
  return (
    <div className="add-news">
      {isLoading && <Loader />}
      {!isLoading && !isLoadingBatch && (
        <div>
          <h2 className="heading">Add Alumni</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="name">BATCH* -</label>
            <Dropdown
              placeholder='Select Batch'
              selection
              button
              required
              name="batch"
              header= 'BATCHES'
              options={batch}
              onChange={setInfoDropdown}
            />
            
            <label htmlFor="name">Name* -</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={setInfo}
              required
            />
            <label htmlFor="studentId">Institute ID* -</label>
            <input
              type="text"
              name="studentId"
              id="studentId"
              onChange={setInfo}
              required
            />  

            <label htmlFor="email">Email* - </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={setInfo}
              required
            />

            <label htmlFor="city">City* -</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={setInfo}
              required
            />

            <label htmlFor="company">Company/Work* - </label>
            <input
              type="text"
              name="company"
              id="company"
              onChange={setInfo}
              required
            />

            <label htmlFor="description">Description* - </label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={setInfo}
              required
            />

            <label htmlFor="linkedin">LinkedIn Profile - </label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              onChange={setInfo}
            />
          
            <label htmlFor="twitter">Twitter Profile - </label>
            <input
              type="text"
              name="twitter"
              id="twitter"
              onChange={setInfo}
            />

              <label htmlFor="name">Gender* -</label>
              <Dropdown
                placeholder='Select Gender'
                selection
                required
                button
                name="gender"
                header= 'gender'
                options={genderOption}
                onChange={setInfoDropdown}
              />

            <p className="btn-parent">
              <label className="upload-img-btn" htmlFor="upload-img">
                <Icon name="cloud upload"></Icon> Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="upload-img"
                onChange={(e) => handleImage(e)}
              ></input>
            </p>
            {url && (
              <p className="img-par">
                <img className="preview-img" src={url} alt="hello"></img>
              </p>
            )}  



            <p className="btn-parent">
              {addingAlumni ? (
                <button className="upload-img-btn">Adding...</button>
              ) : (
                <button className="upload-img-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </p>
            <Message error header="Oops!!" content={errorMessage} />
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddAlumni;
