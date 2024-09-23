/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Select, Button, Avatar } from "antd";
import { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import uploadFile from "@/utils/uploadFile";
import replaceName from "@/utils/replaceName";
import { toast } from "react-toastify";
import axios from "axios";
const { Paragraph } = Typography;
const AddSupplier = ({ visible, onClose, onAddNew, supplier }) => {
  const [isTasking, setIsTasking] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const inputRef = useRef();

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleAddCategory = (value) => {
    setCategories((prev) => [...prev, value]);
  };
  const addNewSupplier = async (value) => {
    setIsLoading(true);
    const api = "http://localhost:8080/v1/supplier/create-new";
    const apiUp = "http://localhost:8080/v1/supplier/update";
    const data = {};
    for (const i in value) {
      data[i] = value[i] ?? "";
    }

    data.price = value.price ? parseInt(value.price) : 0;
    data.contact = value.contact ? parseInt(value.contact) : 0;
    data.isTasking = isTasking ? 1 : 0;

    if (file) {
      data.photoUrl = await uploadFile(file);
    }
    data.slug = replaceName(data.name);
    data.categories = categories;
    try {
      if (supplier) {
        const result = await axios.put(`${apiUp}?id=${supplier?._id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        // eslint-disable-next-line no-unused-vars
        const dataUp = await result.data.data;
        handleClose();
        toast.success("🦄Update success!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const result = await axios.post(api, data, {
          headers: { "Content-Type": "application/json" },
        });
        const newData = await result.data.data.getOneSupplier;
        onAddNew(newData);
        handleClose();
        toast.success("🦄 Create new success!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setFile(undefined);
    setCategories([]);
    onClose();
  };

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);
    }
    setIsTasking(supplier?.isTasking === 1 ? true : false);
  }, [supplier]);

  return (
    <div>
      <Modal
        loading={isLoading}
        open={visible}
        onClose={handleClose}
        onCancel={handleClose}
        onOk={() => form.submit()}
        title={supplier ? "Update Supplier" : "Add Supplier"}
        okText={supplier ? "Update Supplier" : "Add Supplier"}
        cancelText="Discard"
      >
        <div className=" hidden">
          <input
            ref={inputRef}
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <label htmlFor="inpFile" className=" flex justify-center pb-2">
          {file ? (
            <Avatar size={60} src={URL.createObjectURL(file)} />
          ) : supplier ? (
            <Avatar size={60} src={supplier?.photoUrl} />
          ) : (
            <Avatar
              size={60}
              style={{
                backgroundColor: "white",
                border: "1px dashed gray",
              }}
            >
              <UserOutlined
                size={100}
                style={{
                  color: "black",
                }}
              ></UserOutlined>
            </Avatar>
          )}

          <div className="ml-3">
            <Paragraph style={{ margin: 0 }}>Drag image here</Paragraph>
            <Paragraph style={{ margin: 0 }}>Or</Paragraph>
            <Button
              onClick={() => inputRef.current.click()}
              type="link"
              style={{
                padding: 0,
                height: 0,
              }}
            >
              Browse image
            </Button>
          </div>
        </label>

        <Form
          onFinish={addNewSupplier}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          size="middle"
          layout="horizontal"
          form={form}
        >
          <Form.Item
            label="Supplier Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your supplier name!",
              },
            ]}
          >
            <Input placeholder="Enter supplier name" allowClear />
          </Form.Item>
          <Form.Item
            label="Supplier Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your supplier email!",
              },
            ]}
          >
            <Input placeholder="Enter supplier email" allowClear />
          </Form.Item>

          <Form.Item
            label="Active"
            name="active"
            rules={[
              {
                required: true,
                message: "Please input your supplier active!",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter supplier active"
              allowClear
            />
          </Form.Item>

          <Form.Item
            label="Product"
            name="product"
            rules={[
              {
                required: true,
                message: "Please input your product!",
              },
            ]}
          >
            <Input placeholder="Enter product" allowClear />
          </Form.Item>

          <Form.Item
            label="Categories"
            name="categories"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input your categories!",
            //   },
            // ]}
          >
            <Select
              defaultValue=""
              style={{
                width: "100%",
              }}
              options={options}
              placeholder="Enter Categories"
              onChange={handleAddCategory}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Buy Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your buy price!",
              },
            ]}
          >
            <Input placeholder="Enter buy price" type="number" allowClear />
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[
              {
                required: true,
                message: "Please input your contact number!",
              },
            ]}
          >
            <Input placeholder="Enter buy price" type="number" allowClear />
          </Form.Item>

          <Form.Item label="Type">
            <div className=" flex gap-2 flex-col w-[45%]">
              {" "}
              <Button
                onClick={() => setIsTasking(false)}
                type={!isTasking ? "primary" : "default"}
              >
                Not talking return
              </Button>
              <Button
                onClick={() => setIsTasking(true)}
                type={isTasking ? "primary" : "default"}
              >
                Talking return
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddSupplier;
