import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import '@firebase/storage';
import '@firebase/database'
import "firebase/firestore";
dotenv.config();

if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
    });
} 

export const getImageUrl = async (folderName, fileName) => {
    let url = await firebase.storage().ref(folderName).child(fileName).getDownloadURL();
    return url;
}

export const handleUpload = async (image, fileName, folderName) => {
    await firebase.storage().ref(`${folderName}/${fileName}`).put(image);
}

export const getFileName = () => {
    let fileName = String(Date.now()) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10);
    return fileName;
}

export const deleteImage = async (img, folderName) => {
    // Create a reference to the file to delete
    var imageRef = firebase.storage().ref(folderName).child(img);
    // Delete the file
    try {
    await imageRef.delete(); 
    } catch(err) {
        console.log("Error while deleting images", err);
        return err.message;
    }
    console.log("Image Deleted Successfully")
}

export const getLink = (link) => {
    if(link.includes("http://") || link.includes("https://")) return link;
    else return "https://" + link;
}