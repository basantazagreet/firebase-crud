import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, onSnapshot,query, where, orderBy,
  serverTimestamp, getDoc, updateDoc
 } from 'firebase/firestore';
 import {getAuth, createUserWithEmailAndPassword, signOut,
   signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4_BFxhz2bqeBnSCOTlQ6RXGNd4reYL0E",
  authDomain: "first-firebase-app-e70a8.firebaseapp.com",
  projectId: "first-firebase-app-e70a8",
  storageBucket: "first-firebase-app-e70a8.appspot.com",
  messagingSenderId: "353292224535",
  appId: "1:353292224535:web:68f5128ffc42682755b452",
  measurementId: "G-NT9RZ9023K"
};

//init firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

//collection reference
const colRef = collection(db, 'Books');

//queries
// const q = query(colRef, where("author", "==", "Basanta"),orderBy('title' , 'desc') );
const q = query(colRef ,orderBy('createdAt' ));



//get collection data
/*
getDocs(colRef)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message)
  })
*/

//harek change ma run huncha. first argument is ref or query obj
// onSnapshot(q, (snapshot)=>{
//   let books = [];

//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id })
//     });
//     console.log(books);
  
// })



// realtime collection data
const unsubCol = onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})





//add book    
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(()=>{
    addBookForm.reset();
  })

})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const docRef = doc(db, 'Books', deleteBookForm.id.value); 
  deleteDoc(docRef)
  .then(()=>{
    deleteBookForm.reset();
  })

})


//get a single doc
const docRef = doc(db, 'Books' , 'lFuhcmafLBQzka4wzBBe');

// getDoc(docRef)
//   .then((doc) => {
//     console.log(doc.data(), doc.id);
//   })

const unsubDoc =  onSnapshot(docRef, (doc)=>{
  console.log(doc.data(), doc.id)
})  


//update a doc

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit' , (e)=>{
  e.preventDefault();
  let docRef = doc(db, 'Books', updateForm.id.value);

  updateDoc(docRef, {
    title : "Aarkai title"
  })
  .then(()=>{
    updateForm.reset();
  })

})


//Auth

const auth = getAuth();

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit' , (e)=>{
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password  )
    .then((cred) => {
      // console.log('User created:', cred.user);
      signupForm.reset();
    })
    .catch(err=> {
      console.log(err.message);
    });
})




// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
  .then(()=>{
    // console.log("User signed out");
  })
  .catch(err=>{
    console.log(err.message)
  })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log("USer logged in: " , cred.user);
  } )
  .catch(err=>{
    console.log(err.message);
  })

})


const unsubAuth = onAuthStateChanged(auth, (user)=>{
  console.log("User status changed : ", user);
})


const unSubBtn = document.querySelector('.unsub');
unSubBtn.addEventListener('click' , ()=>{
  console.log("Unsubscribing");
  unsubCol();
  unsubDoc();
  unsubAuth();

})