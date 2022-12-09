import { useEffect, useState } from "react";
import { Avatar, Input, Select, Table, Typography } from "antd";
// import { Link } from "react-router-dom";
import Popovercom from "./Popovercom";
import { Switch, Space, Button, Badge } from "antd";
// import "@shopify/polaris/build/esm/styles.css";
import { Stack } from "@shopify/polaris";
import { Link } from "react-router-dom";
// import { Avatar, Badge, Switch,} from 'antd';

function FillteringTable() {
  const [searchedText, setSearchedText] = useState("");
  const [products, setProducts] = useState([]);
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const [show, setShow] = useState(true);
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4NzMxOTc2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY2NDQ4YzQxY2M2MjdhMzBjNmIyMiJ9.o0XvqNpmiAaXQgWC8LgaBrhx6Kjc6rwm0vi-aG-ezZHp3Ph1jcaBqKQq1u9PQSwiCjU6US8xiqMbN_l5JYEwmPOWWQF43Fdt8V2i_dYp2L4mj51rKn9pH7xCloNPAiqCAp7IlfdwXU2NL5cYlb8p4Ve9axRKuPaZ6FpEL49fP8zjlT5gsfR7lr5UD_iKmBH-F-R4ORgQC3vR0CfsW42XXebfTiKf5fh2qBAIrjtSPJyO0jgNxLCTppnT3ruBf3yDL7EcAOFXzUZn_G8NsOSaZp5AvMWIMDkpmBO0VvgkIqSuYOlICki6riprysfwhuwU1XAtpNwI6N571dfUTPhXsw`;
  function test(value: any) {
    let temp = 0;
    value.forEach((item: any) => {
      if (item.quantity) {
        temp += item.quantity;
      }
    });
    return temp;
  }
  function varient(value: any) {
    console.log("Varient",value);
    let temp = "";
    value.forEach((item: any) => {
      if (item) {
        temp += item+" ";
      }
    });
    return temp;
  }
  useEffect(() => {
    const payload: any = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 640,
        "Ced-Target-Name": "amazon",
        count: 50,
        productOnly: true,
        target_marketplace: "eyjtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQi0m51bGx9",
      },
    };
    fetch(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts",
      payload
    )
      .then((response) => response.json())
      .then((allData) => {
        let newData = allData?.data?.rows?.map((item: any) => {
          //   console.log(item, "item");
          return {
            img: item["main_image"],
            key: item._id["$oid"],
            title: (
              <Link to={`/listing/${item["container_id"]}`}>
                {item["title"]}
              </Link>
            ),
            product:
              item["source_product_id"] === item.items[0]["source_product_id"]
                ? {
                    sku: item.items[0].sku,
                    price: item.items[0].price || "N/A",
                    barcode: item.items[0].barcode || "N/A",
                    quantity: item.items[0].quantity || "N/A",
                  }
                : "NA",
            inventory: test(item.items),
            variant_attributes: varient(item.variant_attributes),
          };
        });
        setProducts(newData);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("products", products);
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between",marginTop:"10px"}}>
        <div style={{ display: "flex" }}>
          <Input.Search
            placeholder="Serch Here...."
            style={{ marginBottom: 8, width: 300 }}
            onSearch={(value) => {
              setSearchedText(value);
            }}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
          <Select
            defaultValue="More Filter"
            style={{ width: 110 }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
            ]}
          />
        </div>
        <div>
          <Button style={{marginRight:"8px"}}>Sync Status</Button>
          <Button style={{marginRight:"8px"}}>Amazone Account</Button>
          <Button>Bulk Update</Button>
        </div>
      </div>
      <Table style={{marginTop:"5px"}}
        columns={[
          {
            align: "left",
            dataIndex: "img",
            key: "img",
            title: "Image",
            render: (_: any, record: any) => {
              return (
                <div style={{ display: "flex" }}>
                  <Avatar src={record.img} shape="square" size="large" />
                </div>
              );
            },
            width: 100,
          },
          {
            align: "left",
            title: "Title",
            dataIndex: "title",
            filteredValue: [searchedText],
            onFilter: (value: any, record: any) => {
              return String(record.title)
                .toLowerCase()
                .includes(value.toLowerCase());
            },
            key: "age",
            render: (_, record) => {
              return <Typography>{record.title}</Typography>;
            },
          },
          {
            align: "left",
            title: "product",
            dataIndex: "address",
            key: "address",
            render: (_, record) => {
              return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography style={{ color: "black", fontFamily: "bold" }}>
                    SKU:
                    <Badge
                      count={record.product.sku}
                      overflowCount={record.product.sku}
                      style={{ backgroundColor: "#C0C0C0", color: "black" }}
                    />
                  </Typography>
                  <Typography style={{ color: "black", fontFamily: "bold" }}>
                    Price:
                    <Badge
                      count={record.product.price}
                      style={{ backgroundColor: "#C0C0C0", color: "black" }}
                    />
                  </Typography>
                  <Typography style={{ color: "black", fontFamily: "bold" }}>
                    Barcode:
                    <Badge
                      count={record.product.barcode}
                      style={{ backgroundColor: "#C0C0C0", color: "black" }}
                    />
                  </Typography>
                  <Typography style={{ color: "black", fontFamily: "bold" }}>
                    Quantity:
                    <Badge
                      count={record.product.quantity}
                      style={{ backgroundColor: "#C0C0C0", color: "black" }}
                    />
                  </Typography>
                </div>
              );
            },
          },
          {
            align: "left",
            dataIndex: "inventory",
            key: "inventory",
            title: "Inventory",
            render: (_, record) => {
              return (
                <Typography style={{ color: "black", fontFamily: "bold" }}>
                  {record.inventory}
                </Typography>
              );
            },
          },
          {
            align: "left",
            dataIndex: "variant_attributes",
            key: "variant_attributes",
            title: "variant_attributes",
            render: (_, record) => {
              return (
                <Typography style={{ color: "black", fontFamily: "bold" }}>
                  {record.variant_attributes}
                </Typography>
              );
            },
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <a>
                  <Popovercom />
                </a>
              </Space>
            ),
          },
        ]}
        dataSource={products}
        rowSelection={{
          type: selectionType,
        }}
      />
    </>
  );
}

export default FillteringTable;
