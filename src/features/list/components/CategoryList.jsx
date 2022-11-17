import MiniCard from '../../../components/Card/MiniCard'
import { CategoryGenerator } from '../../Data'
import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export function CategoryList() {
  const categoryList = useSelector((state) => state.categories.list)

  return (
    <div className="mb-5">
      <h2 className="mb-3 ms-4"> Category List</h2>
      <Layout>
        {categoryList.map((category) => (
          <MiniCard
            key={category.id}
            props={category}
            total={categoryList.length}
          />
        ))}
      </Layout>
    </div>
  )
}

function Layout({ children }) {
  return <Row className="ms-4">{children}</Row>
}
