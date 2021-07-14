import './AddNews.scss';
import { Icon } from 'semantic-ui-react'
import {useState} from 'react';

const AddNews = ()=>{
    const [url,setUrl] = useState(null);
    const handleImage = (e)=>{
        if(e.target.files){
            setUrl(URL.createObjectURL(e.target.files[0]));
            console.log(e.target.files[0])
        }
    }
    return (
        <div className="add-news">
            <h2 className="heading">Add News</h2>
            <p className="line"></p>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title"/>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date"/>
            <label htmlFor="place">Place</label>
            <input type="text" name="place" id="place"/>
            <label htmlFor="text">Text</label>
            <textarea name="text" id="text"></textarea>
            <p className="btn-parent">
                <label  className="upload-img-btn" htmlFor="upload-img">
                    <Icon name="cloud upload"></Icon> Upload Image
                </label>
                <input type="file" accept="image/*" id="upload-img" onChange={(e)=>handleImage(e)}></input>
            </p>
            {url && <p className="img-par"><img className="preview-img" src={url} alt="hello"></img></p>}
            <p className="line"></p>
            <p className="btn-parent">
                <button className="upload-img-btn">
                    Submit
                </button>
            </p>
        </div>
    );
}

export default AddNews;