import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import '@firebase/storage';
import '@firebase/database'
import "firebase/firestore";
import { getFileName, handleUpload, getImageUrl } from "./utils";
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

const db = firebase.firestore();

export const addBlogs = async (blog) => {
    try {
        let url = "", fileName = "";
        if (blog.image) {
            fileName = getFileName();
            await handleUpload(blog.image, fileName, "blogs");
            url = await getImageUrl("blogs", fileName);
        } else {
            url = "/asset/images/NewsAndBlogs/sample-news.png";
        }
        await db.collection("Blogs").add({
            title: blog.title,
            image: url,
            date: blog.date,
            text: blog.text,
            fileName: fileName,
            author: blog.author,
        }).then((response) => console.log(response))
        console.log("Blog Added!!")
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
