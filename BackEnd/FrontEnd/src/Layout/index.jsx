import React from 'react';
import Header from './Header'

const Layout = (props) => {

  const {children} = props;

  return (
    <div style={{height:'100%'}} >
      <Header />
        {children}
    </div>
  );
};

export default Layout;