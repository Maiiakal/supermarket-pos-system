import { useSelector, useDispatch } from 'react-redux'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTags } from '@fortawesome/free-solid-svg-icons'
import { updateSelectedCategory } from '../../../stores/ducks/categories'

//<FontAwesomeIcon icon="fa-sharp fa-solid fa-tags" />

export function CategoryList() {
  // REDUX
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categories.list)
  const currentCategory = useSelector(
    (state) => state.categories.currentCategory,
  )

  const handleUpdateSelectedCategory = (category) => {
    dispatch(updateSelectedCategory(category))
  }

  const currentIndex = categoryList
    .map((category, index) => {
      if (category.id === currentCategory.id) {
        return index
      }
    })
    .filter((element) => element >= 0)

  return (
    <div className="mb-5 ms-4">
      <h2 className="mb-3">
        <FontAwesomeIcon icon={faTags} size="lg" /> Categories{' '}
        {'(' + categoryList.length + ')'}
      </h2>
      <div className="cartList-view">
        <ToggleButtonGroup type="radio" name="categories" defaultValue={currentIndex}>
          <ToggleButton
            id="cartegory-all"
            className="me-2 ms-1 mb-3 rounded-2"
            variant="outline-dark"
            value={-1}
            onClick={(e) => {
              // show all list

              handleUpdateSelectedCategory({
                name: 'All Categories',
                id: -1,
              })
            }}
          >
            <FontAwesomeIcon icon={faGlobe} size="lg" /> All Categories
          </ToggleButton>
          {categoryList.map((category) => (
            <ToggleButton
              id={`category-${category.id}`}
              name={category.name}
              className="me-2 ms-1 mb-3 rounded-2"
              variant="outline-secondary"
              value={category.id}
              onClick={(e) => {
                handleUpdateSelectedCategory(category)
              }}
            >
              {category.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  )
}
