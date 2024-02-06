import React from "react";
import { Input, Typography } from "antd";
import { ErrorAlert } from "../error";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

const { Password } = Input;
const { Text } = Typography;

export default function App({
  label,
  placeholder,
  name,
  type,
  enabled = true,
  formik,
  icon = "",
}) {
  return (
    <>
      <Text>{label}</Text>
      <Password
        placeholder={placeholder}
        type={type}
        disabled={!enabled}
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        suffix={!isEmpty(icon) && <i className={`${icon} input--icon`}></i>}
      />
      {formik.errors[name] && formik.touched[name] && (
        <ErrorAlert message={formik.errors[name]} />
      )}
    </>
  );
}
App.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  enabled: PropTypes.bool,
  icon: PropTypes.string,
};
