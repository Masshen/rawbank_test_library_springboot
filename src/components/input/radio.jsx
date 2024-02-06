import { Input, Radio, Typography } from "antd";
import React from "react";
import { ErrorAlert } from "../error";
import PropTypes from "prop-types";

const { Text } = Typography;

export default function App({
  label = "",
  list = [],
  withFree = false,
  id,
  name,
  formik,
  enabled = true,
  className = "",
  button = true,
  inline = false,
}) {
  const [freeValue, setFreeValue] = React.useState(
    ((v) => (list.some((p) => p.value === v) ? "" : v))(formik.values[name])
  );
  const handleFreeChange = (event) => {
    const value = event.target.value;
    setFreeValue(value);
    formik.setFieldValue(name, value);
  };
  return (
    <div className={className}>
      <div
        style={
          inline
            ? {
                display: "inline-block",
                padding: "10px 10px 10px 0",
              }
            : {}
        }
      >
        <Text>{label}</Text>
      </div>
      <Radio.Group
        disabled={!enabled}
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        optionType={button ? "button" : "default"}
        buttonStyle="solid"
      >
        {list.map((p) => (
          <Radio
            type="primary"
            className="radio"
            key={`radio${id + p.value}`}
            value={p.value}
          >
            {p.title}
          </Radio>
        ))}
        {withFree && (
          <Radio
            className="radio"
            style={{ color: "#cb5d4b", fontWeight: "bold" }}
            key={`radio${id + "_free"}`}
            value={freeValue}
          >
            <Input
              type="text"
              disabled={!enabled}
              value={freeValue}
              onChange={handleFreeChange}
            />
          </Radio>
        )}
      </Radio.Group>
      {formik.errors[name] && formik.touched[name] && (
        <ErrorAlert message={formik.errors[name]} />
      )}
    </div>
  );
}
App.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  enabled: PropTypes.bool,
  list: PropTypes.array,
  withFree: PropTypes.bool,
  id: PropTypes.number | PropTypes.string,
  className: PropTypes.string,
  button: PropTypes.bool,
  inline: PropTypes.bool,
};
