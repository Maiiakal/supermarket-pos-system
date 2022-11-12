import '../../assets/styles/Table.css'
import { useState, useMemo } from 'react'
import ReactPagination from './Pagination'
import Search from './Search'
import { ProductsGenerator } from '../Data'
import { Button, Modal } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const ITEMS_PER_PAGE = 30

const FilterableProductTable = () => {
  // paginations states
  const [search, setSearch] = useState('')
  const [list, setList] = useState(ProductsGenerator(130))
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
    let filteredResult = list

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
  }, [list, currentPage, search])

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
                  View
                </Button>
                <Button
                  className="button"
                  variant="success"
                  name="edit"
                  onClick={(e) => handleClick(e, product)}
                >
                  Edit
                </Button>
                <Button
                  className="button"
                  variant="danger"
                  name="delete"
                  onClick={(e) => handleClick(e, product)}
                >
                  Delete
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
      <h1 className="title">Product Table</h1>

      <Search
        onSearch={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
      />

      <p className="serachbox-text">Please search by code only!</p>

      <Button
        variant="outline-primary"
        className="addbtn"
        name="add"
        onClick={(e) => handleClick(e)}
      >
        Add Product
      </Button>

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
                setList(list.filter((p) => currentSelection.code !== p.code))
                setList([
                  ...list,
                  {
                    code: currentSelection.code,
                    name: currentSelection.name,
                    price: currentSelection.price,
                    category: currentSelection.category,
                    imageURL: currentSelection.imageURL,
                  },
                ])
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
                // eslint-disable-next-line
                list.map((p) => {
                  if (p.code === currentSelection.code) {
                    p.name = currentSelection.name
                    p.price = currentSelection.price
                    p.category = currentSelection.category
                    p.imageURL = currentSelection.imageURL
                  }
                })
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
                setList(list.filter((p) => currentSelection.code !== p.code))
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
