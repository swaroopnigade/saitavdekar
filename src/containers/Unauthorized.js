import React from "react";
import {Link} from "react-router-dom"

const Unauthorized = () => {
  return (
    <div className="center-v">
      <div className="text-center">Your are not Authorized user or your session might be expired <br/>
        <Link to="/Login">Please try to login again</Link>
      </div>
    </div>
  );
};

export default Unauthorized;
