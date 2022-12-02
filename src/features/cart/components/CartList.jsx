import { OrderGenerator } from '../../Data'
import { Row } from 'react-bootstrap'

const orders = OrderGenerator(10)

export function CartList() {
  return (
    <div className="mb-5">
      <h2 className="mb-3 ms-4"> Cart List</h2>
      <Layout>
        {orders.map((order) => (
            <Card key={order.id} props={order} total={ orders.length} />
        ))}
      </Layout>
    </div>
  )
}

function Layout({ children }) {
  return <Row className="ms-4">{children}</Row>
}

function Card({props, total}) {
  return (
    <>
      <div className="shadow border cardSize">
        <h6 className="title text-muted fw-light">Cart {props.id}</h6>
        <h6 className="text text-muted fw-normal">{total} items</h6>
      </div>
    </>
  )
}
