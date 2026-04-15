const container = document.querySelector("#productContainer");

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


