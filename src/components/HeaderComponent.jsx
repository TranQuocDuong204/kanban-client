import { Input, Layout } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
const { Header } = Layout;
const styleHeader = {
  backgroundColor: "#fff",
  borderLeft: "1px solid #ddd"
};
const HeaderComponent = () => {
  return (
    <Header style={styleHeader}>
      <div className="flex justify-between">
        <div>
          {" "}
          <Input
            placeholder="search"
            style={{ borderRadius: 10 }}
            size="large"
            prefix={<SearchOutlined />}
          />
        </div>

        <Space size={16} wrap>
          <div className="flex items-center gap-2">
            {" "}
            <BellOutlined style={{ fontSize: 20 }} />
            <Avatar
              size="large"
              src={
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.mmdMlUuwQq2nwN3TsHs3BwHaFR&pid=Api&P=0&h=180"
                  alt="avatar"
                />
              }
            />
          </div>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;
