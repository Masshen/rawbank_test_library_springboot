import React from "react";
import { Input, Typography } from "antd";
import { ErrorAlert } from "../error";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

const { Text } = Typography;

export default function App({
  label,
  placeholder,
  name = "",
  type = "text",
  enabled = true,
  formik = {},
  icon = "",
  className = "",
  prefix = false,
  inline = false,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        marginTop: 5,
        marginBottom: 5,
        alignItems: "center",
        display: inline ? "flex" : "block",
      }}
      className={
        formik.errors[name] && formik.touched[name] ? "yc-input-shake" : ""
      }
    >
      <Text
        className="yc-input-label"
        style={inline ? { padding: "10px 10px 10px 0" } : {}}
      >
        {label}
      </Text>
      <div style={inline ? { flex: 1 } : {}}>
        <Input
          placeholder={placeholder}
          type={type}
          style={{ borderRadius: 5 }}
          disabled={!enabled}
          value={formik.values[name]}
          onChange={formik.handleChange}
          name={name}
          className={`yc-input ${className}`}
          suffix={!isEmpty(icon) && <i className={`${icon} input--icon`}></i>}
          prefix={prefix && <i className={`${icon} input--icon`}></i>}
        />
      </div>
      {formik.errors[name] && formik.touched[name] && (
        <ErrorAlert message={formik.errors[name]} />
      )}
    </div>
  );
}

App.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  enabled: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string,
  prefix: PropTypes.bool,
  inline: PropTypes.bool,
};
