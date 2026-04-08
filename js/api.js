const API_URL = "https://fakestoreapi.com/products";

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


