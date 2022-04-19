import { ajax } from '@lion/ajax';

export const getAllProducts = async () =>
  ajax.fetchJson(`http://localhost:3000/products`);

export const getProductById = async (id: string) =>
  ajax.fetchJson(`http://localhost:3000/products/${id}`);
