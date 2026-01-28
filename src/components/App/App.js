import { useState, useEffect } from 'react';
import ProductTable from '../ProductTable/ProductTable';
import { productStore } from '../../store/ProductStore';

function App() {
  const [products, setProducts] = useState(productStore.getProducts());

  useEffect(() => {
    setProducts(productStore.getProducts());
  }, []);

  const handleProductsChange = (updatedProducts) => {
    updatedProducts.forEach(updatedProduct => {
      const originalProduct = products.find(p => p.id === updatedProduct.id);
      if (JSON.stringify(originalProduct) !== JSON.stringify(updatedProduct)) {
        productStore.updateProduct(updatedProduct.id, updatedProduct);
      }
    });
    setProducts(updatedProducts);
  };

  return (
    <div>
      <ProductTable
        products={products}
        onProductsChange={handleProductsChange}
      />
    </div>
  );
}

export default App;