import { MobileVerticalDotsMajor } from '@shopify/polaris-icons'
import { IndexTable, Card, useIndexResourceState, TextField, Filters, Select, Button, Icon, ChoiceList } from "@shopify/polaris";
import { Avatar, Modal, Popover, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleten from "./Skeleten";
// import Popovercom from "./Popovercom";
const text = <span>Action</span>;

function PolarisFilter() {
    // const [searchedText, setSearchedText] = useState<string>("");
    const [availability, setAvailability] = useState<any>(null);
    const [productType, setProductType] = useState<any>(null);
    const [products, setProducts] = useState<string | any>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<any>({});
    const [taggedWith, setTaggedWith] = useState<string>("VIP");
    const [queryValue, setQueryValue] = useState<string>("");
    console.log(queryValue);
    const token = process.env.REACT_APP_API_KEY
    const api = process.env.REACT_APP_API
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
        // console.log("Varient", value);
        let temp = "";
        value.forEach((item: any) => {
            if (item) {
                temp += item + " ";
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
        fetch(`${api}`,
            payload
        )
            .then((response: any) => response.json())
            .then((allData: any) => {
                let newData = allData?.data?.rows?.map((item: any) => {
                    //   console.log(item, "item");
                    return {
                        img: item["main_image"],
                        id: item._id["$oid"],
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
            .catch((err: any) => console.log(err));
    }, []);
    console.log("products", products);
    const content: any = (data: any) => {
        return (
            <div
                style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
            >
                <Typography
                    onClick={() => {
                        setSelectedProduct(data);
                        setIsModalOpen(true);
                    }}
                >
                    View
                </Typography>
                <Typography>Delete</Typography>
                <Typography>Edit</Typography>
            </div>
        );
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const resourceName = {
        singular: "customer",
        plural: "customers",
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(products);
    const rowMarkup = products?.map(
        ({ id, img, title, product, inventory, variant_attributes }: any, index: any) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell><img src={img} alt="N/A" /></IndexTable.Cell>
                <IndexTable.Cell>{title}</IndexTable.Cell>
                <IndexTable.Cell>
                    <p>SKU:{product?.sku}</p>
                    <p>Price:{product?.price}</p>
                    <p>Barcode:{product?.barcode}</p>
                    <p>Quantity:{product?.quantity}</p>
                </IndexTable.Cell>
                <IndexTable.Cell>{inventory}</IndexTable.Cell>
                <IndexTable.Cell>{variant_attributes}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Popover
                        placement="bottomLeft"
                        title={text}
                        content={() => content({ id, img, title, product, inventory, variant_attributes })}
                        trigger="click"
                    >

                        <div style={{ height: "35px", borderRadius: "5px", width: "50px", border: "1.5px solid grey", display: "flex", justifyContent: "center" }}>
                            <Icon source={MobileVerticalDotsMajor} color="base" />
                        </div>
                    </Popover>

                </IndexTable.Cell>
            </IndexTable.Row>
        )
    );
    // for filter
    const handleTaggedWithChange = useCallback((value: any) => setTaggedWith(value), []);
    const handleProductTypeChange = useCallback((value: any) => setProductType(value), []);
    const handleAvailabilityChange = useCallback((value: any) => setAvailability(value), []);
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
    const handleClearAll = useCallback(() => {
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);

    const filters = [
        {
            key: "availability",
            label: "Availability",
            filter: (
                <ChoiceList
                    title="Availability"
                    titleHidden
                    choices={[
                        { label: "Online Store", value: "Online Store" },
                        { label: "Point of Sale", value: "Point of Sale" },
                        { label: "Buy Button", value: "Buy Button" }
                    ]}
                    selected={availability || []}
                    onChange={handleAvailabilityChange}
                    allowMultiple
                />
            ),
            shortcut: true
        },
        {
            key: "productType",
            label: "Product type",
            filter: (
                <ChoiceList
                    title="Product type"
                    titleHidden
                    choices={[
                        { label: "T-Shirt", value: "T-Shirt" },
                        { label: "Accessory", value: "Accessory" },
                        { label: "Gift card", value: "Gift card" }
                    ]}
                    selected={productType || []}
                    onChange={handleProductTypeChange}
                    allowMultiple
                />
            )
        },

        {
            key: "taggedWith",
            label: "Tagged with",
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            )
        }
    ];
    const appliedFilters = !isEmpty(taggedWith)
        ? [
            {
                key: "taggedWith",
                label: disambiguateLabel("taggedWith", taggedWith),
                onRemove: handleTaggedWithRemove
            }
        ]
        : [];
    //     const filteredUsers = useMemo(
    //         () =>
    //           products?.filter((product:any) => {
    //             return product?.title.toString().toLowerCase().includes(queryValue.toLowerCase())
    //           }).map(function (product: any) {
    //             return product.title;
    //         }),[])
    // console.log("filtering", filteredUsers);

    // // let filteredUsers = products?.filter(function (product: any) {
    // //     return product?.title === queryValue;
    // // }).map(function (product: any) {
    // //     return product.title;
    // // })
    // // console.log("filtering", filteredUsers);
    return (
        <Card>
            <div style={{ padding: "1px", display: "flex" }}>
                <div style={{ flex: 1, marginRight: "205px" }}>
                    <Filters
                        queryValue={queryValue}
                        filters={filters}
                        appliedFilters={appliedFilters}
                        onQueryChange={setQueryValue}
                        onQueryClear={handleQueryValueRemove}
                        onClearAll={handleClearAll}
                    />
                </div>
                <div style={{ marginLeft: "20px" }}>
                    <Button >Sync Status</Button>
                    <Button >Amazone Account</Button>
                    <Button>Bulk Update</Button>

                </div>
            </div>
            {(products == "") ? <Skeleten />
                :
                <IndexTable
                    resourceName={resourceName}
                    itemCount={products.length}
                    selectedItemsCount={
                        allResourcesSelected ? "All" : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: "Image" },
                        { title: "Title" },
                        { title: "Location" },
                        { title: "Order count" },
                        { title: "Amount spent" },
                        { title: "Action" },
                    ]}
                >
                    {rowMarkup}
                </IndexTable>}
            {/* <DataTableFiltersExample products={products}/> */}
            {/*Table End */}
            {/*Model Start */}
            <Modal
                title="Selected Data View"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Avatar src={selectedProduct.img} />
                <Typography>Title:{selectedProduct.title}</Typography>
                <Typography>
                    Product:
                    <ul>
                        <li>SKU:{selectedProduct.product?.sku}</li>
                        <li>Price:{selectedProduct.product?.price}</li>
                        <li>Barcode:{selectedProduct.product?.barcode}</li>
                    </ul>
                </Typography>
                <Typography>Invetory:{selectedProduct.inventory || "N/A"}</Typography>
                <Typography>variant_attributes:{selectedProduct.variant_attributes || "N/A"}</Typography>
            </Modal>

        </Card>
    );
    // for filter
    function disambiguateLabel(key: any, value: any) {
        switch (key) {
            case "taggedWith":
                return `Tagged with ${value}`;
            default:
                return value;
        }
    }

    function isEmpty(value: any) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === "" || value == null;
        }
    }
}

export default PolarisFilter;
