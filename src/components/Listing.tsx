import { Banner, Card,Page,Select } from "@shopify/polaris";
import { useCallback, useState } from "react";
import FillteringTable from "./FillteringTable";
import Tabcom from "./Tabcom";
// import FillterExample from './FillterExample'
// import TabExample from "./TabExample";
// import Table1 from "./Table1";

const Listing=()=> {
    const [selected, setSelected] = useState('today');
    const options = [
        { label: 'new_account', value: 'Select Name' },
     
    ];
    const handleSelectChange = useCallback((value:string) => setSelected(value), []);

    return (
        <Page fullWidth>
        <Card >
            <div style={{ display: "flex" }}>
                <Card.Section title="Listing">
                    Add variants if this product comes in multiple versions, like different
                    sizes or colors.if this product comes in multiple versions, like different
                    sizes or colors.
                    </Card.Section>
                    <Card.Section>
                    <Select
                    label="Select Name"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />
                </Card.Section>
            </div>
                <Banner
                    title="Some of your product variants are missing weights"
                    status="warning"
                    action={{ content: "Link Product", url: "" }}
                    onDismiss={() => { }}
                >
                    <p>
                        Add weights to show accurate rates at checkout and when buying
                        shipping labels in Shopify.
                    </p>
                </Banner>
            <Card >
            <Tabcom />
            <FillteringTable/>
            </Card>
            
        </Card>
        
        </Page>
    );
}
export default Listing;
