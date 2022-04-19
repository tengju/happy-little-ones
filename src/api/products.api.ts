import { ajax } from '@lion/ajax';

export const getAllProducts = async () =>
  ajax.fetchJson(`http://192.168.0.152:3000/products`);

export const getProductById = async (id: string) =>
  ajax.fetchJson(`http://192.168.0.152:3000/products/${id}`);
