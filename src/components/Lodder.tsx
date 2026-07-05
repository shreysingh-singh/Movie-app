import type { useState } from "react";
import Spinner from "react-bootstrap/Spinner";


function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
