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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(10);
  const getSuppliers = async () => {
    setIsLoading(true);
    const api = `http://localhost:8080/v1/supplier?page=${page}&pageSize=${pageSize}`;
    try {
      const results = await axios.get(api);
      const data = await results.data;
      const { result, total } = data;
      setTotalPage(total);
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

  // const handleDemoData = () => {
  //   mockData.forEach(async (item) => {
  //     const data = {
  //       name: item.title,
  //       product: "Video reactjs",
  //       email: "test@example.com",
  //       active: 123,
  //       categories: ["data fake"],
  //       price: Math.floor(Math.random() * 1000000),
  //       contact: "12345678",
  //       isTasking: 0,
  //       slug: replaceName(item.title),
  //     };
  //     const api = "http://localhost:8080/v1/supplier/create-new";
  //     try {
  //       const result = await axios.post(api, data, {
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       console.log("add mock data success");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  useEffect(() => {
    getSuppliers();
  }, [pageSize, page]);
  const columns = [
    {
      key: "#",
      title: "#",
      dataIndex: "_id",
      render: (_, __, index) => index + 1 + (page - 1) * pageSize,
      align: "center",
    },
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
      render: (email) => email ?? "email@gmail.com",
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
      dataIndex: "active",
      title: "On the way",
      render: (active) => active ?? "--",
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
      {/* <Button onClick={handleDemoData}>Addmockdata</Button> */}
      <Table
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
          total: totalPage,
          onChange: (pages) => {
            setPage(pages);
          },
        }}
        scroll={{
          y: "calc(100vh - 280px)",
        }}
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
