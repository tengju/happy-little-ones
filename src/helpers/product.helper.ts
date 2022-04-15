import { IProduct, BrandEnum, TypeEnum } from '../interfaces/IProduct.js';

export const getProductDateAdded = (product: IProduct): Date => {
  const [day, month, year] = product.DateAdded.split('-');
  return new Date(Number(year), Number(month), Number(day));
};

// in an ideal situation I would sort this in the backend
export const sortByDateFunction = (a: IProduct, b: IProduct): number =>
  getProductDateAdded(a).valueOf() - getProductDateAdded(b).valueOf();

export const getAllBrands = () => Object.values(BrandEnum);
export const getAllTypes = () => Object.values(TypeEnum);
