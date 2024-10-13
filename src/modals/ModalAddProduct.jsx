/* eslint-disable react/prop-types */
import { Form, Input, Modal } from "antd";
import { useState } from "react";

const ModalAddProduct = ({ visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const handleClose = () => {
    onClose();
  };
  const handleAddProduct = (value) => {};
  return (
    <Modal open={visible} onCancel={handleClose} onClose={handleClose}>
      Modal Add Product
      <Form
        form={form}
        disabled={isLoading}
        layout="vertical"
        onFinish={handleAddProduct}
        size="large"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please enter a title",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
