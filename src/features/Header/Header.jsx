import '../../assets/styles/NavBar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

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
              Cart
            </NavLink>
            <NavLink
              to="/product-table"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >
              Products
            </NavLink>
            <NavLink
              to="/category-table"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >
              Categories
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
