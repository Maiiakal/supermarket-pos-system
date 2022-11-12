import { Card } from 'react-bootstrap'
import './Card.css'


const imageURL =
  'https://wearenotmartha.com/wp-content/uploads/DIY-Rock-Candy-Featured.jpg'

function ReactCard({ props }) {
  return (
    <Card className="border-0 card">
      <Card.Img className="image" variant="top" src={props.imageURL} />
      <Card.Body>
        <Card.Title className="title fs-5 text-muted fw-light">
          {props.name}
        </Card.Title>
        <Card.Text className="text fs-3 fw-bold">${props.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ReactCard
