import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useState } from "react";
import ValidationForm from "../components/ValidationForm"

function CreatePost() {
  return (
    <Grid
      className="formContainer"
      container
      justifyContent="center"
      alignItems="center"
    > 
      <ValidationForm update= {"NoUpdate"} />
    </Grid>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 1,
  };
}

export default CreatePost;
