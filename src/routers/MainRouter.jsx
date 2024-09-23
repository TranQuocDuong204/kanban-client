import SiderComponent from "@/components/SiderComponent";
import { Inventory, ManageStore, Order, Report, Supplier } from "@/screens";
import HomeScreens from "@/screens/HomeScreens";
import { Affix, Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "@/components/HeaderComponent";
// import FooterComponent from "@/components/FooterComponent";
const { Content } = Layout;
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Affix offsetTop={0}>
          <SiderComponent />
        </Affix>

        <Layout>
          <Affix>
            <HeaderComponent />
          </Affix>

          <Content>
            <Routes>
              <Route path="/inventoty" element={<Inventory />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path="/supplier" element={<Supplier />}></Route>
              <Route path="/orders" element={<Order />}></Route>
              <Route path="/manage-store" element={<ManageStore />}></Route>
            </Routes>
          </Content>
          {/* <FooterComponent /> */}
          <HomeScreens />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
