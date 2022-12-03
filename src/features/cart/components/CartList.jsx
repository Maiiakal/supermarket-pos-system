import { OrderGenerator } from '../../Data'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'

const orders = OrderGenerator(2)

export function CartList() {
  return (
    <div className="mb-5 ms-4">
      <h2 className="mb-3"> Cart List {'(' + orders.length + ')'}</h2>
      <div className="cartList-view">
        <ToggleButtonGroup type="radio" name="carts" defaultValue={0}>
          {orders.map((order) => (
            <ToggleButton
              id={order.id}
              className="me-2 ms-1 mb-3 rounded-2"
              variant="outline-primary"
              value={order.id}
            >
              {'Cart ' + order.id} {' (' + order.items.length + ')'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Button
          id="-1"
          className="me-2 ms-1 mb-3 rounded-2"
          variant="outline-dark"
          value="-1"
          onClick={(e) => {
            
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} size="lg" />
        </Button>
      </div>
    </div>
  )
}
