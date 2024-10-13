import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Card,
  Form,
  Input,
  Space,
  Button,
  Typography,
  Select,
  Divider,
  Spin,
} from "antd";
import axios from "axios";
import replaceName from "@/utils/replaceName";
import uploadFile from "@/utils/uploadFile";
import { ModalCategories } from "@/modals";

const { Title } = Typography;
const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [supplierOption, setSupplierOption] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState([]);

  const editorRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsLoading(true);
    try {
      await getSupplier();
      getCategory();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (value) => {
    const content = editorRef.current.getContent();
    console.log(content);
  };

  const getSupplier = async () => {
    const api = "http://localhost:8080/v1/supplier/";
    const res = await axios.get(api);
    const data = res.data;

    const option = data.result.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    setSupplierOption(option);
  };

  const getTreeValues = (data, key) => {
    const items = [];
    data.forEach((item) => {
      if (item[`${key}`]) {
        const index = items.findIndex((e) => e.value === item[`${key}`]);
        const children = data.filter((e) => e[key] === item[`${key}`]);

        if (index !== -1) {
          items[index].children = children.map((value) => ({
            title: value.title,
            value: value._id,
          }));
        }
      } else {
        items.push({ title: item.title, value: item._id });
      }
    });
    return items;
  };
  const getCategory = async () => {
    const api = "http://localhost:8080/v1/product/get-categories";

    try {
      const result = await axios.get(api);
      const data = await result.data;
      const { category } = data;
      category && getTreeValues(category, "parentsId");
      const treeData = getTreeValues(category, "parentsId");
      setCategory(treeData);
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    <Spin />
  ) : (
    <div>
      <div className="container p-3">
        <Title>Add product</Title>
        <Form
          size="large"
          form={form}
          onFinish={handleAddProduct}
          layout="vertical"
        >
          <div className="flex gap-2">
            <div className="basis-1/2">
              <Form.Item
                name={"title"}
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter a title",
                  },
                ]}
              >
                <Input allowClear maxLength={100} showCount />
              </Form.Item>

              <Form.Item
                name={"description"}
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter a description",
                  },
                ]}
              >
                <Input.TextArea allowClear maxLength={1000} showCount />
              </Form.Item>

              <Editor
                disabled={isLoading}
                apiKey="lncq1xgel86zb2l5zaxudyeajwdgkwqyhboz0puztjethm43"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={content !== "" ? content : ""}
                init={{
                  plugins: [
                    // Core editing features
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "image",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Oct 13, 2024:
                    "checklist",
                    "mediaembed",
                    "casechange",
                    "export",
                    "formatpainter",
                    "pageembed",
                    "a11ychecker",
                    "tinymcespellchecker",
                    "permanentpen",
                    "powerpaste",
                    "advtable",
                    "advcode",
                    "editimage",
                    "advtemplate",
                    "ai",
                    "mentions",
                    "tinycomments",
                    "tableofcontents",
                    "footnotes",
                    "mergetags",
                    "autocorrect",
                    "typography",
                    "inlinecss",
                    "markdown",
                  ],
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                }}
              />
            </div>
            <div className="basis-1/2">
              <Card>
                <Space>
                  <Button size="middle">Cancel</Button>
                  <Button
                    type="primary"
                    size="middle"
                    onClick={() => form.submit()}
                  >
                    Submit
                  </Button>
                </Space>
              </Card>

              <Card title="Categories" className="mt-3">
                <Form.Item name={"categories"}>
                  <Select
                    mode="multiple"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider className="" />
                        <Button
                          onClick={() => setIsVisible(true)}
                          type="link"
                          style={{
                            padding: "0 16px",
                          }}
                        >
                          Add new
                        </Button>
                      </>
                    )}
                  />
                </Form.Item>
              </Card>

              <Card title="Supplier" className="mt-3">
                <Form.Item
                  name={"supplier"}
                  rules={[
                    {
                      required: true,
                      message: "Please select a supplier",
                    },
                  ]}
                >
                  <Select
                    filterOption={(input, option) =>
                      replaceName(option?.label).includes(replaceName(input))
                    }
                    showSearch={true}
                    options={supplierOption}
                  />
                </Form.Item>
              </Card>

              <Card className="mt-3">
                <Input
                  className="mb-2"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                />
                <Input
                  type="file"
                  onChange={async (file) => {
                    const fileImg = file.target.files[0];
                    if (fileImg) {
                      const downLoadUrl = await uploadFile(fileImg);
                      downLoadUrl && setFileUrl(downLoadUrl);
                    }
                  }}
                />
              </Card>
            </div>
          </div>
        </Form>
        <ModalCategories
          visible={isVisible}
          onAddNew={async (value) => {
            await getCategory();
          }}
          onClose={() => {
            setIsVisible(false);
          }}
          valueTree={category}
        />
      </div>
    </div>
  );
};

export default AddProduct;
