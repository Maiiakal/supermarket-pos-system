import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faBorderAll, faTags } from '@fortawesome/free-solid-svg-icons'

//<FontAwesomeIcon icon="fa-sharp fa-solid fa-tags" />

export function CategoryList() {
  const categoryList = useSelector((state) => state.categories.list)

  return (
    <div className="mb-5 ms-4">
      <h2 className="mb-3">
        <FontAwesomeIcon icon={faTags} size="lg" /> Categories{' '}
        {'(' + categoryList.length + ')'}
      </h2>
      <div className="cartList-view">
        <ToggleButtonGroup type="radio" name="categories" defaultValue={-1}>
          <ToggleButton
            id="-1"
            className="me-2 ms-1 mb-3 rounded-2"
            variant="outline-dark"
            value="-1"
            onClick={(e) => {
              // show all list
            }}
          >
            <FontAwesomeIcon icon={faGlobe} size="lg" /> All Categories
          </ToggleButton>
          {categoryList.map((category) => (
            <ToggleButton
              id={category.id}
              className="me-2 ms-1 mb-3 rounded-2"
              variant="outline-secondary"
              value={category.id}
            >
              {category.name} {' (' + categoryList.length + ')'}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  )
}
