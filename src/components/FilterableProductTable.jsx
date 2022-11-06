import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import '../styles/Table.css'

const products = [
  {
    name: 'Fish',
    price: 23,
    category: 'food',
    code: '0',
    imageURL: '',
    datecreated: new Date(),
  },
  {
    name: 'Milk',
    price: 12,
    category: 'food',
    code: '1',
    imageURL: '',
    datecreated: new Date(),
  },
  {
    name: 'Lettuce',
    price: 4,
    category: 'vegetables',
    code: '2',
    imageURL: '',
    datecreated: new Date(),
  },
]

const FilterableProductTable = () => {
  return (
    <div>
      <h1>Product Table</h1>

      {products.map((product) => (
        <div key={product.code}>
          <h2>{product.name}</h2>
        </div>
      ))}

      <h1>Product Table</h1>

      <Table striped bordered hover className="table-container">
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
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
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
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
          <tr>
            <td>3</td>
            <td>Thornton</td>
            <td>Thornton</td>
            <td>@twitter</td>
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
        </tbody>
      </Table>
    </div>
  )
}

export default FilterableProductTable
