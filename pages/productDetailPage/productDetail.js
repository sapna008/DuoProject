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


// Extract productId from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
console.log("productId : ",productId);


// Define base URL for product image/model paths
const baseURL = "https://www.casio.com";

function getProduct(productId) {
  const userRef = ref(db, 'product/' + productId);
  get(userRef)
    .then(snapshot => {
      if (snapshot.exists()) {
        const product = snapshot.val();
        console.log("product",product);
        updateUI(product);
      } else {
        console.error("No data available for product ID:", productId);
        document.getElementById('productName').innerText = "Product Not Found";
      }
    })
    .catch(error => {
      console.error("Error reading data:", error);
    });
}

function updateUI(product) {
  document.getElementById('productImage').src = baseURL + product.productAssets.path;
  document.getElementById('productName').innerText = product.productName;
  document.getElementById('brandDisp').innerText = product.brandDisp;
  document.getElementById('dispPrice').innerText = product.dispPrice;
  document.getElementById('productCategory').innerText = product.productCategory;
  document.getElementById('model').innerText = product.model.replace('/content/dam', baseURL);
  document.getElementById('sku').innerText = product.sku;
  document.getElementById('productLink').href = product.url;
}

// Fetch the product data
if (productId) {
  getProduct(productId);
} else {
  console.error("Product ID is missing in the URL");
  document.getElementById('productName').innerText = "Invalid Product ID";
}
