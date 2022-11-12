import { List } from '../../list/components/List'
import { Row, Col } from 'react-bootstrap'



function CartLayout() {
  return (
    <div className="bg-dark h-100">
      
    </div>
  )
}


export function Cart() {
  return (
    <>
      <Row>
        <Col className="m-0 p-0" md={9}>
          <List />
        </Col>

        <Col className="m-0 p-0" md={3}>
          <CartLayout />
        </Col>
      </Row>
    </>
  )
}