import Card from '../../../components/Card/Card'
import { Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Search from '../../table/Search'
import { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'

import './Cart.css'

export function ProductList() {
  // REDUX
  const productList = useSelector((state) => state.products.list)
  const selectedCategory = useSelector((state) => state.categories.selectedCategory)
  const currentCart = useSelector((state) => state.carts.selectedCart)

  // use State
  const [search, setSearch] = useState('')
  const [indices, setIndices] = useState(0)

  // const indexes = useMemo(() => {
  // return currentCart.items
  //   .map((product, index) => {
  //     if (currentCart.items.some((el) => el.code === product.code)) {
  //       return index
  //     }
  //   })
  //   .filter((element) => element >= 0)
  // }, [selectedCategory, currentCart, search])

  useEffect(() => {
    console.log(indices)
  }, [currentCart, selectedCategory, indices])

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
  }, [selectedCategory, currentCart, productList, search])

  return (
    <div className="mb-5">
      <Row className="mb-3 ms-2">
        <Col>
          <h2 className="mb-3">
            {' '}
            <FontAwesomeIcon icon={faStore} size="lg" /> Products{' '}
            {'(' + filtered.length + ')'}
          </h2>
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
          defaultValue={indices}
        >
          <ToggleButton
            id={`product-${product.code}`}
            type="checkbox"
            variant="outline-secondary"
            className="ms-3 mb-3 rounded-3"
            value={product.code}
            onClick={(e) => {
              // add to current cart
            setIndices(1)
              //console.log()
            }}
          >
            <Card key={product.code} props={product} />
          </ToggleButton>
        </ToggleButtonGroup>
      ))}
    </div>
  )
}
