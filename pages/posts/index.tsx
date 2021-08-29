import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import Card from "../../components/UI/Card";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/actions/postsAction";
import { newPost } from "../../store/actions/postsAction";
import { useAppSelector } from '../../hooks/hooks'


function Projects() {
  const dispatch = useDispatch();
  const postState = useAppSelector((state:{post:{posts:[]}}) => state.post.posts);
  const newPostState = useAppSelector((state:{post:{newPost:any}}) => state.post.newPost);
  console.log(newPostState);
  
  useEffect(() => {
    axios.get(`/api/project`).then((res:any) => {
      dispatch(setPosts(res.data.result));
      console.log(res.data);
      
    });
  }, []);

  useEffect(() => {
   if(postState){
     setTimeout(()=> {
      dispatch(newPost(false))
     }, 4500)
   }
  }, [newPostState]);
console.log(newPostState);

  return (
    <div className="CardContainer">
     { newPostState?<div className="newPost"><p>New Post Created</p></div> : null}
      <div className="createNew">
        <Button basic>
          <Link href="/create-post">Create New</Link>
        </Button>
      </div>
      {postState && postState.length < 1 || postState == undefined ? <div><h1>There are curretly no posts please add some..</h1></div>: postState && postState.map((project: {id:string,image:string,title:string,video:string,goal:number,description:string}) => {
        return <Card project={project} />;
      })}
    </div>
  );
}

export default Projects;
