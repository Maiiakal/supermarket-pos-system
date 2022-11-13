import { CategoryList } from './CategoryList'
import { ProductList } from './ProductList'
import { CartList } from './CartList'

export function List() {
  return (
      <>
      <CartList />
      <CategoryList />
      <ProductList />
    </>
  )
}

export default List
