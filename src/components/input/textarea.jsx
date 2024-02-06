import React from "react";
import { Input, Typography } from "antd";
import { ErrorAlert } from "../error";
import PropTypes from "prop-types";

const { Text } = Typography;
const { TextArea } = Input;

export default function App({
  label,
  placeholder,
  name,
  type,
  enabled = true,
  formik,
}) {
  return (
    <React.Fragment>
      <Text>{label}</Text>
      <TextArea
        placeholder={placeholder}
        type={type}
        disabled={!enabled}
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        rows={6}
      />
      {formik.errors[name] && formik.touched[name] && (
        <ErrorAlert message={formik.errors[name]} />
      )}
    </React.Fragment>
  );
}

App.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  enabled: PropTypes.bool,
};
