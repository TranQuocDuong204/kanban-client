/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import { Form, Modal, Button, Avatar } from "antd";
import { useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import uploadFile from "@/utils/uploadFile";
import replaceName from "@/utils/replaceName";
import { toast } from "react-toastify";
import axios from "axios";
import FormItem from "@/components/FormItem";
const { Paragraph } = Typography;
const AddSupplier = ({ visible, onClose, onAddNew, supplier }) => {
  const [isTasking, setIsTasking] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  const inputRef = useRef();

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);
    }
    setIsTasking(supplier?.isTasking === 1 ? true : false);
  }, [supplier]);

  useEffect(() => {
    getForm();
  }, []);

  const handleAddCategory = (value) => {
    setCategories((prev) => [...prev, value]);
  };

  const submitData = async (api, method, data) => {
    setIsLoading(true);
    try {
      const result = await axios({
        method,
        url: api,
        headers: { "Content-Type": "application/json" },
        data,
      });

      const newSupplier = await result.data.data;
      if (!supplier) onAddNew(newSupplier.getOneSupplier);
      handleClose();
      toastify(
        toast.success,
        supplier ? "Updated successfully" : "Created successfully"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addNewSupplier = async (value) => {
    setIsLoading(true);
    const apiUrl = supplier
      ? `http://localhost:8080/v1/supplier/update?id=${supplier._id}`
      : "http://localhost:8080/v1/supplier/create-new";
    const method = supplier ? "put" : "post";
    const data = {
      ...value,
      price: parseInt(value.price || 0),
      contact: parseInt(value.contact || 0),
      isTasking: isTasking ? 1 : 0,
      photoUrl: file ? await uploadFile(file) : supplier?.photoUrl,
      slug: replaceName(value.name),
      categories,
    };
    submitData(apiUrl, method, data);
  };

  const getForm = async () => {
    const api = "http://localhost:8080/v1/supplier/get-form";
    try {
      const resultGetform = await axios.get(api);
      const dataForm = await resultGetform.data;
      const { form } = dataForm;
      form && setFormData(form);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setFile(undefined);
    setCategories([]);
    onClose();
  };

  const toastify = (method, message) => {
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
        {formData && (
          <Form
            key={formData.key}
            onFinish={addNewSupplier}
            name={formData.title}
            labelCol={{
              span: formData.labelCol,
            }}
            wrapperCol={{
              span: formData.wrapperCol,
            }}
            size={formData.size}
            layout={formData.layout}
            form={form}
          >
            {formData.formItem.map((item) => (
              <FormItem
                key={item.key}
                item={item}
                handleAddCategory={handleAddCategory}
              />
            ))}

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
        )}
      </Modal>
    </div>
  );
};

export default AddSupplier;
