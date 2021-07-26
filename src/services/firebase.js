import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/auth";
import '@firebase/storage';
import '@firebase/database'
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
var user;
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then((result) => {
        // var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
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

const deleteImage = async (img, folderName) => {
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
        await db.collection("News").doc(news.id).update({
            
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
        return error.message;
    }
}

export const addGalleryImages = async (images, removeImage) => {
    try {
        let fileName = "";
        for (let image of removeImage) {
            deleteImage(image, "gallery");
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
                place: doc.data().place,
                img: doc.data().image,
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