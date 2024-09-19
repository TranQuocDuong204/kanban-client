import { Typography, Form, Card, Input, Button, Checkbox, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./component/SocialLogin";
const { Title, Paragraph, Text } = Typography;
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAuth } from "@/redux/reducers/AuthReducers";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(true);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleLogin = async (value) => {
    setIsLoading(true)
    const { email, password } = value;
    try {
      const newdata = await axios.post(
        "http://localhost:8080/v1/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (newdata.data.data) {
        dispatch(addAuth(newdata.data.data));
      }
      console.log(newdata);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div>
      <Card
        style={{
          width: "400px",
        }}
      >
        <div className="text-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kanban-68886.appspot.com/o/Logokanban.png?alt=media&token=9d20b4f0-482d-4a32-b1a5-7b9624fc6d53"
            alt=""
            style={{
              width: "48px",
              height: "48px",
              margin: "auto",
              paddingBottom: "5px",
            }}
          />
          <Title level={2}>Login to your account</Title>
          <Paragraph>Welcome back! Please enter your detail</Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              allowClear
              maxLength={100}
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" maxLength={100} />
          </Form.Item>
          <div className="row flex justify-between">
            <div className="col">
              <Checkbox
                checked={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
              >
                Remember for 30days.
              </Checkbox>
            </div>
            <div className=" text-right text-sm">
              <Link to={"/forgot-password"} className="text-xs text-[#1677ff]">
                Forgot password
              </Link>
            </div>
          </div>
          <div className=" mt-4">
            <Button
              loading={isLoading}
              onClick={() => form.submit()}
              type="primary"
              style={{ width: "100%" }}
              size="large"
            >
              Login
            </Button>
          </div>
          <SocialLogin />
          <div className="mt-4 text-center">
            <Space>
              <Text>Dont have an account? </Text>
              <Link to="/sign-up">Sign Up</Link>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
