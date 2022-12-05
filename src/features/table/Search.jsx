import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const onInputChange = (value) => {
    setSearch(value)
    onSearch(value)
  }
  return (
    <>
      <InputGroup className="mb-3 searchbox">
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
        </InputGroup.Text>
        
        <Form.Control
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </InputGroup>
    </>
  )
}

export default Search
