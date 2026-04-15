import { fetchProducts } from "./api.js";
import { renderProducts } from "./ui.js";
import { debounce } from "./debounce.js";

const searchInput = document.querySelector("#searchInput");

let allProducts;
let selectedCategory = "all";
let searchText = "";

//
async function init() {
  allProducts = (await fetchProducts()).products;
  renderProducts(allProducts);
  setupCategoryDropdown();
}

init();

function handleSearch(evt) {
  searchText = evt.target.value.toLowerCase();
  console.log(allProducts);

  applyFilters();
}

const debouncedSearch = debounce(handleSearch, 300);

searchInput.addEventListener("input", debouncedSearch);

function setupCategoryDropdown() {
  const categoryList = allProducts.map((product) => product.category);
  const uniqueCategories = [...new Set(categoryList)];

  const select = document.querySelector("#categoryFilter");

  select.innerHTML = '<option value="all">All</option>';

  uniqueCategories.forEach((cat) => {
    const optionEL = document.createElement("option");
    optionEL.setAttribute("value", cat);
    optionEL.textContent = cat;

    select.appendChild(optionEL);
  });

  categoryFilter();
}

function categoryFilter() {
  const select = document.querySelector("#categoryFilter");
  select.addEventListener("change", (evt) => {
    selectedCategory = evt.target.value;
    applyFilters();
  });
}

function applyFilters() {
  let filtered = allProducts;

  if (selectedCategory !== "all") {
    filtered = filtered.filter((product) => {
      return product.category === selectedCategory;
    });
  }

  if (searchText) {
    filtered = filtered.filter((product) => {
      return product.title.toLowerCase().includes(searchText);
    });
  }

  renderProducts(filtered);
}
