/** @format */

import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBylijBM2CMC8Li4UM0Az32LXKyvcHte6k",
  authDomain: "storyhub-bd3de.firebaseapp.com",
  databaseURL: "https://storyhub-bd3de.firebaseio.com",
  projectId: "storyhub-bd3de",
  storageBucket: "storyhub-bd3de.appspot.com",
  messagingSenderId: "272606914442",
  appId: "1:272606914442:web:947e25f5618191d8824a73",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
