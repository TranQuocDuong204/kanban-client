/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  List,
  Modal,
  Space,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { handleExportExcel } from "@/utils/handleExportExcel";
import { DateTime } from "@/utils/dateTime";

const { RangePicker } = DatePicker;
const ModalExportData = ({ visible, onClose, api, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [forms, setForms] = useState();
  const [checkedValue, setCheckedValue] = useState([]);
  const [timeSelected, setTimeSelected] = useState(false);
  const [dates, setDates] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (visible) {
      getForm();
    }
  }, [visible, api]);

  const handleExport = async () => {
    let url = "";
    if (timeSelected && dates.start && dates.end) {
      if (new Date(dates.start).getTime() > new Date(dates.end).getTime()) {
        console.log("error");
      } else {
        url = `${api}/get-export-data?start=${dates.start}&end=${dates.end}`;
      }
    } else {
      url = `${api}/get-export-data`;
    }

    const data = checkedValue;
    if (data.length > 0) {
      setIsLoading(true);
      try {
        const res = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        });
        res.data.data &&
          (await handleExportExcel(res.data.data, "supplier.xlsx"));
        setCheckedValue([]);
        setTimeSelected(false);
        onClose();
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("please select 1 key of value");
    }
  };
  const getForm = async () => {
    const url = `${api}/get-form`;
    setIsGetting(true);
    try {
      const result = await axios.get(url);
      result.data.form && setForms(result.data.form);
    } catch (e) {
      console.log(e);
    } finally {
      setIsGetting(false);
    }
  };
  const handleCheckedValue = (value) => {
    setCheckedValue((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Modal
      loading={isGetting}
      open={visible}
      onCancel={onClose}
      onClose={onClose}
      onOk={handleExport}
      okButtonProps={{
        loading: isLoading,
      }}
      title="Export to excels"
    >
      <div>
        <Checkbox
          checked={timeSelected}
          onChange={(e) => setTimeSelected(e.target.checked)}
        >
          Date ranger
        </Checkbox>
        {timeSelected && (
          <Space>
            <RangePicker
              onChange={(value) =>
                setDates(
                  value && value[0] && value[1]
                    ? {
                        start: `${DateTime.CalendarDate(value[0])}00:00:00`,
                        end: `${DateTime.CalendarDate(value[1])}00:00:00`,
                      }
                    : {
                        start: "",
                        end: "",
                      }
                )
              }
            />
            <Button type="link" onClick={handleExport}>
              Export all
            </Button>
          </Space>
        )}
      </div>
      <Divider />
      <div>
        <List
          dataSource={forms?.formItem}
          renderItem={(item) => (
            <List.Item key={item.key}>
              <Checkbox
                checked={checkedValue.includes(item.value)}
                onChange={(val) => handleCheckedValue(item.value)}
              >
                {item.label}
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default ModalExportData;
