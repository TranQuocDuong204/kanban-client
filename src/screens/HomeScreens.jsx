import StaticComponent from "@/components/StaticComponent";
import {
  MoneyCollectOutlined,
  StockOutlined,
  FundOutlined,
  BankOutlined,
} from "@ant-design/icons";
const HomeScreens = () => {
  // const verifyToken = async () => {
  //   // Lấy chuỗi JSON từ localStorage
  //   const tokenString = localStorage.getItem("auth");

  //   // Nếu không có token, thông báo lỗi
  //   if (!tokenString) {
  //     console.log("No token found in localStorage");
  //     return;
  //   }

  //   try {
  //     const tokenObject = JSON.parse(tokenString);

  //     const accessToken = tokenObject.token;

  //     if (!accessToken) {
  //       console.log("Token not found in the parsed object");
  //       return;
  //     }

  //     const res = await axios.get("http://localhost:8080/v1/stored/products", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     console.log("----------------------",res);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  // const refreshToken = async () => {
  //   const tokenString = localStorage.getItem("auth");
  //   try {
  //     const tokenObject = JSON.parse(tokenString);
  //     const id = tokenObject._id;
  //     const result = await axios.get(
  //       `http://localhost:8080/v1/auth/refresh-token?id=${id}`
  //     );
  //     console.log(result);
  //     if (result.data.data) return dispatch(addAuth(result.data.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saleData = [
    {
      key: "sale",
      descriptions: "Sales",
      color: "",
      icon: <MoneyCollectOutlined />,
      value: Math.floor(Math.random() * 10000000),
      valueType: "currency",
    },
    {
      key: "revenue",
      descriptions: "Revenue",
      color: "",
      icon: <StockOutlined />,
      value: Math.floor(Math.random() * 10000000),
      valueType: "currency",
    },
    {
      key: "profit",
      descriptions: "Profit",
      color: "",
      icon: <FundOutlined />,
      value: Math.floor(Math.random() * 10000000),
      valueType: "currency",
    },
    {
      key: "cost",
      descriptions: "Cost",
      color: "",
      icon: <BankOutlined />,
      value: Math.floor(Math.random() * 10000000),
      valueType: "currency",
    },
  ];

  const inventory = [
    {
      key: "sale",
      descriptions: "Sales",
      color: "",
      icon: <MoneyCollectOutlined />,
      value: Math.floor(Math.random() * 10000000),
      valueType: "currency",
    },
    {
      key: "revenue",
      descriptions: "Revenue",
      color: "",
      icon: <StockOutlined />,
      value: Math.floor(Math.random() * 10000000),
      valueType: "currency",
    },
  ];
  return (
    <div>
      <div className="flex flex-row p-2 gap-1">
        <div className="basis-2/3">
          <StaticComponent title="Sale Overview" datas={saleData}>
            left
          </StaticComponent>
        </div>
        <div className="basis-1/3">
          <StaticComponent title="Inventory Summary" datas={inventory}>
            Inventory Summary
          </StaticComponent>
        </div>
      </div>
    </div>
  );
};

export default HomeScreens;
