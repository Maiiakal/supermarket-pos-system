import '../../assets/styles/NavBar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faTags, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="container">
        <Navbar.Brand className="brand" href="/">
          Sumart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/shopping-cart"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >
              <FontAwesomeIcon icon={faCartShopping} size="lg" /> Cart{' '}
            </NavLink>
            <NavLink
              to="/product-table"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >
              <FontAwesomeIcon icon={faStore} size="lg" /> Products{' '}
            </NavLink>
            <NavLink
              to="/category-table"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >  <FontAwesomeIcon icon={faTags} size="lg" /> Categories{' '}
              
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
