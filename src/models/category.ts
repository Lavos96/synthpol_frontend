import { Product } from './product';

export class Category{
    constructor(private categoryId: number,private categoryName: string, products: Product[]){}
}