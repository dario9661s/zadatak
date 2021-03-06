import type { NextPage } from 'next'
import Head from 'next/head'
import { Grid } from "@material-ui/core"
import styles from '../styles/Home.module.css'
import axios from "axios"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setLogin } from "../store/actions/postsAction";
import { Button, Form } from "semantic-ui-react"

const Home: NextPage = () => {
  const dispatch = useDispatch();
  
  const router = useRouter()
  const [username, setUsermane] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const loginHandle = () => {
    axios
      .get(`/api/login?username=${username}&password=${password}`)
      .then((res:any) => {
        if(res.data.name ==="Error"){
          setError(true)
        } else {
          dispatch(setLogin(true));
          console.log(res)
          router.push("/posts")
          setError(false)
        }
      })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>I Belive In You</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
      className="formContainer"
      container
      justifyContent="center"
      alignItems="center"
    >
      <Form>
        <h1>LoggIn</h1>
     <Form.Field>
          <input
            onChange={(event) => setUsermane(event.target.value)}
            placeholder="Username"
          />
        </Form.Field>  
        <Form.Field>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </Form.Field> 

    {error? <div style={{bottom: "37px"}} className="errorMsg"><p>Invalid credentials please try again</p></div> :null}
    <Button primary onClick={() => loginHandle()} type="submit">
          Submit
        </Button> 
      </Form>
    </Grid>
      <footer className={styles.footer}>
        <p>ibiytest</p>
        <p> ibiy2021</p>
      </footer>
    </div>
  )
}
export default Home
