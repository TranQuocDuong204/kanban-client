import { Link } from "react-router-dom";
import { Typography, Form, Card, Input, Button, Space } from "antd";
import { useState } from "react";
import SocialLogin from "./component/SocialLogin";
import axios from "axios";
const { Title, Paragraph, Text } = Typography;
import { useDispatch } from "react-redux";
import { addAuth } from "@/redux/reducers/AuthReducers";
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const handleLogin = async (value) => {
    const { name, email, password } = value;
    setIsLoading(true);
    try {
      const newdata = await axios.post(
        "http://localhost:8080/v1/auth/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(newdata.data.data) {
        dispatch(addAuth(newdata.data.data))
      }
    } catch (e) {
      console.log(e);
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

              margin: "auto",
              paddingBottom: "5px",
            }}
          />
          <Title level={2}>Create an account</Title>
          <Paragraph>Start your 30days free trial</Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter your name"
              allowClear
              maxLength={100}
              type="name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter your email"
              allowClear
              minLength={3}
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
              () => ({
                validator(_, value) {
                  if (value.length < 6) {
                    return Promise.reject(
                      new Error("Password must contain at least 6 characters")
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" maxLength={100} />
          </Form.Item>
          <div className=" mt-4">
            <Button
              loading={isLoading}
              onClick={() => form.submit()}
              type="primary"
              style={{ width: "100%" }}
              size="large"
            >
              Get Started
            </Button>
          </div>
          <SocialLogin />
          <div className="mt-4 text-center">
            <Space>
              <Text>Already have an account? </Text>
              <Link to="/">Login</Link>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
