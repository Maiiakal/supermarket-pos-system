import { OrderGenerator } from '../../Data'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'

const cart = OrderGenerator(1)

export function CartList() {
  return (
    <div className="mb-5 ms-4">
      <h2 className="mb-3"><FontAwesomeIcon icon={faCartShopping} size="lg" /> Carts {'(' + cart.length + ') '}
        
      </h2>
      <div className="cartList-view">
        <ToggleButtonGroup type="radio" name="carts" defaultValue={0}>
          {cart.map((cart) => (
            <ToggleButton
              id={10}
              className="me-2 ms-1 mb-3 rounded-2"
              variant="outline-primary"
              value={10}
            >
              {'Cart ' + cart.id} {' (' + cart.items.length + ')'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Button
          className="me-2 ms-1 mb-3 rounded-2"
          variant="outline-dark"
          onClick={(e) => {
            // add new cart to list
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} size="lg" />
        </Button>
      </div>
    </div>
  )
}
