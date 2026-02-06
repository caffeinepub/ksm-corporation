import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}
export interface Config {
    categories: Array<Category>;
    heroDescription: string;
    brandName: string;
    heroHeadline: string;
}
export interface Product {
    id: string;
    categoryId: string;
    inStock: boolean;
    name: string;
    description: string;
    sizes: Array<string>;
    stockCount: bigint;
    imageUrl: string;
    currency: string;
    colors: Array<string>;
    price: bigint;
    styleTags: Array<RegionStyle>;
}
export interface OrderLineItem {
    color?: string;
    size?: string;
    productId: string;
    quantity: bigint;
}
export enum RegionStyle {
    southAmerican = "southAmerican",
    european = "european",
    australian = "australian",
    italian = "italian",
    american = "american",
    canadian = "canadian"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, currency: string, categoryId: string, imageUrl: string, sizes: Array<string>, colors: Array<string>, stockCount: bigint, styleTags: Array<RegionStyle>): Promise<string>;
    getAllProducts(): Promise<Array<Product>>;
    getConfig(): Promise<Config>;
    getProduct(productId: string): Promise<Product | null>;
    getProductsByCategory(categoryId: string): Promise<Array<Product>>;
    getProductsByStyle(styleFilter: RegionStyle): Promise<Array<Product>>;
    placeOrder(buyerName: string, buyerEmail: string, shippingAddress: string, lineItems: Array<OrderLineItem>, currency: string): Promise<string>;
}
