import { Avatar, Space, Table, Typography, Modal } from "antd";
import {
  EditFilled,
  FilterOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { AddSupplier } from "@/modals";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const { Title, Text } = Typography;
const { confirm } = Modal;
const Supplier = () => {
  const [visible, setVisible] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState();

  const getSuppliers = async () => {
    setIsLoading(true);
    const api = "http://localhost:8080/v1/supplier/";
    try {
      const results = await axios.get(api);
      const data = await results.data;
      const { result } = data;

      if (result) return setSuppliers(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSupplier = async (id) => {
    const apiUp = "http://localhost:8080/v1/supplier/remove-soft";
    try {
      // soft delete
      // eslint-disable-next-line no-unused-vars
      const result = await axios.put(
        `${apiUp}?id=${id}`,
        { isDeleted: true },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      getSuppliers();
      toast.success("🦄Delete success!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);
  const columns = [
    {
      key: "name",
      title: "Supplier name",
      dataIndex: "name",
    },
    {
      key: "avatar",
      title: "Avatar",
      dataIndex: "photoUrl",
      render: (photoUrl) => <Avatar src={photoUrl}></Avatar>,
    },
    {
      key: "product",
      title: "Product",
      dataIndex: "product",
    },

    {
      key: "contact",
      title: "Contact",
      dataIndex: "contact",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "isTasking",
      title: "Type",
      dataIndex: "isTasking",
      render: (isTasking) => (
        <Text type={isTasking ? "success" : "danger"}>
          {isTasking ? "Return Tasking" : "Not return tasking"}
        </Text>
      ),
    },
    {
      key: "on",
      dataIndex: "",
      title: "On the way",
    },
    {
      key: "buttonContainer",
      dataIndex: "",
      title: "Action",
      render: (item) => (
        <Space>
          <Button
            onClick={() => {
              setVisible(true);
              setSupplierSelected(item);
            }}
            type="text"
            icon={<EditFilled />}
          ></Button>
          <Button
            onClick={() => {
              confirm({
                title: "Do you want to delete these items?",
                icon: <ExclamationCircleFilled />,
                content: "Some descriptions",
                onOk() {
                  removeSupplier(item._id);
                },
                onCancel() {
                  console.log("Cancel");
                },
              });
            }}
            type="text"
            icon={<DeleteOutlined />}
          ></Button>
        </Space>
      ),
      fixed: "right",
      align: "right",
    },
  ];
  return (
    <div className="p-3">
      <Table
        loading={isLoading}
        dataSource={suppliers}
        columns={columns}
        rowKey={(record) => record._id}
        title={() => (
          <div className="flex items-center justify-between">
            <div className="text-slate-950">
              <Title level={5}>Supplier</Title>
            </div>
            <div className="text-right">
              <Space>
                <Button type="primary" onClick={() => setVisible(true)}>
                  Add product
                </Button>
                <Button icon={<FilterOutlined />} iconPosition="start">
                  Filter
                </Button>
                <Button>Download all</Button>
                <AddSupplier
                  visible={visible}
                  onClose={() => {
                    supplierSelected && getSuppliers();
                    setSupplierSelected(undefined);
                    setVisible(false);
                  }}
                  onAddNew={(value) => {
                    setSuppliers([...suppliers, value]);
                  }}
                  supplier={supplierSelected}
                />
              </Space>
            </div>
          </div>
        )}
      ></Table>
    </div>
  );
};

export default Supplier;
