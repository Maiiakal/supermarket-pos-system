import '../../styles/NavBar.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

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
            <Link to="/">Home</Link>
            <Link to="/product-table">Products</Link>
            <Link to="/category-table">Categories</Link>
            <Link to="/pos">POS</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
