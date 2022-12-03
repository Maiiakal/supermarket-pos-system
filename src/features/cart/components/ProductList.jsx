import Card from '../../../components/Card/Card'
import { Row, Col } from 'react-bootstrap'
import Search from '../../table/Search'
import { useState, useMemo, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

export function ProductList() {
  // REDUX
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.products.list)
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory,
  )

  // use State
  const [list, setList] = useState(productList)
  const [search, setSearch] = useState('')

  // returns the currently viewed list with and without search parameters
  const filtered = useMemo(() => {
    let filteredResult = list

    if (!selectedCategory.includes('All Categories')) {
      filteredResult = filteredResult.filter((result) => {
        console.log(
          selectedCategory &&
            result.name.toLowerCase().includes(search.toLowerCase()),
        )
        selectedCategory === result.category &&
          result.name.toLowerCase().includes(search.toLowerCase())
      })
    }

    return filteredResult
  }, [selectedCategory, productList, search])

  return (
    <div className="mb-5">
      <Row className="mb-3 ms-2">
        <Col>
          <h2 className="mb-3">Products {'(' + filtered.length + ')'}</h2>
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
        {filtered.map((product) => (
          <Card key={product.code} props={product} />
        ))}
      </Layout>
    </div>
  )
}

function Layout({ children }) {
  return <Row className="ms-4">{children}</Row>
}
