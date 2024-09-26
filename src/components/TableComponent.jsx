/* eslint-disable react/prop-types */
import { Space, Table, Typography, Button, Modal } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  EditFilled,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { ModalExportData } from "@/modals";
const { Title } = Typography;
const { confirm } = Modal;
const TableComponent = ({
  forms,
  isLoading,
  totalPage,
  records,
  setVisible,
  onPageChange,
  removeSupplier,
  setSupplierSelected,
  api,
}) => {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 10,
  });
  const [columns, setColumns] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  useEffect(() => {
    onPageChange(pageInfo);
  }, [pageInfo]);

  useEffect(() => {
    if (forms?.formItem?.length > 0) {
      const item = forms.formItem.map((i) => ({
        key: i.key,
        dataIndex: i.value,
        title: i.label,
      }));

      item.unshift({
        key: "index",
        dataIndex: "index",
        align: "center",
        title: "#",
      });
      item.push({
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
            />
            <Button
              onClick={() => {
                confirm({
                  title: "Do you want to delete these items?",
                  icon: <ExclamationCircleFilled />,
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
            />
          </Space>
        ),
        fixed: "right",
        align: "right",
      });
      setColumns(item);
    }
  }, [forms]);

  return (
    <Table
      api={api}
      rowKey="_id"
      pagination={{
        showSizeChanger: true,
        onShowSizeChange: (current, size) => {
          setPageInfo((prev) => ({ ...prev, pageSize: size }));
        },
        total: totalPage,
        onChange: (page) => {
          setPageInfo((prev) => ({ ...prev, page }));
        },
        showQuickJumper: true,
      }}
      bordered
      scroll={{ y: "calc(100vh - 280px)" }}
      loading={isLoading}
      dataSource={records}
      columns={columns}
      title={() => (
        <div className="flex items-center justify-between">
          <div className="text-slate-950">
            <Title level={5}>{forms?.title}</Title>
          </div>
          <div className="text-right">
            <Space>
              <Button type="primary" onClick={() => setVisible(true)}>
                Add product
              </Button>
              <Button icon={<FilterOutlined />}>Filter</Button>
              <Button onClick={() => setIsVisibleModal(true)}>
                Export Excel
              </Button>
            </Space>
            <ModalExportData
              visible={isVisibleModal}
              onClose={() => setIsVisibleModal(false)}
              api={api}
              name={api}
            />
          </div>
        </div>
      )}
    />
  );
};

export default TableComponent;
