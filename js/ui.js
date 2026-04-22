const container = document.querySelector("#productContainer");

// Render products on UI
export function renderProducts(products) {
  container.innerHTML = "";
  products.forEach((pro) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
  <div class="img-box">
    <img src="${pro.thumbnail}">
  </div>
  <h3 class="title">${pro.title}</h3>
  <p class="price">${pro.price}</p>
   `;

    container.appendChild(card);
  });
}

// Displays loading state while fetching data
export function showLoading() {
  container.textContent = "Loading products...";
}

// Displays error message when API request fails
export function showError() {
  const btn = document.querySelector(".retry");
  container.textContent = "Something went wrong...";
  btn.style.display = "block";
}
