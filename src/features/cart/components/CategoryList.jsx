import { useSelector } from 'react-redux'
import { OrderGenerator } from '../../Data'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export function CategoryList() {
  const categoryList = useSelector((state) => state.categories.list)

  return (
    <div className="mb-5 ms-4">
      <h2 className="mb-3"> Categories {'(' + categoryList.length + ')'}</h2>
      <div className="cartList-view">
        <ToggleButtonGroup type="radio" name="categories" defaultValue={0}>
          {categoryList.map((category) => (
            <ToggleButton
              id={category.id}
              className="me-2 ms-1 mb-3 rounded-2"
              variant="outline-primary"
              value={category.id}
            >
              {category.name} {' (' + category.categoryList + ')'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

