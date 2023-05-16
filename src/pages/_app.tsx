import React from "react"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import "@/styles/nprogress.css"
import { Router } from "next/router"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/AuthContext"
import nProgress from "nprogress"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  React.useEffect(() => {
    let template = `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>
    `
    nProgress.configure({ showSpinner: false, template: template })
    Router.events.on("routeChangeStart", (url) => {
      // console.log(nProgress);
      nProgress.start()
    })

    Router.events.on("routeChangeComplete", (url) => {
      nProgress.done(false)
    })

    Router.events.on("routeChangeError", (url) => {
      nProgress.start()
    })
  }, [])
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
