import { Dropdown, Input, Layout } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAuth } from "@/redux/reducers/AuthReducers";
import auth from "@/firebase/configFirebase";
import { signOut } from "firebase/auth";
const { Header } = Layout;
const styleHeader = {
  backgroundColor: "#fff",
  borderLeft: "1px solid #ddd",
};

const HeaderComponent = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: async () => {
         signOut(auth);
        dispatch(removeAuth({}));
        navigate("/");
      },
    },
  ];
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
            <Dropdown menu={{ items }}>
              <Avatar
                size="large"
                src={<img src={user.photoUrl} alt="avatar" />}
              />
            </Dropdown>
          </div>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;
