import React, { useEffect, useState, useMemo } from 'react'
import Pagination from 'react-bootstrap/Pagination'

const ReactPagination = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage))
  }, [total, itemsPerPage])

  const paginationItems = useMemo(() => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>,
      )
    }
    return pages
  }, [totalPages, currentPage, onPageChange])

  if (totalPages === 0) return null

  return (
    <Pagination>
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

export default ReactPagination

/* 

function calculatePages(data) {
    const pages = []
    const num = Math.ceil(data.length / ITEMS_PER_PAGE)
    for (let i = 2; i <= num; i++) {
      pages.push(<Pagination.Item key={i}>{i}</Pagination.Item>)
    }
    return pages
  }

  function ReactPagination1({ pages }) {
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

    const pages = calculatePages(products, ITEMS_PER_PAGE)


*/
