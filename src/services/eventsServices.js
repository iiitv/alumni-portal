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

const db = firebase.firestore();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

export const addEvents = async (event) => {
    try {
        await db.collection("Events").add({
            link: event.link,
            name: event.name,
            date: event.date,
            time: event.time,
            venue: event.venue,
            description: event.description,
        })
        console.log("Event successfully Added!!")
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const editEvent = async (event) => {
    try {
        await db.collection("Events").doc(event.id).update({
            name: event.name,
            date: event.date,
            venue: event.venue,
            description: event.description,
            link: event.link,
            time: event.time
        });
    } catch (e) {
        console.log(e.message);
        return e.message;
    }
}

export const deleteEvent = async (event) => {
    try {
        await db.collection("Events").doc(event.id).delete();
        console.log("News Deleted Successfully!");
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getAllEvents = async () => {
    try {
        let data = [];
        let ref = await db.collection("Events").get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                link: doc.data().link,
                date: doc.data().date,
                time: doc.data().time,
                venue: doc.data().venue,
            })
        })
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing all news");
    }
}


export const getParticularEvent = async (id) => {
    try {
        let data;
        let doc = await db.collection("Events").doc(id).get();
        if(!doc.exists) return null;
        data = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            date: doc.data().date,
            venue: doc.data().venue,
            time: doc.data().time,
            link: doc.data().link
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
        let ref = await db.collection("Events").orderBy("date","desc").limit(4).get();
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

export const getNewestEvents = async()=>{
    try {
        let data = [];
        let ref = await db.collection("Events").orderBy("date","desc").limit(2).get();
        ref.forEach((doc) => {
            data.push({
                id: doc.id,
                name: doc.data().name,
                date: doc.data().date,
                link: doc.data().link
            })
        })
        return data;
    } catch (error) {
        console.log(error.message);
        console.log("Error while accessing dashboard news");
    }
}

export const getEventStatus = (date) => {
    let eventDate = new Date(date);
    let currentDate = new Date();
    if (eventDate.getTime() < currentDate.getTime()) return "Past";
    else if (eventDate.getTime() > currentDate.getTime()) return "Future";
    else return "Present";
  };

export const getEventMonth = (date) => {
    return months[new Date(date).getMonth()];
} 

export const getEventDate = (date) => {
    return new Date(date).getDate();
}