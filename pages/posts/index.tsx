import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Card from "../../components/UI/Card";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/actions/postsAction";
import { useSelector } from "react-redux";

function Projects() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post.posts);
  useEffect(() => {
    axios.get(`/api/project`).then((res) => {
      dispatch(setPosts(res.data.result));
    });
  }, []);

  return (
    <div className="CardContainer">
      <div className="createNew">
        <Button basic>
          <Link href="/create-post">Create New</Link>
        </Button>
      </div>
      {postState.map((project: any) => {
        return <Card project={project} />;
      })}
    </div>
  );
}

export default Projects;
