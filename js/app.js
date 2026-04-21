// Import API function to fetch products
import { fetchProducts } from "./api.js";

// Import UI function to render products on screen
import { renderProducts } from "./ui.js";

// Import debounce utility to optimize search input
import { debounce } from "./debounce.js";

import { showLoading } from "./ui.js";

import { showError } from "./ui.js";

const searchInput = document.querySelector("#searchInput");

// Store all products from API
let allProducts;

// Store selected category from dropdown
let selectedCategory = "all";

// Store search text from input
let searchText = "";

let sortOption = "default";

// Initialize app: fetch products and setup UI
async function init() {
  showLoading();
  try {
    allProducts = (await fetchProducts()).products;
  } catch (error) {
    showError();
    const btn = document.querySelector(".retry");
    btn.addEventListener("click", () => {
      init();
    });
    return;
  }
  renderProducts(allProducts);
  setupCategoryDropdown();
  sortProducts();
}

init();

// // Handle search input changes
function handleSearch(evt) {
  searchText = evt.target.value.toLowerCase();

  applyFilters();
}

const debouncedSearch = debounce(handleSearch, 300);

searchInput.addEventListener("input", debouncedSearch);

// Setup category dropdown
function setupCategoryDropdown() {
  const categoryList = allProducts.map((product) => product.category);

  const uniqueCategories = [...new Set(categoryList)]; // Get unique categories

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

// // Handle category change
function categoryFilter() {
  const select = document.querySelector("#categoryFilter");
  select.addEventListener("change", (evt) => {
    selectedCategory = evt.target.value;
    applyFilters();
  });
}

function sortProducts() {
  const select = document.querySelector("#sortOption");
  select.addEventListener("change", (evt) => {
    sortOption = evt.target.value;
    applyFilters();
  });
}

// Apply category + search filters
function applyFilters() {
  let filtered = allProducts;

  // Filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter((product) => {
      return product.category === selectedCategory;
    });
  }

  // Filter by search text
  if (searchText) {
    filtered = filtered.filter((product) => {
      return product.title.toLowerCase().includes(searchText);
    });
  }

  // Sort Low - High
  if (sortOption === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  // Sort Hihgt - Low
  if (sortOption === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered); // Render final result
}
