import Card from '../../../components/Card/Card'
import { Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Search from '../../table/Search'
import { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedCart } from '../../../stores/ducks/carts'

import './Cart.css'

export function ProductList() {

  // REDUX
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.products.list)
  const currentCategory = useSelector(
    (state) => state.categories.currentCategory,
  )
  const currentCart = useSelector((state) => state.carts.currentCart)

  const handleUpdateSelectedCart = (cart) => {
    dispatch(updateSelectedCart(cart))
  }

  // use State
  const [search, setSearch] = useState('')

  const indexes = useMemo(() => {
    return currentCart.items
      .map((product, index) => {
        if (currentCart.items.some((el) => el.code === product.code)) {
          return index
        }
      })
      .filter((element) => element >= 0)
  }, [currentCategory, currentCart, search])

  useEffect(() => {
    //console.log(indexes)
  }, [currentCart, currentCategory])

  // returns the currently viewed list with and without search parameters
  const filtered = useMemo(() => {
    let filteredResult = productList

    if (!(currentCategory.name === 'All Categories')) {
      filteredResult = filteredResult.filter(
        (result) =>
          currentCategory.name === result.category &&
          result.name.toLowerCase().includes(search.toLowerCase()),
      )
    } else {
      filteredResult = filteredResult.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return filteredResult
  }, [currentCategory, currentCart, productList, search])

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
          defaultValue={indexes}
        >
          <ToggleButton
            id={`product-${product.code}`}
            type="checkbox"
            variant="outline-secondary"
            className="ms-3 mb-3 rounded-3"
            value={product.code}
            onClick={(e) => {
              // add to current cart

              console.log(product)

              handleUpdateSelectedCart({
                id: currentCart.id,
                items: [...currentCart.items, product],
              })

              console.log(currentCart.items)
            }}
          >
            <Card key={product.code} props={product} />
          </ToggleButton>
        </ToggleButtonGroup>
      ))}
    </div>
  )
}
