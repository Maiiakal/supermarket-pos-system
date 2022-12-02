import '../../assets/styles/Table.css'
import { useState, useMemo, useEffect } from 'react'
import ReactPagination from './Pagination'
import Search from './Search'
import { Button, Modal } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../stores/ducks/products'

const FilterableProductTable = () => {
  const ITEMS_PER_PAGE = 30
  const dispatch = useDispatch()

  const handleCreateProduct = (product) => {
    dispatch(createProduct(product))
  }

  const handleUpdateProduct = (product) => {
    dispatch(updateProduct(product))
  }

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product))
  }

  // REDUX
  const productList = useSelector((state) => state.products.list)

  // paginations states
  const [search, setSearch] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // CRUD states
  const [currentSelection, setCurrentSelection] = useState({})
  const [add, setAdd] = useState(false)
  const [view, setView] = useState(false)
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)

  // returns the currently viewed list with and without search parameters
  const filtered = useMemo(() => {
    let filteredResult = productList

    if (search) {
      filteredResult = filteredResult.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    setTotalItems(filteredResult.length)

    return filteredResult.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    )
  }, [productList, currentPage, search])

  // one function to handle all click events
  function handleClick(e, product) {
    if (e.target.name === 'add') {
      setAdd(true)
      setCurrentSelection({
        code: '',
        name: '',
        price: '',
        category: '',
      })
    } else if (e.target.name === 'view') {
      setView(true)
      setCurrentSelection(product)
    } else if (e.target.name === 'edit') {
      setEdit(true)
      setCurrentSelection(product)
    } else {
      setRemove(true)
      setCurrentSelection(product)
    }
    return
  }

  // one function to handle all input events
  function handleInputChange(e) {
    setCurrentSelection({
      ...currentSelection,
      [e.target.name]: e.target.value,
    })
  }

  function generateTable() {
    return (
      <Table
        striped
        bordered
        hover
        sm
        className="table-container"
        keyField="id"
      >
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{'$' + product.price}</td>
              <td>
                <Button
                  className="button"
                  variant="primary"
                  name="view"
                  onClick={(e) => handleClick(e, product)}
                >
                  <FontAwesomeIcon icon={faEye} className="mx-2" size="lg" />
                </Button>
                <Button
                  className="button"
                  variant="success"
                  name="edit"
                  onClick={(e) => handleClick(e, product)}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="mx-2"
                    size="lg"
                  />
                </Button>
                <Button
                  className="button"
                  variant="danger"
                  name="delete"
                  onClick={(e) => handleClick(e, product)}
                >
                  <FontAwesomeIcon icon={faTrash} className="mx-2" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  return (
    <div>
      <h1 className="table-heading">Product Table</h1>

      <Search
        onSearch={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
      />

      <p className="serachbox-text">Please search by code only!</p>

      <div class="me-5 d-flex justify-content-end">
        <Button
          variant="outline-primary"
          className="addBtn"
          name="add"
          onClick={(e) => handleClick(e)}
        >
          Add Product
        </Button>
      </div>

      {totalItems ? (
        generateTable()
      ) : (
        <div className="text-center">
          <h4>No result found</h4>
        </div>
      )}

      <>
        <Modal
          show={add}
          onHide={(e) => setAdd(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Product Code"
              className="mb-3"
            >
              <Form.Control
                req
                name="code"
                type="text"
                placeholder="Code"
                value={currentSelection.code}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"
            >
              <Form.Control
                req
                name="name"
                type="text"
                placeholder="Milk"
                value={currentSelection.name}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Unit Price in $"
              className="mb-3"
            >
              <Form.Control
                req
                name="price"
                type="number"
                placeholder="10"
                value={currentSelection.price}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingSelect"
              label="Please select a category"
              className="mb-3"
            >
              <Form.Select
                id="category"
                name="category"
                aria-label="Please select a category"
                onChange={handleInputChange}
                value={currentSelection.category}
              >
                <option value="Food">Food</option>
                <option value="Beveragres">Beveragres</option>
                <option value="Snacks">Snacks</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Please enter product image URL"
              className="mb-3"
            >
              <Form.Control
                req
                name="imageURL"
                type="text"
                placeholder="www.images.com"
                value={currentSelection.imageURL}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={(e) => {
                setAdd(false)
                handleCreateProduct({
                  code: currentSelection.code,
                  name: currentSelection.name,
                  price: currentSelection.price,
                  category: currentSelection.category,
                  imageURL: currentSelection.imageURL,
                })
              }}
            >
              Add
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                setAdd(false)
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={view}
          onHide={(e) => setView(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Product Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Product Name: {currentSelection.name}</p>
            <p>Product Code: {currentSelection.code}</p>
            <p>Product Price: ${currentSelection.price}</p>
            <p>Product Category: {currentSelection.category}</p>
            <p>Category image URL: {currentSelection.imageURL}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => setView(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={edit}
          onHide={(e) => setEdit(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Product Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"
            >
              <Form.Control
                req
                name="name"
                type="text"
                placeholder="Milk"
                value={currentSelection.name}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Unit Price in $"
              className="mb-3"
            >
              <Form.Control
                req
                name="price"
                type="number"
                placeholder="10"
                value={currentSelection.price}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingSelect"
              label="Please select a category"
              className="mb-3"
            >
              <Form.Select
                id="category"
                name="category"
                aria-label="Please select a category"
                onChange={handleInputChange}
                value={currentSelection.category}
              >
                <option value="Food">Food</option>
                <option value="Beveragres">Beveragres</option>
                <option value="Snacks">Snacks</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Product Image URL"
              className="mb-3"
            >
              <Form.Control
                req
                name="imageURL"
                type="text"
                placeholder="www.images.com"
                value={currentSelection.imageURL}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={(e) => {
                setEdit(false)
                handleUpdateProduct(currentSelection)
              }}
            >
              Update
            </Button>
            <Button variant="secondary" onClick={(e) => setEdit(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={remove}
          onHide={(e) => setRemove(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Are you sure you want to delete this product?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Product Name: {currentSelection.name}</p>
            <p>Product Code: {currentSelection.code}</p>
            <p>Product Price: ${currentSelection.price}</p>
            <p>Product Category: {currentSelection.category}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={(e) => {
                setRemove(false)
                handleDeleteProduct(currentSelection)
              }}
            >
              Delete
            </Button>
            <Button variant="secondary" onClick={(e) => setRemove(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <ReactPagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default FilterableProductTable
