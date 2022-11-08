import '../styles/Table.css'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { Pagination } from 'react-bootstrap'
import { useState, useEffect, useMemo } from 'react'
import Search from './common/Search'

const ITEMS_PER_PAGE = 30

const FilterableProductTable = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)

  function productsGenerator(quantity) {
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

  function calculatePages(data) {
    const pages = []
    const num = Math.ceil(data.length / ITEMS_PER_PAGE)
    for (let i = 2; i <= num; i++) {
      pages.push(<Pagination.Item key={i}>{i}</Pagination.Item>)
    }
    return pages
  }

  function ReactPagination({ pages }) {
    return (
      <Pagination className="pagination">
        <Pagination.First />
        <Pagination.Prev />

        <Pagination.Item active>{1}</Pagination.Item>

        {pages}

        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    )
  }

  const products = productsGenerator(110)
  const pages = calculatePages(products, ITEMS_PER_PAGE)

  const filtered = useMemo(() => {
    let filteredResult = products

    if (search) {
      filteredResult = filteredResult.filter(r => 
        r.code == parseInt(search)
      )
    }

    setTotalItems(filteredResult.length)

    return filteredResult.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    )
  }, [results, currentPage, search])

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
      ) : (
        <div className="text-center">
          <h4>No result found</h4>
        </div>
      )}

      <ReactPagination pages={pages} />
    </div>
  )
}

export default FilterableProductTable

/*
  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

*/
