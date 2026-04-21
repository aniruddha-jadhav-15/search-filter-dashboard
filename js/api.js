// API endpoint
const API_URL = "https://dummyjson.com/products";

// Fetch products from API
export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      console.log("Error");
      return;
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}
