import {db} from "./apiConfig"
import { get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function addToWishlist(userID, userObject) {
  if (!userID) {
    userID = generateUUID(); // Generate a new UUID if not provided
    console.log("Generated new UUID for wishlist:", userID);
  }
  set(ref(db, 'users/' + userID), userObject)
    .then(() => {
      console.log("Object written successfully for user ID:", userID);
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

export function getWishList(userID) {
  const userRef = ref(db, 'users/' + userID);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("User data:", snapshot.val());
      } else {
        console.log("No data available for user ID:", userID);
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
// Modify the getWishList function to fetch all users
export function getAllUsers() {
  const usersRef = ref(db, 'users'); // Reference to the parent node 'users'
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("All users data:", snapshot.val()); // Snapshot will contain data of all users
      } else {
        console.log("No data available.");
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
