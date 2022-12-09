import {Badge,Button,Layout,Page,Text,TextContainer,} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import Titleofedit from "./page/Titleofedit";
import Descriptionofedit from "./page/Descriptionofedit";
import HandlingTime from "./page/HandlingTime";
import PriceOfEdit from "./page/PriceOfEdit";
import Quantityofedit from "./page/Quantityofedit";
import { useParams } from "react-router-dom";
import Barcodeofedit from "./page/Barcodeofedit";
import { payload, token } from "../data/data";

function Editcomponent() {
  const [data, setdata] = useState<any>([]);
  const [save, setSave] = useState<any>({});

  // console.log("data", data);

  // console.log(save, "save");

  const id = useParams()
  var result = Object.keys(id).map((key) => [id[key]]);
  useEffect(() => {
    // we can keep the token in env variable for more security
    const payload: any =    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 640,
        "Ced-Target-Name": "amazon",
        appCode:
          "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
        appTag: "amazon_sales_channel",
      },
    }
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProduct?target_marketplace=amazon&source_marketplace=shopify&sourceShopID=500&targetShopID=640&container_id=${result}`,
      payload
    )
      .then((response) => response.json())
      .then((allData) => {
        console.log("Editapidata", allData.data.rows);
        allData.data.rows.map((item:any) => {
          if (item.visibility === "Catalog and Search") { setdata(item) }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  function handlesave() {
    // console.log("click on save",save);
    const paylods =({...payload,...save});
    const header: any ={
      method: "POST",
      body: JSON.stringify(paylods),
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 640,
        "Ced-Target-Name": "amazon",
        appCode:
          "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
        appTag: "amazon_sales_channel",
      },
    }
    console.log("result", paylods);
    fetch(`https://multi-account.sellernext.com/home/public/connector/product/saveProduct`,
    header
    )
      .then((response) => response.json())
      .then((allData) => { console.log("savedata", allData) })
  }
  return (
    <>
      <Page
        breadcrumbs={[{ content: "Products", url: "/listing" }]}
        title={data?.title}
        titleMetadata={<Badge status="success">Active</Badge>}
        subtitle="Perfect"
        compactTitle
        primaryAction={<Button onClick={handlesave} primary>Save</Button>}
      >
        <div style={{ marginTop: "var(--p-space-5)" }}>
          <Layout>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h5">
                Store details
              </Text>
              <Text variant="bodyMd" color="subdued" as="p">
                Choose Whether you want to list your product as your Offer or
                New ListisetSaveng and edit the details accordigly to know more
                checkout this guide on Amazo Listings
              </Text>
            </TextContainer>
          </Layout>
        </div>
        <Titleofedit data={data} save={save} setSave={setSave} />
        <Descriptionofedit data={data} save={save} setSave={setSave} />
        <HandlingTime data={data} save={save} setSave={setSave} />
        <PriceOfEdit data={data} save={save} setSave={setSave} />
        <Barcodeofedit data={data} save={save} setSave={setSave} />
        <Quantityofedit data={data} save={save} setSave={setSave} />
      </Page>
    </>
  );
}
export default Editcomponent;