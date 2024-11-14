const baseUrl = "https://www.casio.com";
const productContainer = document.getElementById('product-cards');

// Fetch data from utils/data.json
fetch('utils/data.json')
  .then(response => response.json())
  .then(data => {
    data.data.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const productImageUrl = `${baseUrl}${product.productAssets.path}`;
      const hoverImageUrl = `${baseUrl}${product.productAssetList[1].path}`;

      card.innerHTML = `
        <div class="image-container">
          <img src="${productImageUrl}" alt="${product.dataProductName}" class="product-img">
          <div class="top-left">${product.productCategory}</div>
          <div class="top-right">❤️</div>
        </div>
        <div class="card-details">
          <div class="brand">${product.brandDisp}</div>
          <div class="name">${product.dataProductName}</div>
          <div class="price-label">${product.priceLabel}</div>
          <div class="price">${product.dispPrice}</div>
        </div>
      `;

      // Add hover effect for the product image
      card.querySelector('.product-img').addEventListener('mouseover', function() {
        this.src = hoverImageUrl;
      });

      card.querySelector('.product-img').addEventListener('mouseout', function() {
        this.src = productImageUrl;
      });

      productContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading data:', error));
