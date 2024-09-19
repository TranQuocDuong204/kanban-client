import { removeAuth } from "@/redux/reducers/AuthReducers";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomeScreens = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(removeAuth({}));
    navigate("/");
  };
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

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomeScreens;
