import { useEffect } from "react";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "@/redux/reducers/AuthReducers";

const Router = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    const res = localStorage.getItem("auth");
    const tokenObject = JSON.parse(res);
    res && dispatch(addAuth(tokenObject));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Router;
