const container = document.querySelector("#productContainer");

export function renderProducts(products) {
  container.innerHTML = "";
  products.forEach((pro) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <img src="${pro.image}">
   <h3>${pro.title}</h3>
   <p>${pro.price}</p>
   `;

    container.appendChild(card);
  });
}
