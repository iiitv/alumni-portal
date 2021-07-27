import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import '@firebase/storage';
import '@firebase/database'
import "firebase/firestore";
import { getFileName, handleUpload, getImageUrl, deleteImage } from "./utils";
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

// const db = firebase.firestore();

export const getSliderImages = async () => {
    try {
        let data = [];
        var listRef = firebase.storage().ref().child('slider');
        let res = await listRef.listAll();
        for (let i = 0; i < res.items.length; i++) {
            let itemRef = res.items[i];
            let name = itemRef.name;
            let url = await getImageUrl("slider", name);
            data.push({ name, url, id: i });
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const addSliderImages = async (images, removeImage) => {
    try {
        let fileName = "";
        for (let image of removeImage) {
            deleteImage(image, "slider");
        }
        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            fileName = getFileName();
            await handleUpload(img.url, fileName, "slider");
        }
        console.log("Slider Images Added!!")
    } catch (error) {
        console.log("Error while uploading slider images")
        console.log(error.message);
        return error.message;
    }
}