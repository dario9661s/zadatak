import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from "../components/UI/Navbar"
import React from "react"
import 'semantic-ui-css/semantic.min.css'


function MyApp({ Component, pageProps }: AppProps) {
  return<React.Fragment>  
          <Nav />
          <Component {...pageProps} />
        </React.Fragment>
  
}
export default MyApp
