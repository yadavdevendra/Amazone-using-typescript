import { Page, Layout, Card, TextContainer, Text } from "@shopify/polaris";
import { Input, Radio, RadioChangeEvent, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
interface BioProps {
  data: any;
  save: any;
  setSave: any;
}

const Barcodeofedit = ({ data, save, setSave }: BioProps) => {
  const [value, setValue] = useState<any>(1);
  const [textFieldValue, setTextFieldValue] = useState<string>("");

  //   const options = [
  //     {
  //       label: "Set the same Product barcode for Shopify and Amazon",
  //       value: "default",
  //     },
  //     {
  //       label: "Set a Custom Product barcode for Amazon",
  //       value: "custom",
  //       renderChildren,
  //     },
  //   ];
  const handleChoiceListChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setTextFieldValue(data?.edited?.barcode || data?.barcode);
    const { unset, ...keep } = save;
    setSave({ ...keep, barcode: data?.edited?.barcode || data?.barcode });
  };

  function handleTextFieldChange(value: any) {
    setTextFieldValue(value);
  }
  useEffect(() => {
    if (data) setTextFieldValue(data?.edited?.barcode || data?.barcode);
    if (data !== undefined) {
      if (data?.edited?.barcode) {
        setValue(2);
        setSave((prevSave: any) => {
          return {
            ...prevSave,
            barcode: data?.edited?.barcode || data?.barcode,
          };
        });
      } else {
        setValue(1);
        setSave((prevSave: any) => {
          return {
            ...prevSave,
            barcode: data?.edited?.barcode || data?.barcode,
          };
        });
      }
    }
  }, [data]);
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneThird>
          <div style={{ marginTop: "var(--p-space-5)" }}>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h4">
                Barcode
              </Text>
              <Text variant="bodyMd" color="subdued" as="p">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Radio.Group onChange={handleChoiceListChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  Set the same Product barcode for Shopify and Amazon
                </Radio>
                <Radio value={2}>Set a Custom Product barcode for Amazon</Radio>
                {value === 2 ? (
                  <Input
                    style={{ width: "38vw", marginLeft: 25 }}
                    onChange={handleTextFieldChange}
                    value={textFieldValue}
                    autoComplete="off"
                  />
                ) : null}
              </Space>
            </Radio.Group>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Barcodeofedit;
