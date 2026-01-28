export class Product {
    constructor(data) {
        this.id = this._validateNumber(data.id, 'id', 1);
        this.name = this._validateString(data.name, 'name');
        this.vendor = this._validateString(data.vendor, 'vendor');
        this.sku = this._validateString(data.sku, 'sku');
        this.price = this._validateNumber(data.price, 'price', 0);
        this.price_with_delivery = this._validateNumber(data.price_with_delivery, 'price_with_delivery', 0);
        this.availability = this._validateAvailability(data.availability);
        this.multiplicity = this._validateNumber(data.multiplicity, 'multiplicity', 1);
        this.sale = this._validateBoolean(data.sale, 'sale');
        this.hot_sale = this._validateBoolean(data.hot_sale, 'hot_sale');
    }

    _validateString(value, fieldName) {
        if (typeof value !== 'string') {
            throw new Error(`Product.${fieldName} must be a string`);
        }
        return value;
    }

    _validateNumber(value, fieldName, min = -Infinity) {
        if (typeof value !== 'number' || isNaN(value) || value < min) {
            throw new Error(`Product.${fieldName} must be a number >= ${min}`);
        }
        return Number(value.toFixed(2));
    }

    _validateAvailability(value) {
        if (![1, 2, 3].includes(value)) {
            throw new Error('Product.availability must be 1, 2, or 3');
        }
        return value;
    }

    _validateBoolean(value, fieldName) {
        if (typeof value !== 'boolean') {
            throw new Error(`Product.${fieldName} must be a boolean`);
        }
        return value;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            vendor: this.vendor,
            sku: this.sku,
            price: this.price,
            price_with_delivery: this.price_with_delivery,
            availability: this.availability,
            multiplicity: this.multiplicity,
            sale: this.sale,
            hot_sale: this.hot_sale,
        };
    }
}