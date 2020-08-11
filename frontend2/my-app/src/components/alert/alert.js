import React, { useState } from "react";
import { Alert } from "reactstrap";
import "./alert.css";

const Alertt = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  if (!visible) {
    window.location.href = "/";
  }

  return (
    <div className="al">
      <Alert color={props.type} isOpen={visible} toggle={onDismiss}>
        {props.message}
      </Alert>
    </div>
  );
};

export default Alertt;
