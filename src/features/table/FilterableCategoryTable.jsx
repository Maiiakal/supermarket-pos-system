import '../../assets/styles/Table.css'
import { useState, useMemo } from 'react'
import ReactPagination from './Pagination'
import Search from './Search'
import { CategoryGenerator } from '../Data'
import { Button, Modal } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const ITEMS_PER_PAGE = 30

const FilterableCategoryTable = () => {
  // paginations states
  const [search, setSearch] = useState('')
  const [list, setList] = useState(CategoryGenerator(130))
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
  function handleClick(e, category) {
    if (e.target.name === 'add') {
      setAdd(true)
      setCurrentSelection({
        name: '',
      })
    } else if (e.target.name === 'view') {
      setView(true)
      setCurrentSelection(category)
    } else if (e.target.name === 'edit') {
      setEdit(true)
      setCurrentSelection(category)
    } else {
      setRemove(true)
      setCurrentSelection(category)
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
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <Button
                  className="button"
                  variant="primary"
                  name="view"
                  onClick={(e) => handleClick(e, category)}
                >
                  View
                </Button>
                <Button
                  className="button"
                  variant="success"
                  name="edit"
                  onClick={(e) => handleClick(e, category)}
                >
                  Edit
                </Button>
                <Button
                  className="button"
                  variant="danger"
                  name="delete"
                  onClick={(e) => handleClick(e, category)}
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
      <h1 className="title">Category Table</h1>

      <Search
        onSearch={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
      />

      <p className="serachbox-text">Please search by name!</p>

      <div class="me-5 d-flex justify-content-end">
        <Button
        variant="outline-primary"
        className="addBtn"
        name="add"
        onClick={(e) => handleClick(e)}
      >
        Add Category
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
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Category Name"
              className="mb-3"
            >
              <Form.Control
                req
                name="name"
                type="text"
                placeholder="Food"
                value={currentSelection.name}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Category icon URL"
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
                setList(list.filter((c) => currentSelection.name !== c.name))
                setList([
                  ...list,
                  {
                    name: currentSelection.name,
                    imageURL: currentSelection.imageURL,
                    id: list[list.length - 1].id + 1,
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
            <Modal.Title>Category Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Category Name: {currentSelection.name}</p>
            <p>Category ID: {currentSelection.id}</p>
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
            <Modal.Title>Category Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Category Name"
              className="mb-3"
            >
              <Form.Control
                req
                name="name"
                type="text"
                placeholder="Food"
                value={currentSelection.name}
                onChange={handleInputChange}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Category icon URL"
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
                list.map((c) => {
                  if (c.id === currentSelection.id) {
                    c.name = currentSelection.name
                    c.imageURL = currentSelection.imageURL
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
            <Modal.Title>Are you sure you want to delete this?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Category Name: {currentSelection.name}</p>
            <p>Category image URL: {currentSelection.imageURL}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={(e) => {
                setRemove(false)
                setList(list.filter((c) => currentSelection.id !== c.id))
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

export default FilterableCategoryTable
