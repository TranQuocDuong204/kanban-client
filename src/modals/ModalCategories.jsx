/* eslint-disable react/prop-types */
import replaceName from "@/utils/replaceName";
import { Modal, Form, Input, TreeSelect } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const ModalCategories = ({ visible, onClose, onAddNew, valueTree }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const handleClose = () => {
    form.resetFields();
    onClose();
  };
  const handleCategories = async (value) => {
    setIsLoading(true);
    const api = "http://localhost:8080/v1/product/add-category";
    const data = {};

    for (const i in value) {
      data[i] = value[i] ?? "";
    }
    data.slug = replaceName(value.title);
    try {
      const res = await axios.post(api, data, {
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.data;
      onAddNew(result.data);
      handleClose();
      Toastify(toast.success, result.message);
    } catch (error) {
      console.log(error);
      Toastify(toast.error, error);
    } finally {
      setIsLoading(false);
    }
  };

  const Toastify = (method, message) => {
    return method(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <Modal
      loading={isLoading}
      title={"Add Categories"}
      open={visible}
      onCancel={handleClose}
      onClose={handleClose}
      onOk={() => form.submit()}
    >
      <Form
        disabled={isLoading}
        form={form}
        layout="vertical"
        onFinish={handleCategories}
        size="large"
      >
        <Form.Item name={"parentsId"} label="Parent id">
          <TreeSelect
            treeData={valueTree}
            allowClear
            showSearch
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item
          name={"title"}
          rules={[
            {
              required: true,
              message: "Please enter a category",
            },
          ]}
          label="Title"
        >
          <Input type="text" allowClear />
        </Form.Item>

        <Form.Item name={"description"} label="Description">
          <Input.TextArea allowClear rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCategories;
