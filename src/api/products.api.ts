import { ajax } from '@lion/ajax';

export const getAllProducts = async (queryParams: {
  page: string;
  brand: string;
  type: string;
}) => {
  const url = new URL(`http://localhost:3000/products`);
  url.search = new URLSearchParams(queryParams).toString();
  return ajax.fetchJson(url.href);
};

export const getProductById = async (id: string) =>
  ajax.fetchJson(`http://localhost:3000/products/${id}`);
