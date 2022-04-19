import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { IProduct } from './interfaces/IProduct.js';
import { IShoppingItem } from './interfaces/IShoppingItem.js';

export class StoreElement extends LitElement {
  constructor() {
    super();
    this.syncLatestChanges();
    // Intentionally not clearing interval since i alwyas want to sync latest changes
    setInterval(() => {
      if (this.localUpdateValue !== StoreElement.updateValue) {
        this.syncLatestChanges();
      }
    }, 200);
  }

  static updateValue = 0;

  @property({ type: Number })
  localUpdateValue = 0;

  @property({ type: String })
  shoppingCart: Record<string, IShoppingItem> = {};

  @property({ type: Object })
  filters: Record<string, string> = {
    brand: '',
    type: '',
  };

  syncLatestChanges() {
    this.shoppingCart = JSON.parse(
      localStorage.getItem('shoppingCart') || '{}'
    );
    this.filters = JSON.parse(localStorage.getItem('filters') || '{}');
    this.localUpdateValue = StoreElement.updateValue;
  }

  updated(changedProperties: any) {
    if (changedProperties.has('shoppingCart')) {
      if (
        JSON.stringify(this.shoppingCart) !==
        localStorage.getItem('shoppingCart')
      ) {
        StoreElement.updateValue += 1;
      }
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    }
    if (changedProperties.has('filters')) {
      localStorage.setItem('filters', JSON.stringify(this.filters));
    }
  }

  changeFilter(key: string, value: string) {
    this.filters = {
      ...this.filters,
      [key]: value,
    };
  }

  addProductToCart(product: IProduct | null, size: number | null = null) {
    if (!product) return;
    const shoppingCartPlaceholder = { ...this.shoppingCart };
    const key = `${size}-${product.id}`;
    if (
      shoppingCartPlaceholder[key] &&
      shoppingCartPlaceholder[key].size === size
    ) {
      shoppingCartPlaceholder[key].amount += 1;
    } else {
      shoppingCartPlaceholder[key] = {
        id: product.id,
        price: Number(product.Price.slice(1)),
        amount: 1,
        product: product.name,
        image: product.image,
        size,
      };
    }
    this.shoppingCart = {
      ...shoppingCartPlaceholder,
    };
  }

  removeProductFromCart(product: IProduct | null, size: number | null = null) {
    if (!product) return;
    const shoppingCartPlaceholder = { ...this.shoppingCart };
    const key = `${size}-${product.id}`;
    const currentItem = shoppingCartPlaceholder[key];
    if (!currentItem) return;
    if (currentItem.amount - 1 > 0) {
      shoppingCartPlaceholder[key].amount -= 1;
    } else {
      delete shoppingCartPlaceholder[key];
    }
    this.shoppingCart = {
      ...shoppingCartPlaceholder,
    };
  }

  incrementCartItem(cartItem: IShoppingItem) {
    const shoppingCartPlaceholder = { ...this.shoppingCart };
    const key = `${cartItem.size}-${cartItem.id}`;
    shoppingCartPlaceholder[key].amount += 1;
    this.shoppingCart = {
      ...shoppingCartPlaceholder,
    };
  }

  decrementCartItem(cartItem: IShoppingItem) {
    const shoppingCartPlaceholder = { ...this.shoppingCart };
    const key = `${cartItem.size}-${cartItem.id}`;
    shoppingCartPlaceholder[key].amount -= 1;
    if (shoppingCartPlaceholder[key].amount <= 0) {
      delete shoppingCartPlaceholder[key];
    }
    this.shoppingCart = {
      ...shoppingCartPlaceholder,
    };
  }

  get totalPrice() {
    return Object.values(this.shoppingCart).reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
  }

  get totalItems() {
    const amount = Object.values(this.shoppingCart).reduce(
      (acc, item) => acc + item.amount,
      0
    );
    return amount > 99 ? '99+' : amount;
  }
}
