import { ConfigProvider } from "antd";
import "./App.css";
import Router from "@/routers/Router";
function App() {
  return (
    <div>
        
        <ConfigProvider theme={{ token: { colorPrimary: "#1570ef" } }}>
          <Router />
        </ConfigProvider>

    </div>
  );
}

export default App;
