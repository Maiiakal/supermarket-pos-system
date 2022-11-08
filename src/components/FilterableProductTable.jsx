import '../styles/Table.css'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import ReactPagination from './common/Pagination'
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

  const products = productsGenerator(110)


  const filtered = useMemo(() => {
    let filteredResult = products

    if (search) {
      filteredResult = filteredResult.filter((r) => r.code == parseInt(search))
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

      <ReactPagination total={totalItems} itemsPerPage = {ITEMS_PER_PAGE} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}/>

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
