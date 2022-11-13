import { List } from '../../list/components/List'
import { Row, Col } from 'react-bootstrap'
import { Form } from 'formik'
import FormGroup from 'react-bootstrap'

function OrderDetail() {
  return (
    <div className="bg-primary h-100">
      <h2>Order Details</h2>

      

    </div>
  )
}

export function Cart() {
  return (
    <>
      <Row>
        <Col className="pe-0" md={9}>
          <List />
        </Col>

        <Col className="px-0" md={3}>
          <OrderDetail />
        </Col>
      </Row>
    </>
  )
}
