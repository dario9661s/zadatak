import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "semantic-ui-react";
import ValidationForm from "../../components/ValidationForm";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Loader } from "semantic-ui-react";

function Post() {
  const [project, setProject] = useState<
    | undefined
    | {
        image: string;
        title: string;
        description: string;
        goal: number;
        video: string;
      }
  >();
  const [media, setMedia] = useState("image");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const postId :string | string[] | undefined  = router.query.postId;

  useEffect(() => {
    axios.get(`/api/project`).then((res) => {
      res.data.result.map((res: any) => {
        if (res.id === postId) {
          setProject(res);
        }
      });
    });
  }, [postId]);

  if (!router.isReady) {
    return <Loader size="large"></Loader>;
  } else {
    const handleClose = () => {
      setOpen(false);
    };

    const deleteHandler = () => {
      axios.get(`/api/delete?id=${postId}`).then((res) => {
        if (res.data.success === true) {
          router.push("/posts");
        }
      });
    };

    return (
      <div className="PostContainer">
        {open ? (
          <Modal
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
              <ValidationForm update={postId} />
            </Fade>
          </Modal>
        ) : null}
        <div className="media">
          {media === "image" ? (
            <img className="mediaImg" src={project && project.image} />
          ) : (
            <ReactPlayer width={"100%"} height={300} url={project && project.video} />
          )}
          <div className="mediaSelector">
            <img
              onClick={() => setMedia("image")}
              src={project && project.image}
            />
            <img
              height="100px"
              width="100px"
              onClick={() => setMedia("video")}
              src={"/play.png"}
            />
          </div>
        </div>
        <div className="description">
          <h1> {project && project.title} </h1>
          <p>{project && project.description}</p>
          <h3> Goal: {project && project.goal}.00 </h3>
          <div style={{ display: "flex" }}>
            <Button onClick={() => deleteHandler()} color="red">
              Delete
            </Button>
            <Button onClick={() => setOpen(!open)} secondary>
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
