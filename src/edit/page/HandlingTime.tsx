import {
  Page,
  Layout,
  Card,
  TextContainer,
  Text,
 
} from "@shopify/polaris";
import { Input, Radio, RadioChangeEvent, Space } from "antd";
import React, { useEffect } from "react";
import { useState} from "react";
interface BioProps {
  data: any;
  save: any;
  setSave: any;
}

function HandlingTime({ data, setSave, save }: BioProps) {
  const [value, setValue] = useState<any>(1);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleChoiceListChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setTextFieldValue(data?.edited?.inventory_fulfillment_latency);
    const { unset, ...keep } = save;
    setSave({
      ...keep,
      inventory_fulfillment_latency:
        data?.edited?.inventory_fulfillment_latency,
    });
  };

  function handleTextFieldChange(e: any) {
    setTextFieldValue(e.target.value);
  }
  useEffect(() => {
    if (data) setTextFieldValue(data?.edited?.inventory_fulfillment_latency);
    if (data !== undefined) {
      if (data?.edited?.inventory_fulfillment_latency) {
        setValue(2);
        setSave((prevSave: any) => {
          return {
            ...prevSave,
            inventory_fulfillment_latency:
              data?.edited?.inventory_fulfillment_latency,
          };
        });
      } else {
        setValue(1);
        setSave((prevSave: any) => {
          return {
            ...prevSave,
            inventory_fulfillment_latency:
              data?.edited?.inventory_fulfillment_latency,
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
                Handling Time
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
                  Set the same Product inventory_fulfillment_latency for Shopify
                  and Amazon
                </Radio>
                <Radio value={2}>
                  Set a Custom Product inventory_fulfillment_latency for Amazon
                </Radio>
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
}
export default HandlingTime;
