/* eslint-disable react/prop-types */
import { FormatCurrency } from "@/utils/formatNumber";
import { Card, Space, Typography } from "antd";

const { Title, Text } = Typography;
const formData = (item) => {
  return (
    <>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          justifyContent: "space-around"
        }}
      >
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          {FormatCurrency.VND.format(item.value)}
        </Title>
        <Text> {item.descriptions}</Text>
      </Space>
    </>
  );
};
const StaticComponent = ({ title, datas }) => {
  return (
    <Card className="mt-2 mb-4">
      <Title style={{ color: "#4b5563", fontWeight: "500", fontSize: 19 }}>
        {title}
      </Title>
      <div className="flex justify-between items-center">
        {datas?.map((item, index) => {
          return (
            <div
              className={`px-3 pr-10 m-auto ${
                index < datas.length - 1
                  ? " border-solid border-r-2 border-gray-300"
                  : " "
              }`}
              key={item.key}
            >
              <div className=" text-center text-2xl">{item.icon}</div>
              {formData(item)}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default StaticComponent;
