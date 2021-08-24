import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { Button } from "semantic-ui-react";
import ValidationForm from "../../components/ValidationForm"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Post() {
  const [project, setProject] = useState();
  const [media, setMedia] = useState("image");
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const postId = router.query.postId;

  console.log(postId);

  useEffect(() => {
    axios.get(`/api/project`).then((res) => {
      res.data.result.map((res: any) => {
        if (res.id === postId) {
          setProject(res);
        }
      });
      console.log(res.data.result);
    });
  }, []);

  const deleteHandler = () => {
    axios.get(`/api/delete?id=${postId}`).then((res) => {
      console.log(res);
      
     if(res.data.success === true) {
       router.push("/posts")
     }
     
      });
  }

  return (
    <div className="PostContainer">
      {open? <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="ValidationContainer"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <ValidationForm update= {postId} />
        </Fade>
      </Modal>  : null}
      <div className="media">
        {media === "image" ?<img className="mediaImg" src={project && project.image} />: <ReactPlayer url={project && project.video} />}
        <div className="mediaSelector">
          <img
            onClick={() => setMedia("image")}
            src={project && project.image}
          />
         <video height="100px" width="100px" onClick={() => setMedia("video")} src= {project && project.video} />
        </div>
      </div>
      <div className="description">
        <h1> {project && project.title} </h1>
        <p>{project && project.description}</p>
        <h3> {project && project.goal}.00 </h3>
        <div style={{display:"flex"}}>
          <Button onClick={()=>deleteHandler()} color="red" >Delete</Button>
          <Button onClick={()=>setOpen(!open)} secondary >Update</Button>
        </div>
      </div>
    </div>
  );
}







export default Post;
