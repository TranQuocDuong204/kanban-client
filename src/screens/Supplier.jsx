import { AddSupplier } from "@/modals";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TableComponent from "@/components/TableComponent";

const Supplier = () => {
  const [visible, setVisible] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState();
  const [pageInfo, setPageInfo] = useState({ page: 1, pageSize: 10 });
  const [totalPage, setTotalPage] = useState(10);
  const [forms, setForms] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getSuppliers();
  }, [pageInfo]);

  const getData = async () => {
    setIsLoading(true);
    try {
      await getForm();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuppliers = async () => {
    setIsLoading(true);
    const api = `http://localhost:8080/v1/supplier?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`;
    try {
      const { data } = await axios.get(api);
      const { result, total } = data;
      const items = result.map((item, index) => ({
        index: index + 1 + (pageInfo.page - 1) * pageInfo.pageSize,
        ...item,
      }));
      setTotalPage(total);
      setSuppliers(items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeSupplier = async (id) => {
    const apiUp = "http://localhost:8080/v1/supplier/remove-soft";
    try {
      await axios.put(
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getForm = async () => {
    const api = "http://localhost:8080/v1/supplier/get-form";
    const res = await axios.get(api);
    if (res.data) setForms(res.data.form);
  };

  // const columns = [
  //   {
  //     key: "#",
  //     title: "#",
  //     dataIndex: "_id",
  //     render: (_, __, index) =>
  //       index + 1 + (pageInfo.page - 1) * pageInfo.pageSize,
  //     align: "center",
  //   },
  //   {
  //     key: "name",
  //     title: "Supplier name",
  //     dataIndex: "name",
  //   },
  //   {
  //     key: "avatar",
  //     title: "Avatar",
  //     dataIndex: "photoUrl",
  //     render: (photoUrl) => <Avatar src={photoUrl} />,
  //   },
  //   {
  //     key: "product",
  //     title: "Product",
  //     dataIndex: "product",
  //   },
  //   {
  //     key: "contact",
  //     title: "Contact",
  //     dataIndex: "contact",
  //   },
  //   {
  //     key: "email",
  //     title: "Email",
  //     dataIndex: "email",
  //     render: (email) => email ?? "email@gmail.com",
  //   },
  //   {
  //     key: "isTasking",
  //     title: "Type",
  //     dataIndex: "isTasking",
  //     render: (isTasking) => (
  //       <Text type={isTasking ? "success" : "danger"}>
  //         {isTasking ? "Return Tasking" : "Not return tasking"}
  //       </Text>
  //     ),
  //   },
  //   {
  //     key: "on",
  //     dataIndex: "active",
  //     title: "On the way",
  //     render: (active) => active ?? "--",
  //   },
  //   {
  //     key: "buttonContainer",
  //     dataIndex: "",
  //     title: "Action",
  //     render: (item) => (
  //       <Space>
  //         <Button
  //           onClick={() => {
  //             setVisible(true);
  //             setSupplierSelected(item);
  //           }}
  //           type="text"
  //           icon={<EditFilled />}
  //         />
  //         <Button
  //           onClick={() => {
  //             confirm({
  //               title: "Do you want to delete these items?",
  //               icon: <ExclamationCircleFilled />,
  //               onOk() {
  //                 removeSupplier(item._id);
  //               },
  //               onCancel() {
  //                 console.log("Cancel");
  //               },
  //             });
  //           }}
  //           type="text"
  //           icon={<DeleteOutlined />}
  //         />
  //       </Space>
  //     ),
  //     fixed: "right",
  //     align: "right",
  //   },
  // ];

  return (
    <div className="p-3">
      <TableComponent
        isLoading={isLoading}
        forms={forms}
        totalPage={totalPage}
        records={suppliers}
        setVisible={setVisible}
        onPageChange={setPageInfo}
        removeSupplier={(value) => {
          removeSupplier(value);
        }}
        setSupplierSelected={setSupplierSelected}
        api={"http://localhost:8080/v1/supplier"}
      />
      <AddSupplier
        visible={visible}
        onClose={() => {
          supplierSelected && getSuppliers();
          setSupplierSelected(undefined);
          setVisible(false);
        }}
        onAddNew={(value) => {
          setSuppliers((prev) => [...prev, value]);
        }}
        supplier={supplierSelected}
      />
    </div>
  );
};

export default Supplier;
