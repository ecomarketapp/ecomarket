import React from 'react';
import Footer from './footer';
import Header from './navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
