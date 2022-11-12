import ReactCard from '../../../components/Card/Card'
import { ProductsGenerator, CategoryGenerator } from '../../Data'
import { Row } from 'react-bootstrap'

const products = ProductsGenerator(130)
const categories = CategoryGenerator(10)

export function List() {
  return (
    <div className=" bg-info pt-5">
      <Layout>
        {products.map((product) => (
          <ReactCard key={product.code} props={product} />
        ))}
      </Layout>
    </div>
  )
}

function Layout({ children }) {
  return <Row className="ms-4" md={2}>{children}</Row>
}
