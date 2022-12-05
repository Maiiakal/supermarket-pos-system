import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'
import {
  createCart,
  updateSelectedCart,
} from '../../../stores/ducks/carts'

export function CartList() {

  //REDUX
  const dispatch = useDispatch()
  const cartList = useSelector((state) => state.carts.list)
  const currentCart = useSelector((state) => state.carts.currentCart)

  const handleCreateCart = (cart) => {
    dispatch(createCart(cart))
  }

  const handleUpdateSelectedCart = (cart) => {
    dispatch(updateSelectedCart(cart))
  }

  const currentIndex = cartList
    .map((cart, index) => {
      if (cart.id === currentCart.id) {
        return index
      }
    })
    .filter((element) => element >= 0)

  return (
    <div className="mt-2 mb-5 ms-4">
      <h2 className="mb-3">
        <FontAwesomeIcon icon={faCartShopping} size="lg" /> Carts{' '}
        {'(' + cartList.length + ') '}
      </h2>
      <div className="cartList-view">
        <ToggleButtonGroup
          type="radio"
          name="carts"
          defaultValue={currentIndex}
        >
          {cartList.map((cart) => (
            <ToggleButton
              id={`cart-${cart.id}`}
              className="me-2 ms-1 mb-3 rounded-2"
              variant="outline-primary"
              value={cart.id}
              onClick={(e) => {
                handleUpdateSelectedCart(cart)
              }}
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
            handleCreateCart({
              id: cartList[cartList.length - 1].id + 1,
              items: [],
            })
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} size="lg" />
        </Button>
      </div>
    </div>
  )
}
