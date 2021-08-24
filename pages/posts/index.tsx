import { Grid } from "@material-ui/core"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Button, Form } from "semantic-ui-react"
import Card from "../../components/UI/Card"
import Link from "next/link"
function Projects() {
  const [projects, setProjects] = useState([])

  const router = useRouter()
  // ibiytest
  //ibiy2021
  console.log();
  
  useEffect(() => {
    axios
      .get(`/api/project`)
      .then((res) => {
        setProjects(res.data.result)
        console.log(res.data.result);
        
      })
  }, [])

 
  return (
   <div className="CardContainer">
     <div className="createNew">
       <Button basic><Link href="/create-post">Create New</Link></Button>
     </div>
      {projects &&  projects.map((project:any)=> {
        return <Card project= {project} />
      })}
   </div>
  )
}

export default Projects
