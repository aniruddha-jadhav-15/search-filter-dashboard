import { fetchProducts } from "./api.js";
import { renderProducts } from "./ui.js";
import { debounce } from "./debounce.js";

const searchInput = document.querySelector("#searchInput");

let allProducts;

async function init() {
  allProducts = (await fetchProducts()).products;
  renderProducts(allProducts);
}

init();

function handleSearch(evt) {
  let searchText = evt.target.value.toLowerCase();
  console.log(allProducts);

  const filteredProducts = allProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchText);
  });

  renderProducts(filteredProducts);
}

const debouncedSearch = debounce(handleSearch, 300);

searchInput.addEventListener("input", debouncedSearch);
