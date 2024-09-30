import SiderComponent from "@/components/SiderComponent";
import { ManageStore, Order, Report, Supplier } from "@/screens";
import Inventory from "@/screens/inventory/Inventory";
import HomeScreens from "@/screens/HomeScreens";
import { Affix, Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "@/components/HeaderComponent";
import AddProduct from "@/screens/inventory/AddProduct";
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
              <Route path="/" element={<HomeScreens />}></Route>

              <Route path="/inventoty" element={<Inventory />}></Route>
              <Route
                path="/inventory/add-product"
                element={<AddProduct />}
              ></Route>

              <Route path="/report" element={<Report />}></Route>
              <Route path="/supplier" element={<Supplier />}></Route>
              <Route path="/orders" element={<Order />}></Route>
              <Route path="/manage-store" element={<ManageStore />}></Route>
            </Routes>
          </Content>
          {/* <FooterComponent /> */}
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
