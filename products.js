
import "./javaScript/tooltips.js";

import { getElement, setLocalStorage } from "./javaScript/utils.js";
import { getData } from "./javaScript/getData.js";
import { displayProducts } from "./javaScript/displayProducts.js";
import { searchFilter } from "./javaScript/searchFilter.js";
import { categoriesFilter } from "./javaScript/categories.js";
import { priceFilter } from "./javaScript/priceFilter.js";
import { CartUnit } from "./javaScript/cart/addToCart.js";


const url = "https://fakestoreapi.com/products";
const products = getElement(".product-content");

window.addEventListener("DOMContentLoaded", async function () {
  const data = await getData(url).finally(() => {
    const loader = getElement(".products-loader");
    loader.classList.add("hide");
  } );
  setLocalStorage("store", data);
  displayProducts(data, products);

  searchFilter(data);
  categoriesFilter(data);
  priceFilter(data);
  CartUnit();
});
