// import { addToWishlist } from "./api/wishListApi";
// import { db } from './api/apiConfig';  // Importing the initialized database
// import { get, set, ref } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js';
// Import the addToWishList function from wishlist.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdyyL_TF-A_99KRxlDdRgzRc6_mkDL-0",
  authDomain: "casio-4ac93.firebaseapp.com",
  projectId: "casio-4ac93",
  storageBucket: "casio-4ac93.appspot.com",
  messagingSenderId: "115949092498",
  appId: "1:115949092498:web:d470d2d4a619c00f3eb04b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  // Firebase Database reference

const baseUrl = "https://www.casio.com";
const productContainer = document.getElementById('product-cards');

function sanitizeObjectKeys(obj) {
  const sanitizedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Replace invalid characters (e.g., ".", "#", "$", "/", "[", "]") with underscores
      const sanitizedKey = key.replace(/[.#$/[\]]/g, "_");
      sanitizedObj[sanitizedKey] = obj[key];
    }
  }
  return sanitizedObj;
}

function generateTempID(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  // Allowed characters
  let tempID = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tempID += characters.charAt(randomIndex);
  }
  return tempID;
}
function addToWishlist(userObject) {
  const correctObj = sanitizeObjectKeys(userObject)
  
    let userID = generateTempID(); // Generate a new UUID if not provided
    console.log("Generated new UUID for wishlist:", userID);
  // Use Firebase set to store the user data
  set(ref(db, 'users/' + userID), correctObj)
    .then(() => {
      console.log("Object written successfully for user ID:", userID);
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

// Fetch data from utils/data.json
fetch('utils/data.json')
  .then(response => response.json())
  .then(data => {
    data.data.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('card', 'snap-start', 'flex-shrink-0', 'w-1/2', 'md:w-1/3', 'lg:w-1/4', 'p-0', 'bg-white', 'shadow-lg', 'rounded-lg', 'border', 'border-transparent', 'hover:border-black', 'transition-all', 'duration-300', 'h-[450px]');

      const productImageUrl = `${baseUrl}${product.productAssets.path}`;
      const hoverImageUrl = `${baseUrl}${product.productAssetList[1].path}`;

      card.innerHTML = `
        <div class="image-container relative overflow-hidden h-3/5">
          <img src="${productImageUrl}" alt="${product.dataProductName}" class="product-img transition-all duration-300 ease-in-out w-full h-full object-cover rounded-t-lg">
          <div class="top-left absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 text-sm hover:opacity-0 transition-opacity duration-300">${product.productCategory}</div>
          <div class="top-right absolute top-0 right-0 text-gray-400 hover:text-black p-1 rounded-full text-2xl transition-colors duration-300 wish-icon">&#9825;</div>
        </div>
        <div class="card-details h-2/5 mt-2 text-left p-4">
          <div class="brand font-semibold">${product.brandDisp}</div>
          <div class="name text-gray-700">${product.dataProductName}</div>
          <div class="price-label text-gray-500 text-xs pt-4">MRP:</div>
          <div class="price text-xl font-bold">${product.dispPrice}</div>
        </div>
      `;

      // Add hover effect for the product image
      card.querySelector('.product-img').addEventListener('mouseover', function() {
        this.src = hoverImageUrl;
      });
      card.querySelector('.product-img').addEventListener('mouseout', function() {
        this.src = productImageUrl;
      });

      // Add click listener for the wishlist icon
      card.querySelector(".wish-icon").addEventListener("click", async () => {
        console.log("user object : ",product);
        try {
          await addToWishlist(product);
          alert(`"${product.dataProductName}" added to your wishlist.`);
        } catch (error) {
          console.error("Failed to add to wishlist:", error.message);
          alert("Error adding product to wishlist. Please try again.");
        }
      });

      productContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading data:', error));

// JavaScript for slider functionality
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

leftArrow.addEventListener('click', () => {
  productContainer.scrollBy({
    left: -productContainer.clientWidth,
    behavior: 'smooth'
  });
});

rightArrow.addEventListener('click', () => {
  productContainer.scrollBy({
    left: productContainer.clientWidth,
    behavior: 'smooth'
  });
});
