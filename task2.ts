import { fetchProducts } from "./task1";
import { ProductType } from "./types";

// task 2 - Create a data structure containing all available product categories
// and the total value of products of a given category
export async function createProductCategoriesListWithValue() {
  const products: ProductType[] = await fetchProducts();
  const list: { [key: string]: number } = {};
  products.forEach((product) => {
    if (list[product.category] === undefined) {
      list[product.category] = product.price;
    } else {
      list[product.category] += product.price;
    }
  });
  return list;
}
