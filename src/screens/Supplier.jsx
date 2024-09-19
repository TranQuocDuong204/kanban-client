import { Avatar, Space, Table, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { AddSupplier } from "@/modals";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
const { Title, Text } = Typography;

const Supplier = () => {
  const [visible, setVisible] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  ];
  return (
    <div className="p-3">
      <Table
        loading={isLoading}
        dataSource={suppliers}
        columns={columns}
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
                  onClose={() => setVisible(false)}
                  onAddNew={(value) => setSuppliers([...suppliers, value])}
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
