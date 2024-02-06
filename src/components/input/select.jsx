import { Button, Input, Select, Typography } from "antd";
import React from "react";
import { ErrorAlert } from "../error";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Text } = Typography;

export default function App({
  label = "",
  loading = false,
  setSearch,
  name,
  titleBtn = "",
  placeholder = "",
  list = [],
  id,
  search = false,
  showInput = false,
  formik,
  enabled = true,
  className = "",
  width = "100%",
  onClick,
}) {
  const [show, setShow] = React.useState(false);
  const [content, setContent] = React.useState(formik.values[name]);
  function handleSearch(v) {
    setContent(v);
    if (setSearch != undefined && setSearch != null) {
      setSearch(v);
    }
  }
  function handleChange(v) {
    formik.setFieldValue(name, v);
    const fil = list.filter((p) => p.value == v);
    if (fil.length > 0) {
      setContent(fil[0].title);
    }
  }
  function handleAddNew() {
    //setShow(!show);
    setShow(false);
    formik.values[name] = content;
    if (typeof onClick === "function") {
      onClick(content);
    }
  }
  const DropdownMenu = () => {
    return (
      <Button
        icon={
          <PlusCircleFilled
            className="text-primary-color"
            style={{ fontSize: 20 }}
          />
        }
        onClick={handleAddNew}
        className="text-primary-color form-btn-add_new"
        type="text"
      >
        {titleBtn}
      </Button>
    );
  };
  return (
    <div style={{ margin: "5px 0" }}>
      <Text level={5} className="text-primary-color form-title">
        {label}
      </Text>
      {show == false && (
        <Select
          showSearch={search}
          optionFilterProp="children"
          className={`${className}`}
          loading={loading}
          disabled={!enabled}
          notFoundContent={<div>Liste vide</div>}
          key={`select${name}`}
          dropdownRender={(menu) => (
            <div>
              {showInput == true && <DropdownMenu />}
              {menu}
            </div>
          )}
          style={{ width: width }}
          onChange={(v) => handleChange(v)}
          value={formik?.values[name] ?? ""}
          onSearch={handleSearch}
        >
          {list.map((p, index) => (
            <Select.Option
              key={`select${name + p.value}_${index}`}
              value={p.value}
            >
              {p.title}
            </Select.Option>
          ))}
        </Select>
      )}
      {show == true && (
        <Input
          placeholder={placeholder}
          type="text"
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          suffix={
            <Button shape="circle" onClick={() => setShow(!show)}>
              <SearchOutlined style={{ color: "#cb5d4b" }} />
            </Button>
          }
        />
      )}
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
  loading: PropTypes.bool,
  setSearch: PropTypes.func,
  titleBtn: PropTypes.string,
  list: PropTypes.array,
  search: PropTypes.bool,
  showInput: PropTypes.bool,
  id: PropTypes.number | PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.any,
};
