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

export const deleteBlog = async (blog) => {
    try {
        await db.collection("Blogs").doc(blog.id).delete();
        console.log("Blogs Deleted Successfully!");
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const editBlog = async (blog) => {
    try {
        let url = "", fileName = "";
        if (blog.image && blog.image !== "/asset/images/NewsAndBlogs/sample-news.png") {
            fileName = getFileName();
            await handleUpload(blog.image, fileName, "blog");
            url = await getImageUrl("blog", fileName);
        } else {
            url = "/asset/images/NewsAndBlogs/sample-news.png";
        }
        await db.collection("Blogs").doc(blog.id).update({
            title: blog.title,
            image: url,
            date: blog.date,
            text: blog.text,
            fileName: fileName,
            author: blog.author,
        });
    } catch (e) {
        console.log(e.message);
        return e.message;
    }
}

export const getAllBlog = async () => {
    try {
        let data = [];
        let ref = await db.collection("Blogs").get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                heading: doc.data().title,
                body: doc.data().text,
                date: doc.data().date,
                img: doc.data().image,
                author: doc.data().author,
                fileName: doc.data().fileName
            })
        })
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all blogs");
    }
}

export const getParticularBlog = async (id) => {
    try {
        let data;
        let doc = await db.collection("Blogs").doc(id).get();
        if(!doc.exists) return null;
        data = {
            id: doc.id,
            heading: doc.data().title,
            body: doc.data().text,
            date: doc.data().date,
            author: doc.data().author,
            img: doc.data().image,
            fileName: doc.data().fileName
        }
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing particular blog");
    }
}


export const getDashboardBlogs = async()=>{
    try {
        let data = [];
        let ref = await db.collection("Blogs").orderBy("date","desc").limit(4).get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                heading: doc.data().title,
                date: doc.data().date,
            })
        })
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing dashboard blog");
    }
}