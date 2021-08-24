import React from "react"
import Link from "next/link"

const CardExampleCard = (props: {
  project: {
    id:string
    title: string
    image: string
    description: string
  }
}) => {

  console.log(props.project.id);
  
  return <Link href={`/posts/${props.project.id}`}>
  <div className="Card">
    <img src={props.project.image} />
    <div className="CardDescription">
      <h3>{props.project.title} </h3>
      <p> {props.project.description} </p>
    </div>
  </div>
  </Link>
  
}

export default CardExampleCard
