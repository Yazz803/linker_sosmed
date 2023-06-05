/* eslint-disable no-unused-vars */
import "yazz/styles/globals.css";
import "yazz/styles/appearanceSettings.css";
import "yazz/styles/nprogress.css";
import "antd/dist/reset.css";
import { AuthProvider } from "yazz/context/AuthContext";
import { useEffect } from "react";
import nProgress from "nprogress";
import Router from "next/router";
import { AppContextProvider } from "yazz/context/AppContext";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let template = `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>
    `;
    nProgress.configure({ showSpinner: true, template: template });
    Router.events.on("routeChangeStart", (url) => {
      // console.log(nProgress);
      nProgress.start();
    });

    Router.events.on("routeChangeComplete", (url) => {
      nProgress.done(false);
    });

    Router.events.on("routeChangeError", (url) => {
      nProgress.start();
    });
  }, []);
  return (
    <AppContextProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </AppContextProvider>
  );
}
