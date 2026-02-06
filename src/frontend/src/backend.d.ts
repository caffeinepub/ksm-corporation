import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderLineItem {
    color?: string;
    size?: string;
    productId: string;
    quantity: bigint;
}
export type Time = bigint;
export interface Config {
    categories: Array<Category>;
    heroDescription: string;
    brandName: string;
    heroHeadline: string;
}
export interface Order {
    id: string;
    lineItems: Array<OrderLineItem>;
    buyerEmail: string;
    totalAmount: bigint;
    currency: string;
    timestamp: Time;
    shippingAddress: string;
    buyerName: string;
}
export interface Category {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
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
    getAllOrders(): Promise<Array<[string, Order]>>;
    getConfig(): Promise<Config>;
    getOrder(orderId: string): Promise<Order | null>;
    getProduct(productId: string): Promise<Product | null>;
    getProductsByCategory(categoryId: string): Promise<Array<Product>>;
    getProductsByStyle(styleFilter: RegionStyle): Promise<Array<Product>>;
    placeOrder(buyerName: string, buyerEmail: string, shippingAddress: string, lineItems: Array<OrderLineItem>, currency: string): Promise<string>;
}
