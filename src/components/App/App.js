import ProductTable from '../ProductTable/ProductTable';
import { products } from '../../data/products';

function App() {
  return (
    <div>
      <ProductTable products={products} />
    </div>
  );
}

export default App;