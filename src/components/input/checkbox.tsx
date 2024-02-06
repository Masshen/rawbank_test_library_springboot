import { Checkbox, Input, Radio, Typography } from "antd";
import React from "react";
import { ErrorAlert } from "../error";
import PropTypes from "prop-types";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const { Text } = Typography;

const App: React.FC<{
  label?: string;
  list: { value: string; title: string }[];
  withFree?: boolean;
  id?: string | number;
  name: string;
  formik: any;
  enabled?: boolean;
}> = ({ formik, list, name, enabled, id, label, withFree }) => {
  const [freeValue, setFreeValue] = React.useState(
    ((v) => (list.some((p) => p.value === v) ? "" : v))(formik.values[name])
  );
  const handleFreeChange = (event: any) => {
    const value = event.target.value;
    setFreeValue(value);
    formik.setFieldValue(name, value);
  };

  function onChange(value: CheckboxValueType[]) {
    formik.setFieldValue(name, value);
  }
  return (
    <React.Fragment>
      <Text>{label}</Text>
      <Checkbox.Group
        disabled={!enabled}
        name={name}
        onChange={onChange}
        value={formik.values[name]}
        style={{ display: "block" }}
      >
        {list.map((p) => (
          <Checkbox
            className="checkbox"
            key={`checkbox${id + p.value}`}
            value={p.value}
          >
            {p.title}
          </Checkbox>
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
      </Checkbox.Group>
      {formik.errors[name] && formik.touched[name] && (
        <ErrorAlert message={formik.errors[name]} />
      )}
    </React.Fragment>
  );
};

export default App;
