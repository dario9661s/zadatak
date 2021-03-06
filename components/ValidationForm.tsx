import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import Input from "../components/UI/Input";
import TextArea from "../components/UI/TextArea";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { newPost } from "../store/actions/postsAction";
import {useAppSelector} from '../hooks/hooks'
interface Project {
  title: string;
  description: string;
  image: string;
  goal: number;
  video: string;
}

function CreatePost(props: { update: string | string[] | undefined }) {
  const router = useRouter();
  const dispatch = useDispatch();
  let [focused, setFocused] = useState(false);
  const newPostState = useAppSelector((state:{post:{newPost:any}}) => state.post);
  console.log(newPostState.newPost);
  
  const validate = Yup.object({
    title: Yup.string()
      .max(100, "Maximum is 100 characters")
      .min(5, "Minimum is 5 characters")
      .required("Required"),
    description: Yup.string()
      .min(20, "Minimum is 20 characters")
      .max(300, "Maximum is 300")
      .required("Required"),
    image: Yup.string().url("Must Be URL").required("Required"),
    video: Yup.string().url("Must Be URL").required("Required"),
    goal: Yup.number()
      .max(100000, "Maximum is 100000")
      .min(100, "Minimum is 100")
      .required("Required"),
  });
  const onSubmit = (values: Project) => {
    if (props.update !== "NoUpdate") {
      axios
        .get(
          `/api/update?id=${props.update}&title=${values.title}&description=${
            values.description
          }&image=${values.image}&video=${
            values.video
          }&goal=${values.goal.toString()}`
        )
        .then((res) => {
          dispatch(newPost(true));
          router.reload();
          console.log(res);
        });
    } else {
      axios
        .get(
          `/api/project-create?title=${values.title}&description=${
            values.description
          }&image=${values.image}&video=${
            values.video
          }&goal=${values.goal.toString()}`
        )
        .then((res) => {
          dispatch(newPost(true));
          router.push("/posts");
        });
    }
  };


  return (
    <Grid
      className="formContainer"
      container
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          image: "",
          video: "",
          goal: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => console.log(values)}
      >
        {(formik: { values: Project; isValid: boolean; dirty: boolean }) => (
          <div
            style={{
              width: props.update !== "NoUpdate" ? "90%" : "40%",
              padding: "5%",
            }}
          >
            <h1>Form</h1>
            {console.log(formik.values)}
            <Form className="ui form">
              <Input name="title" type="text" />
              <TextArea name="description" />
              <Input name="image" type="text" />
              <Input name="video" type="text" />
              <Input name="goal" type="number" />
              <Button
                primary
                disabled={!(formik.isValid && formik.dirty)}
                onClick={() => onSubmit(formik.values)}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </Grid>
  );
}

export default CreatePost;
