import { Space, Table, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { AddSupplier } from "@/modals";
import { Button } from "antd";
import { useState } from "react";
const { Title } = Typography;

const Supplier = () => {
  const [visible, setVisible] = useState(false);
  const columns = [];
  return (
    <div className="p-3">
      <Table
        dataSource={[]}
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
