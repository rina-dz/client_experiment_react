import { useState } from 'react';
import ProductTable from '../ProductTable/ProductTable';
import { products as initialProducts } from '../../data/products';

function App() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      <ProductTable 
        products={products} 
        onProductsChange={setProducts} 
      />
    </div>
  );
}

export default App;