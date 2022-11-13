import MiniCard from '../../../components/Card/MiniCard'
import { CategoryGenerator } from '../../Data'
import { Row } from 'react-bootstrap'

const categories = CategoryGenerator(10)

export function CategoryList() {
  return (
    <div className="mb-5">
      <h2 className="mb-3 ms-4"> Category List</h2>
      <Layout>
        {categories.map((category) => (
          <MiniCard key={category.id} props={category} total={ categories.length} />
        ))}
      </Layout>
    </div>
  )
}

function Layout({ children }) {
  return <Row className="ms-4">{children}</Row>
}
