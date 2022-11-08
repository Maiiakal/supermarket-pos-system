import '../styles/Table.css'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import ReactPagination from './common/Pagination'
import { useState, useEffect, useMemo } from 'react'
import Search from './common/Search'
import productsGenerator from './common/productsGenerator'
import ReactModal from './common/Modal'
import { Modal } from 'react-bootstrap'

const ITEMS_PER_PAGE = 30

const FilterableProductTable = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([]) // search result
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [view, setView] = useState(false)
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [remove, setRemove] = useState(false)

  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [Category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState('')

  const [currentSelection, setCurrentSelection] = useState({})

  const products = productsGenerator(110)

  const filtered = useMemo(() => {
    let filteredResult = products

    if (search) {
      filteredResult = filteredResult.filter((r) => r.code === parseInt(search))
    }

    setTotalItems(filteredResult.length)

    return filteredResult.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    )
  }, [results, currentPage, search])

  function handleClick(e, product) {
    setCurrentSelection(product)
    if (e.target.name === 'view') {
      setView(true)
    } else if (e.target.name === 'add') {
      setAdd(true)
    } else if (e.target.name === 'edit') {
      setEdit(true)
    } else {
      setRemove(true)
    }
    return
  }

  function handleInputChange(e) {
    setResults({
      ...results,
      [e.target.name]: e.target.value,
    })
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

      {totalItems ? (
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
      ) : (
        <div className="text-center">
          <h4>No result found</h4>
        </div>
      )}

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
          <p>Product Date Created: {currentSelection.date}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => setView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
          <p>Product Name: </p>
          <input 
            name="name"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />

          <p>Product Code: </p>
          <input
            name="code"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />

          <p>Product Price: $</p>
          <input
            name="price"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />

          <p>Product Category: </p>

          <input
            name="category"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => setAdd(false)}>
            Add
          </Button>
          <Button variant="secondary" onClick={(e) => setAdd(false)}>
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
          <p>Product Name: </p>
          <input 
            name="name"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />

          <p>Product Code: </p>
          <input
            name="code"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />

          <p>Product Price: $</p>
          <input
            name="price"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />

          <p>Product Category: </p>

          <input
            name="category"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => handleInputChange(e, results)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => setEdit(false)}>
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
          <p>Product Date Created: {currentSelection.date}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(e) => setRemove(false)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={(e) => setRemove(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

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
