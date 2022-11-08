import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const onInputChange = (value) => {
    setSearch(value)
    onSearch(value)
  }
  return (
    <>
      <input
        type="text"
        className="form-control searchbox"
        placeholder="Search"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <p className ="serachbox-text">Please search by code only!</p>
    </>
  )
}

export default Search
