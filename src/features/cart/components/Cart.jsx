import { List } from '../../list/components/List'
import { Row, Col } from 'react-bootstrap'



function CartLayout() {
  return (
    <div className="bg-primary h-100">
      
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
          <CartLayout />
        </Col>
      </Row>
    </>
  )
}