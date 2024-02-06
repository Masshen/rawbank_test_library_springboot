import { Alert } from "antd";
import React from "react";
import PropTypes from "prop-types";

export function ErrorAlert({ message = "" }) {
  return (
    <React.Fragment>
      <Alert style={{ padding: "0 15px" }} message={message} type="error" />
    </React.Fragment>
  );
}
ErrorAlert.propTypes = {
  message: PropTypes.string,
};
