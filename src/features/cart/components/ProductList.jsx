import Card from '../../../components/Card/Card'
import { ProductsGenerator } from '../../Data'
import { Row, Col } from 'react-bootstrap'
import Search from '../../table/Search'
import { useState } from 'react'

import { useSelector } from 'react-redux'

export function ProductList() {
  const [search, setSearch] = useState('')

  const productList = useSelector((state) => state.products.list)

  return (
    <div className="mb-5">
      <Row className="mb-3 ms-2">
        <Col>
          <h2 className="mb-3">Products {'(' + productList.length + ')'}</h2>
        </Col>
        <Col className="me-5 d-flex align-items-end flex-column">
          <Search
            onSearch={(value) => {
              setSearch(value)
            }}
          />
        </Col>
      </Row>
      <Layout>
        {productList.map((product) => (
          <Card key={product.code} props={product} />
        ))}
      </Layout>
    </div>
  )
}

function Layout({ children }) {
  return <Row className="ms-4">{children}</Row>
}
