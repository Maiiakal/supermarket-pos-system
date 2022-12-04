import Card from '../../../components/Card/Card'
import { Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Search from '../../table/Search'
import { useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import './Cart.css'

export function ProductList() {
  // REDUX
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.products.list)
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory,
  )

  const currentCart = useSelector((state) => state.carts.selectedCart)

  // use State
  const [search, setSearch] = useState('')

  // returns the currently viewed list with and without search parameters
  const filtered = useMemo(() => {
    let filteredResult = productList

    if (!selectedCategory.includes('All Categories')) {
      filteredResult = filteredResult.filter(
        (result) =>
          selectedCategory === result.category &&
          result.name.toLowerCase().includes(search.toLowerCase()),
      )
    } else {
      filteredResult = filteredResult.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase()),
      )
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

        {filtered.map((product) => (
          <ToggleButtonGroup
            type="checkbox"
            name="products"
            defaultValue={0}
          >
            <ToggleButton
              id={`product-${product.code}`}
              variant="outline-secondary"
              className="ms-3 mb-3 rounded-3"
              value={product.code}
              onClick={(e) => {
                console.log(product.code)
              }}
            >
              <Card
                key={product.code}
                props={product}
                onClick={() => console.log(product)}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        ))}
    </div>
  )
}
