import './Gallery.scss';
import { Icon } from 'semantic-ui-react';
import { useState, useEffect, useContext } from 'react';
import { addGalleryImages, getGalleryImages } from '../../../services/galleryServices';
import Loader from '../../Shared/Loader/Loader'
import { UserContext } from "../../../providers/UserProvider";
import { Redirect, useHistory } from 'react-router-dom';

const Gallery = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [images, setImages] = useState([]);
    const [uploadedImage, setUploadedImage] = useState([]);
    let [count, setCount] = useState(0);
    const [change, setChange] = useState(false);
    const [isAdding, setAdding] = useState(false);
    const info = useContext(UserContext);
    const { user, isLoading } = info;
    const [redirect, setredirect] = useState(null);
    const [removeImage, setRemoveImage] = useState([]);
    const [isFetch, setFetch] = useState(false);

    const fetchData = async () => {
        try {
            var sliderImages = await getGalleryImages();
        }
        catch (err) {
            setErrorMessage(err);
            console.log("error while fetching images", err);
        }
        setUploadedImage(sliderImages);
        setFetch(true);
    }
    useEffect(() => {
        if (!user && !isLoading) {
            setredirect('/admin-login')
        }
        if (!isLoading && user) {
            fetchData();
        }
    }, [user, isLoading])

    if (redirect) {
        return <Redirect to={redirect} />
    }

    const handleChange = (e) => {
        if (e.target.files) {
            setImages([...images, { url: e.target.files[0], id: count }]);
            setCount(count + 1);
            setChange(true);
            document.getElementById("upload-img").value = "";
        }
    }
    const handleDeleteImg = (id) => {
        setImages(images.filter((img) => img.id !== id))
        setChange(true);
    }
    const handleDeleteUploadImg = (id, name) => {
        setUploadedImage(uploadedImage.filter((img) => img.id !== id))
        setRemoveImage([...removeImage, name]);
        setChange(true);
    }
    const showImage = (file) => {
        return (
            <div className="admin-slider-img" key={file.id}>
                <img src={URL.createObjectURL(file.url)} alt="Gallery" />
                <p className="delete-img" onClick={() => handleDeleteImg(file.id)}><Icon name="delete"></Icon></p>
            </div>
        );
    }
    const showUploadedImage = (file) => {
        return (
            <div className="admin-slider-img" key={file.id}>
                <img src={file.url} alt="Gallery" />
                <p className="delete-img" onClick={() => handleDeleteUploadImg(file.id, file.name)}><Icon name="delete"></Icon></p>
            </div>
        );
    }
    const saveImage = async () => {
        setAdding(true);
        try {
            await addGalleryImages(images, removeImage);
        } catch (error) {
            setErrorMessage(error.message);
        }
        history.push("dashboard")
    }
    return (
        <div>
            {(isLoading || !isFetch) && <Loader />}
            {!isLoading && isFetch && <div className="admin-slider">
                <h2>Gallery</h2>
                <label className="add-btn" htmlFor="upload-img">
                    <Icon name="add"></Icon> Add Images
                </label>
                <input type="file" accept="image/*" id="upload-img" onChange={handleChange}></input>
                <div className="wrapper">
                    {uploadedImage.map((img) => showUploadedImage(img))}
                    {images.map((img) => showImage(img))}
                </div>
                {change && <p className="btn-parent">
                    {isAdding ? <button className="upload-img-btn">Saving...</button> : <button className="upload-img-btn" onClick={saveImage}>Save Changes</button>}
                </p>}
            </div>}
        </div>
    );
}

export default Gallery;