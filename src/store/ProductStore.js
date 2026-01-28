import { Product } from '../models/Product';
import { products as initialProducts } from '../data/products';

let products = initialProducts.map(data => new Product(data));

export const productStore = {
    getProducts() {
        return products.map(product => product.toJSON());
    },

    updateProduct(productId, updatedFields) {
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error(`Product with id ${productId} not found`);
        }

        const updatedData = {
            ...products[index].toJSON(),
            ...updatedFields
        };

        products[index] = new Product(updatedData);
    }
};