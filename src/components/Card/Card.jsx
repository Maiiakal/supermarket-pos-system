import { Card as ReactCard } from 'react-bootstrap'
import './Card.css'

  // props, card size, image size, image=true/false, title=true/false, text=true/false

export function Card ({ props }) {
  return (
    <ReactCard className="border-0 card">
      <ReactCard.Img className="image" variant="top" src={props.imageURL} />
      <ReactCard.Body>
        <ReactCard.Title className="title fs-5 text-muted fw-light">
          {props.name}
        </ReactCard.Title>
        <ReactCard.Text className="text fs-3 text-dark fw-bold">${props.price}</ReactCard.Text>
      </ReactCard.Body>
    </ReactCard>
  )
}

export default Card
