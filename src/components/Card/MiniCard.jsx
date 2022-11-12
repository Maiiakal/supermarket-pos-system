import { Card as ReactCard } from 'react-bootstrap'
import './MiniCard.css'

// props, card size, image size, image=true/false, title=true/false, text=true/false

export function MiniCard({ props, total }) {
    return <ReactCard className="shadow border cardSize">
        <img className="icon" src={props.imageURL}></img>
        <h6 className="titleSize text-muted fw-light">{props.name}</h6>
        <h6 className="textSize text-muted fw-normal">{total} items</h6>
  </ReactCard>
}

export default MiniCard