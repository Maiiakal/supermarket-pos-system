import { CategoryList } from './CategoryList'
import { ProductList } from './ProductList'
import { CartList } from './CartList'

export function List() {
  return (
    <div className="vh-100" style={{ overflow: "scroll" }}>
      <CartList />
      <CategoryList />
      <ProductList />
    </div>
  )
}

export default List
