import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingUI = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingUI;

// export interface AuxProps {
//   children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
// }
