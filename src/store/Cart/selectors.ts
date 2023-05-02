import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getCartGoods = (store: RootStore): State["cartGoods"] =>
  store.cart.cartGoods;

export const getCartLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.cart.loadStatus;

export const getCartGoodsCount = (store: RootStore): number =>
    store.cart.cartGoods.map(good => good.good.price).reduce((acc, curr) => {
        return Number(acc) + Number(curr);
    }, 0);

export const getCartGoodsPrice = (store: RootStore): number =>
    store.cart.cartGoods.map(good => good.count).reduce((acc, curr) => {
        return acc + curr;
    }, 0);