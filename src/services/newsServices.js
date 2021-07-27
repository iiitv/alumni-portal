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

export const addNews = async (news) => {
    try {
        let url = "", fileName = "";
        if (news.image) {
            fileName = getFileName();
            await handleUpload(news.image, fileName, "news");
            url = await getImageUrl("news", fileName);
        } else {
            url = "/asset/images/NewsAndBlogs/sample-news.png";
        }
        await db.collection("News").add({
            title: news.title,
            image: url,
            date: news.date,
            place: news.place,
            text: news.text,
            fileName: fileName
        })
        console.log("News Added!!")
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const editNews = async (news) => {
    try {
        let url = "", fileName = "";
        if (news.image && news.image !== "/asset/images/NewsAndBlogs/sample-news.png") {
            fileName = getFileName();
            await handleUpload(news.image, fileName, "news");
            url = await getImageUrl("news", fileName);
        } else {
            url = "/asset/images/NewsAndBlogs/sample-news.png";
        }
        await db.collection("News").doc(news.id).update({
            title: news.title,
            image: url,
            date: news.date,
            place: news.place,
            text: news.text,
            fileName: fileName,
        });
    } catch (e) {
        console.log(e.message);
        return e.message;
    }
}

export const deleteNews = async (news) => {
    try {
        await db.collection("News").doc(news.id).delete();
        console.log("News Deleted Successfully!");
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getAllNews = async () => {
    try {
        let data = [];
        let ref = await db.collection("News").get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                heading: doc.data().title,
                body: doc.data().text,
                date: doc.data().date,
                place: doc.data().place,
                img: doc.data().image,
                fileName: doc.data().fileName
            })
        })
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all news");
    }
}


export const getParticularNews = async (id) => {
    try {
        let data;
        let doc = await db.collection("News").doc(id).get();
        if(!doc.exists) return null;
        data = {
            id: doc.id,
            heading: doc.data().title,
            body: doc.data().text,
            date: doc.data().date,
            place: doc.data().place,
            img: doc.data().image,
            fileName: doc.data().fileName
        }
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing particular news");
    }
}

export const getDashboardNews = async()=>{
    try {
        let data = [];
        let ref = await db.collection("News").orderBy("date","desc").limit(4).get();
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
        console.log("Error while accessing dashboard news");
    }
}