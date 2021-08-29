import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/UI/Navbar";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store/store";
import { CookiesProvider } from "react-cookie";

type Props = {
  pageProps: Object;
  Component: any;
  store: Object;
};

const MyApp: React.FC<Props> = (props) => {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <CookiesProvider>
        <Nav />
        <Component {...pageProps} />
      </CookiesProvider>
    </Provider>
  );
};

const makestore: any = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);
