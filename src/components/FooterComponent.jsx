import { Layout } from "antd";

const { Footer } = Layout;
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};
const FooterComponent = () => {
  return <Footer style={footerStyle}>Footer</Footer>;
};

export default FooterComponent;
