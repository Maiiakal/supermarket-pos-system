import '../styles/Table.css'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { useState, useEffect } from 'react'

const productsGenerator = (quantity) => {
  const items = []
  for (let i = 0; i < quantity; i++) {
    items.push({
      code: i,
      name: `Item name ${i}`,
      price: i + 10,
      category: 'food',
      imageURL: '',
      datecreated: new Date(),
    })
  }
  return items
}

const calculatePages = (data, rowsPerPage) => {
  const pages = []
  const num = Math.ceil(data.length / rowsPerPage)
  for (let i = 2; i <= num; i++) {
    pages.push(<Pagination.Item key={i}>{i}</Pagination.Item>)
  }
  return pages
}

const ReactPagination = ({ pages }) => {
  return (
    <Pagination className="pagination">
      <Pagination.First />
      <Pagination.Prev />

      <Pagination.Item active>{1}</Pagination.Item>

      {pages}

      <Pagination.Ellipsis />
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}

const FilterableProductTable = () => {
  const [index, setIndex] = useState(1)
  //const [pages, setPages] = useState()

  const products = productsGenerator(100)
  const pages = calculatePages(products, 10)

  return (
    <div>
      <h1 className="title">Product Table</h1>

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
          {}
          {products.map((product) => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{'$' + product.price}</td>
              <td>
                <Button className="button" variant="primary">
                  View
                </Button>
                <Button className="button" variant="success">
                  Edit
                </Button>
                <Button className="button" variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ReactPagination pages={pages} />
    </div>
  )
}

export default FilterableProductTable
