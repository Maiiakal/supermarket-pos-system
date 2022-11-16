import { List } from '../../list/components/List'
import { useEffect, useState } from 'react'
import { ProductsGenerator } from '../../Data'
import { Table, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import './Cart.css'

function OrderDetail() {
  const [list, setList] = useState(ProductsGenerator(3))

  return (
    <div className="border-start vh-100 p-4 pt-0">
      <h2 className="mb-3">Order Details</h2>
      <ProductTable list={list} setList={setList} />
    </div>
  )
}

function ProductTable({ list, setList }) {
  const [isEditable, setIsEditable] = useState(1)

  const [subtotal, setSubtotal] = useState(calcSubTotal(list))
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(calcSubTotal(list))

  useEffect(() => {
    
  }, []);

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
            {list.map((product) => (
              <tr key={product.code}>
                <td>{product.name}</td>
                <td>{'$' + product.price}</td>
                <td>
                  <input
                    type="number"
                    className="form-control quantity-box"
                    value={product.quantity}
                    onChange={(e) => {
                      list.map((p) => {
                        if (p.code === product.code) {
                          p.quantity = e.target.value
                        }
                      })
                      setSubtotal(calcSubTotal(list))
                      setTotal(
                        calcSubTotal(list) +
                          ([calcSubTotal(list) * (tax/ 100)] -
                            [(discount / 100) * calcSubTotal(list)]),
                      )
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
                      setList(list.filter((p) => product.code !== p.code))
                      setSubtotal(calcSubTotal(list))
                      setTotal(
                        calcSubTotal(list) +
                          ([calcSubTotal(list) * (tax/ 100)] -
                            [(discount / 100) * calcSubTotal(list)]),
                      )
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
      <p className="fs-4 fw-bold m-4 text-center">Total items: {list.length}</p>

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
                setTotal(
                  subtotal +
                    ([subtotal * (tax / 100)] -
                      [(e.target.value / 100) * subtotal]),
                )
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
                setTotal(
                  subtotal +
                    ([subtotal * (e.target.value / 100)] -
                      [(discount / 100) * subtotal]),
                )
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
