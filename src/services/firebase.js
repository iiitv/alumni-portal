import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import '@firebase/storage';
import "firebase/firestore";
dotenv.config();

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
});

const db = firebase.firestore();
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then((result) => {
        // var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
    }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        console.log(errorMessage);
    });
}

export const signOut = () => {
    firebase.auth().signOut().then(() => {
        console.log("Sign out successfully");
    }).catch((error) => {
        console.log("Error Occured While signing out!!");
        console.log(error.message);
    });
}

export const isAdmin = (email) => {
    const adminEmail = [
        "201951038@iiitvadodara.ac.in",
        "201951052@iiitvadodara.ac.in",
        "201951080@iiitvadodara.ac.in",
        "201951107@iiitvadodara.ac.in",
        "201951198@iiitvadodara.ac.in"
    ]
    return adminEmail.some((admin) => admin === email);
}

const getImageUrl = async (folderName, fileName) => {
    let url = await firebase.storage().ref(folderName).child(fileName).getDownloadURL();
    return url;
}

const handleUpload = async (image, fileName, folderName) => {
    await firebase.storage().ref(`${folderName}/${fileName}`).put(image);
}

const getFileName = () => {
    let fileName = String(Date.now()) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10) + parseInt(Math.random() * 10);
    return fileName;
}

const deleteImage = async (img,folderName) => {
    // Create a reference to the file to delete
    var imageRef = firebase.storage().ref(folderName).child(img);
    // Delete the file
    await imageRef.delete();
    console.log("Image Deleted Successfully")
}

export const addNews = async (news) => {
    try {
        let url = "", fileName = "";
        if (news.image) {
            fileName = getFileName();
            await handleUpload(news.image, fileName, "news");
            url = await getImageUrl("news", fileName);
        } else {
            url = "asset/images/NewsAndBlogs/sample-news.png";
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
    }
}

export const addBlogs = async (blog) => {
    try {
        let url = "", fileName = "";
        if (blog.image) {
            fileName = getFileName();
            await handleUpload(blog.image, fileName, "blogs");
            url = await getImageUrl("blogs", fileName);
        } else {
            url = "asset/images/NewsAndBlogs/sample-news.png";
        }
        await db.collection("Blogs").add({
            title: blog.title,
            image: url,
            date: blog.date,
            place: blog.place,
            text: blog.text,
            fileName: fileName
        })
        console.log("Blog Added!!")
    } catch (error) {
        console.log(error.message);
    }
}

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
    }
}

export const addSliderImages = async (images,removeImage) => {
    try {
        let fileName = "";
        for(let image of removeImage){
            deleteImage(image,"slider");
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
    }
}

export const getGalleryImages = async () => {
    try {
        let data = [];
        var listRef = firebase.storage().ref().child('gallery');
        let res = await listRef.listAll();
        for (let i = 0; i < res.items.length; i++) {
            let itemRef = res.items[i];
            let name = itemRef.name;
            let url = await getImageUrl("gallery", name);
            data.push({ name, url, id: i });
        }
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export const addGalleryImages = async (images,removeImage) => {
    try {
        let fileName = "";
        for(let image of removeImage){
            deleteImage(image,"gallery");
        }
        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            fileName = getFileName();
            await handleUpload(img.url, fileName, "gallery");
        }
        console.log("gallery Images Added!!")
    } catch (error) {
        console.log("Error while uploading gallery images")
        console.log(error.message);
    }
}
