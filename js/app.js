import { fetchProducts } from "./api.js";
import { renderProducts } from "./ui.js";

async function init() {
  const products = await fetchProducts();
  renderProducts(products);
}

init();
