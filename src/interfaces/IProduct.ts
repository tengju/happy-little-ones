// eslint-disable-next-line no-shadow
enum TypeEnum {
  ACCESSORIES = 'Accessories',
  TOYS = 'Toys',
  BLANKETS = 'Blankets',
  BOOKS = 'Books',
}

// eslint-disable-next-line no-shadow
enum BrandEnum {
  KICO = 'KICO',
  BABYZUS = 'BABYZUS',
  MYLITTLE = 'MYLITTLE',
  MINUMINI = 'MINUMINI',
}

interface IProduct {
  id: string;
  type: TypeEnum;
  name: string;
  image: string;
  Price: string;
  stock: number;
  description: string;
  brand: BrandEnum;
  DateAdded: string;
  Material: string;
  availableSizes?: number[];
  width?: number;
  height?: number;
}

export { TypeEnum, BrandEnum, IProduct };
