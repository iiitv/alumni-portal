import { Icon, Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Dropdown } from 'semantic-ui-react'
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { editAlumni, getBatches } from "../../../../services/alumniServices";

const EditAlumni = (props) => {
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
    id: "",
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

  useEffect(() => {
    if(props.location.alumni) {
      console.log("hi mf from if");
      setProfile({
        id: props.location.alumni.id,
        batch:props.location.alumni.batch,
        name: props.location.alumni.name,
        studentId: props.location.alumni.studentId,
        email: props.location.alumni.email,
        city: props.location.alumni.city,
        company: props.location.alumni.company,
        description: props.location.alumni.description,
        linkedin: props.location.alumni.linkedin,
        twitter: props.location.alumni.twitter,
        gender: props.location.alumni.gender,
        image: props.location.alumni.image,
      });
    } else setredirect("/admin/alumni")
    if (!user && !isLoading) {
      setredirect("/admin-login");
    }
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
    await editAlumni(profile); 
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
      <p>nksdckdsjk</p>
      {isLoading && <Loader />}
      {!isLoading &&  (
        <div>
          <h2 className="heading">Add Alumni</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="name">BATCH* -</label>
            <Dropdown
              placeholder='Select Batch'
              selection
              button
              name="batch"
              header= 'BATCHES'
              options={batch}
              onChange={setInfoDropdown}
              defaultValue={profile.batch}
              required
            />
            
            <label htmlFor="name">Name* -</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={setInfo}
              defaultValue={profile.name}
              required
            />
            <label htmlFor="studentId">Institute ID* -</label>
            <input
              type="text"
              name="studentId"
              id="studentId"
              onChange={setInfo}
              required
              defaultValue={profile.studentId}
            />  

            <label htmlFor="email">Email* - </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={setInfo}
              required
              defaultValue={profile.email}
            />

            <label htmlFor="city">City* -</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={setInfo}
              required
              defaultValue={profile.city}
            />

            <label htmlFor="company">Company/Work* - </label>
            <input
              type="text"
              name="company"
              id="company"
              onChange={setInfo}
              required
              defaultValue={profile.company}
            />

            <label htmlFor="description">Description* - </label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={setInfo}
              required
              defaultValue={profile.description}
            />

            <label htmlFor="linkedin">LinkedIn Profile - </label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              onChange={setInfo}
              defaultValue={profile.linkedin}
            />
          
            <label htmlFor="twitter">Twitter Profile - </label>
            <input
              type="text"
              name="twitter"
              id="twitter"
              onChange={setInfo}
              defaultValue={profile.twitter}
            />

              <label htmlFor="name">Gender* -</label>
              <Dropdown
                placeholder='Select Gender'
                selection
                button
                name="gender"
                header= 'gender'
                options={genderOption}
                onChange={setInfoDropdown}
                defaultValue={profile.gender}
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
                // defaultValue={profile.image}
              ></input>
            </p>
            {url && (
              <p className="img-par">
                <img className="preview-img" src={url} alt="hello"></img>
              </p>
            )}  



            <p className="btn-parent">
              {addingAlumni ? (
                <button className="upload-img-btn">Editing ...</button>
              ) : (
                <button className="upload-img-btn" onClick={handleSubmit}>
                  Save Changes
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

export default EditAlumni;