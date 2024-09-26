/* eslint-disable react/prop-types */

import { Form, Input, Select } from "antd";

const FormItem = ({ item, handleAddCategory }) => {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const renderInput = (item) => {
    let content = <></>;

    switch (item.type) {
      case "select":
        content = (
          <Select
            defaultValue=""
            style={{
              width: "100%",
            }}
            options={options}
            placeholder="Enter Categories"
            onChange={handleAddCategory}
          ></Select>
        );
        break;
      default:
        content = (
          <Input type={item.type} placeholder={item.placeholder} allowClear />
        );
        break;
    }
    return content;
  };
  return (
    <div>
      <Form.Item
        key={item.key}
        label={item.label}
        name={item.value}
        rules={[
          {
            type: item.type === "email" ? "email" : "",
            required: item.required,
            message: item.message,
          },
        ]}
      >
        {renderInput(item)}
      </Form.Item>
    </div>
  );
};

export default FormItem;
