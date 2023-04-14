import { fetchProducts } from "./task1";
import { Product } from "./types";
// task 2 - Creates a data structure containing all available product categories
// and the total value of products of a given category
export async function createProductCategoriesListWithValue() {
  // fetch products and for every product add its value to its category
  const products = (await fetchProducts()) as Product[];
  const list: { [key: string]: number } = {};
  for (let product of products) {
    if (typeof list[product.category] == "undefined") {
      list[product.category] = product.price;
    } else {
      list[product.category] += product.price;
    }
  }
  return list;
}
