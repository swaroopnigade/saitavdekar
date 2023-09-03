import React from 'react'
import Spinner from "react-bootstrap/Spinner";

const BoxLoader = () => {
  return (
    <div className="position-absolute box-loader">
        <Spinner/>
    </div>
  )
}

export default BoxLoader