import '../../styles/NavBar.css'
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
              to="/"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >
              Home
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
            <NavLink
              to="/pos"
              className={({ isActive }) => (isActive ? 'link-active' : '')}
            >
              POS
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
