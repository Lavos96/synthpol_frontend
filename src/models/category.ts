import { Product } from './product';

export class Category{
    categoryId:number;
    categoryName: string;
    products: Product[];
    constructor(categoryId: number,categoryName: string, products: Product[]){
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.products = products;
    }
}