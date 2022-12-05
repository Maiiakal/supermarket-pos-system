import { List } from './List'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import {
  updateCart,
  updateSelectedCart,
  deleteCart,
} from '../../../stores/ducks/carts'

import './OrderDetails.css'

function OrderDetail() {
  return (
    <div className="border-start vh-100 p-4 pt-0">
      <h2 className="mb-3">Order Details</h2>
      <ProductTable />
    </div>
  )
}

function ProductTable() {
  //REDUX
  const dispatch = useDispatch()
  const currentCart = useSelector((state) => state.carts.currentCart)

  const handleUpdateSelectedCart = (cart) => {
    dispatch(updateSelectedCart(cart))
  }

  const handleUpdateCart = (cart) => {
    dispatch(updateCart(cart))
  }

  const handleDeleteCart = (cart) => {
    dispatch(deleteCart(cart))
  }

  const [subtotal, setSubtotal] = useState(calcSubTotal(currentCart.items))
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(calcSubTotal(currentCart.items))

  useEffect(() => {
    handleUpdateCart(currentCart)
    console.log(currentCart)
  }, [currentCart])

  useEffect(() => {
    setSubtotal(calcSubTotal(currentCart.items))
    setTotal(
      subtotal + ([subtotal * (tax / 100)] - [(discount / 100) * subtotal]),
    )
  }, [currentCart, subtotal])

  useEffect(() => {
    setTotal(
      subtotal + ([subtotal * (tax / 100)] - [(discount / 100) * subtotal]),
    )
  }, [currentCart, discount, tax])

  return (
    <>
      <div className="table-view mb-3">
        <Table borderless hover sm keyField="id">
          <thead>
            <tr>
              <th className="items">Items</th>
              <th>Price</th>
              <th>Quanity</th>
              <th className="">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentCart.items.map((product) => (
              <tr key={product.code}>
                <td>{product.name}</td>
                <td>{'$' + product.price}</td>
                <td>
                  <input
                    type="number"
                    className="form-control quantity-box"
                    value={product.quantity}
                    onChange={(e) => {
                      currentCart.items.map((p) => {
                        if (p.code === product.code) {
                          p.quantity = e.target.value
                        }
                      })
                      setSubtotal(calcSubTotal(currentCart.items))
                    }}
                  />
                </td>
                <td>{'$' + product.price * product.quantity}</td>
                <td>
                  <Button
                    className="button"
                    variant="danger"
                    name="delete"
                    onClick={(e) => {
                      handleUpdateSelectedCart({
                        id: currentCart.id,
                        items: currentCart.items.filter(
                          (p) => p.code !== product.code,
                        ),
                      })
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p className="fs-5 fw-bold m-4 text-center">
        Total items: {currentCart.items.length}
      </p>

      <div className="summary-container">
        <hr></hr>

        <div className="d-flex mb-3">
          <div className="ms-5 ps-5 fw-light">Subtotal</div>
          <div className="mx-auto fw-bold">${subtotal}</div>
        </div>

        <div className="d-flex mb-3">
          <div className="ms-5 ps-5 fw-light">Discount %</div>

          <div className="mx-auto fw-bold">
            <input
              type="number"
              className="form-control quantity-box"
              value={discount}
              onChange={(e) => {
                setDiscount(parseInt(e.target.value))
              }}
            />
          </div>
        </div>

        <div className="d-flex mb-3">
          <div className="me-auto ms-5 ps-5 fw-light">Tax %</div>
          <div className="me-auto ps-5 fw-bold">
            <input
              type="number"
              className="form-control quantity-box"
              value={tax}
              onChange={(e) => {
                setTax(parseInt(e.target.value))
              }}
            />
          </div>
        </div>

        <hr></hr>

        <div className="d-flex mb-3">
          <div className="ms-5 ps-5 fs-4 fw-bold">Total</div>
          <div className="mx-auto fs-4 fw-bold">${total}</div>
        </div>
      </div>
    </>
  )
}

function calcSubTotal(list) {
  let subtotal = 0

  for (let index = 0; index < list.length; index++) {
    subtotal += list[index].price * list[index].quantity
  }
  return subtotal
}

export function Cart() {
  return (
    <>
      <Row>
        <Col className="pe-0" md={8}>
          <List />
        </Col>

        <Col className="px-0" md={4}>
          <OrderDetail />
        </Col>
      </Row>
    </>
  )
}
