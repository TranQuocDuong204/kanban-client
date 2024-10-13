import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  FormOutlined,
  AreaChartOutlined,
  UserOutlined,
  InboxOutlined,
  ProfileOutlined,
  FileSyncOutlined
} from "@ant-design/icons";
import { Typography } from "antd";
const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
  const routes = [
    {
      key: "dashboard",
      label: <Link to={"/"}>Dasboard</Link>,
      icon: <HomeOutlined style={{ fontSize: 18 }} />,
    },
    {
      key: "inventoty",
      label: <Link to={"/inventoty"}>Inventory</Link>,
      icon: <FormOutlined style={{ fontSize: 18 }} />,
      children: [
        {
          key: "addNew",
          label: <Link to={"/inventory/add-product"}>Add Product</Link>
        }
      ]
    },
    {
      key: "category",
      label: <Link to={"/category"}>Category</Link>,
      icon: <FileSyncOutlined style={{ fontSize: 18 }}/>
    },
    {
      key: "report",
      label: <Link to={"/report"}>Report</Link>,
      icon: <AreaChartOutlined style={{ fontSize: 18 }} />,
    },
    {
      key: "supplier",
      label: <Link to={"/supplier"}>Supplier</Link>,
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
    {
      key: "orders",
      label: <Link to={"/orders"}>Orders</Link>,
      icon: <InboxOutlined style={{ fontSize: 18 }} />,
    },
    {
      key: "manage-store",
      label: <Link to={"/manage-store"}>Manage Store</Link>,
      icon: <ProfileOutlined style={{ fontSize: 18 }} />,
    },
  ];

  return (
    <Sider theme="light" style={{ height: "100vh" }}>
      <div className=" flex justify-start items-center gap-2 pl-7 mt-3 mb-4 cursor-pointer">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/kanban-68886.appspot.com/o/Logokanban.png?alt=media&token=9d20b4f0-482d-4a32-b1a5-7b9624fc6d53"
          alt=""
          style={{
            width: "46px",

            paddingBottom: "5px",
          }}
        />
        <Text
          level={2}
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#1570ef",
          }}
        >
          KANBAN
        </Text>
      </div>
      <div className=" flex flex-col justify-between gap-16">
        <Menu mode="inline" items={routes} theme="light" />
      </div>
    </Sider>
  );
};

export default SiderComponent;
