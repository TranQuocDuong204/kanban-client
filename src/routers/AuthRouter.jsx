import Login from "@/screens/auth/Login";
import SignUp from "@/screens/auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Typography } from "antd";
const { Title } = Typography;
const AuthRouter = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 flex-wrap max-md:grid-cols-1 max-md:w-full">
        <div className="col w-full m-auto p-4 max-md:hidden">
          <div className="flex flex-col items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/kanban-68886.appspot.com/o/Logokanban.png?alt=media&token=9d20b4f0-482d-4a32-b1a5-7b9624fc6d53"
              alt=""
              style={{
                width: "200px",
                margin: "auto",
                paddingBottom: "5px",
              }}
            />
            <Title
              style={{
                color: "#009ED8",
              }}
            >
              KANBAN
            </Title>
          </div>
        </div>
        <div className="flex items-center justify-center h-[100vh] max-w-[500px] max-md:m-auto">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
