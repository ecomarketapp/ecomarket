import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children, resultRef}) => {

  if(!resultRef){
    resultRef = null
  }
  return (
    <>
        <Header resultRef={resultRef} />

        {children}

        <Footer/>
    
    </>
  )
}

export default Layout