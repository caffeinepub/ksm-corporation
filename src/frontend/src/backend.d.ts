import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Config {
    categories: Array<Category>;
    heroDescription: string;
    brandName: string;
    heroHeadline: string;
}
export interface Category {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}
export interface backendInterface {
    getConfig(): Promise<Config>;
}
