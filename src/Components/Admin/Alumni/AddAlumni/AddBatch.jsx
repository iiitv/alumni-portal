// import "./AddBlog.scss";
import { Message, Form } from "semantic-ui-react";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../providers/UserProvider";
import Loader from "../../../Shared/Loader/Loader";
import { addBatch } from "../../../../services/alumniServices";

const AddBatch = () => {
  const history = useHistory();
  const info = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoading } = info;
  const [addingBatch, setAddingBatch] = useState(false);
  const [redirect, setredirect] = useState(null);

  const [batch, setBatch] = useState({
    key: "",
    text: "",
    value: "",
  });

  useEffect(() => {
    if (!user && !isLoading) {
      setredirect("/admin-login");
    }
  }, [user, isLoading]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const setInfo = (e) => {
    setBatch({
      ...batch,
      key: e.target.value.trim(),
      text: e.target.value.trim(),
      value: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingBatch(true);
    try {
      await addBatch(batch); 
    } catch(err) {
      setErrorMessage(err.message);
    }
    history.goBack();
  };


  //temp
  

  return (
    <div className="add-news">
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          <h2 className="heading">Add Batch</h2>
          <p className="line"></p>
          <Form error={!!errorMessage}>
            <label htmlFor="batch">Add Batch Year (ex - 2021. 2023, 2024)</label>
            <input
              type="text"
              name="batch"
              id="batch"
              onChange={setInfo}
              required
            />
            
            <p className="btn-parent">
              {addingBatch ? (
                <button className="upload-img-btn">Adding...</button>
              ) : (
                <button className="upload-img-btn" onClick={handleSubmit}>
                  Add batch
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

export default AddBatch;
