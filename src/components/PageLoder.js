import React from 'react';
import Spinner from "react-bootstrap/Spinner";

const PageLoder = (props) => {
  const {className} = props
  return (
    <div className={`center-v position-absolute loder-wrp ${className} `}>
        <Spinner/>
    </div>
  )
}

export default PageLoder