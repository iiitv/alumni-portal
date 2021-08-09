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

export const addBatch = async (batch) => {
  try {
    await db.collection("Alumni").doc(batch.key).set({
        key: batch.key,
        text: batch.text,
        value: batch.value,
    }).then((response) => console.log(response))
    console.log("Batch Added!!") 
  } catch (error) {
      console.log(error.message);
      return error.message;
  }
}


export const addAlumni = async (profile) => {
    try {
      let url = "", fileName = "";
      if (profile.image) {
          fileName = getFileName();
          await handleUpload(profile.image, fileName, "profile");
          url = await getImageUrl("profile", fileName);
      } else {
        if(profile.gender === 'Male'){
          url = "/asset/images/MeetAlumni/male.png";
        }else{
          url = "/asset/images/MeetAlumni/female.png";
        }
      }
      await db.collection("Alumni").doc(profile.batch).collection("Students").add({
        batch: profile.batch,
        name: profile.name,
        studentId: profile.studentId,
        email: profile.email,
        city: profile.city,
        company: profile.company,
        description: profile.description,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        gender: profile.gender,
        image: url,
      }).then((response) => console.log(response))
      console.log("Alumni Profile Added!!") 
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getBatches = async() => {
    try {
        let data = [];
        let ref = await db.collection("Alumni").get();  
        ref.forEach((doc) => {
            data.push({
                key: doc.data().key,
                text: doc.data().text,
                value: doc.data().value,
            })
        })
        return data;
      } catch (error) {
          console.log(error.message);
          return error.message;
      }
}

export const getBatchProfiles = async(batch) => {
  try {
      let data = [];
      let ref = await db.collection("Alumni").doc(batch).collection("Students").orderBy("name","asc").get();  
      ref.forEach((doc) => {
          data.push({
            id: doc.id,
            batch: doc.data().batch,
            name: doc.data().name,
            studentId: doc.data().studentId,
            email: doc.data().email,
            city: doc.data().city,
            company: doc.data().company,
            description: doc.data().description,
            linkedin: doc.data().linkedin,
            twitter: doc.data().twitter,
            gender: doc.data().gender,
            image: doc.data().image ,
          })
      })
      return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
export const deleteProfile = async(profile) => {
  try {
    await db.collection("Alumni").doc(profile.batch).collection("Students").doc(profile.id).delete();
    console.log("Profile Deleted Successfully!");
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}



export const editAlumni = async (profile) => {
  try {
    let url = "", fileName = "";
    if (profile.image !== "/asset/images/MeetAlumni/female.png" && profile.image !== "/asset/images/MeetAlumni/male.png") {
        fileName = getFileName();
        await handleUpload(profile.image, fileName, "profile");
        url = await getImageUrl("profile", fileName);
    } else {
      if(profile.gender === 'Male'){
        url = "/asset/images/MeetAlumni/male.png";
      }else{
        url = "/asset/images/MeetAlumni/female.png";
      }
    }
    await db.collection("Alumni").doc(profile.batch).collection("Students").doc(profile.id).update({
      batch: profile.batch,
      name: profile.name,
      studentId: profile.studentId,
      email: profile.email,
      city: profile.city,
      company: profile.company,
      description: profile.description,
      linkedin: profile.linkedin,
      twitter: profile.twitter,
      gender: profile.gender,
      image: url,
    }).then((response) => console.log(response))
    console.log("Alumni Profile Added!!") 
  } catch (error) {
      console.log(error.message);
      return error.message;
  }
}

export const getParticularAlumniInfo = async (batch, id) => {
  try {
    let data;
    let doc = await db.collection("Alumni").doc(batch).collection("Students").doc(id).get();
    if(!doc.exists) return null;
    data = {
      batch: doc.data().batch,
      name: doc.data().name,
      studentId: doc.data().studentId,
      city: doc.data().city,
      company: doc.data().company,
      description: doc.data().description,
      linkedin: doc.data().linkedin,
      twitter: doc.data().twitter,
      image: doc.data().url,
    }
    return data;
} catch (error) {
    console.log(error.message);
    console.log("Error while accessing particular blog");
}
}