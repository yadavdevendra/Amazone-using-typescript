import { Frame, Navigation } from "@shopify/polaris";
import { Outlet } from "react-router-dom";

// useEffect(()=>{
//     document.title = "Amazon";
// },[])

function Dashboard() {
    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {url: '/',label: 'OverView'},
                    {url: '/listing',label: 'Listing'},
                    {url: '/',label: 'Settings' },
                    {url: '/',label: 'Products Linking'},
                    {url: '/',label: 'FAQs'},
                    {url: '/listing/:id',label: 'Edit Product'},
                ]}
            />

        </Navigation>
    );
    return (
        <div style={{ height: "500px" }}>

            <Frame
                navigation={navigationMarkup}
            >
                <Outlet />
            </Frame>

        </div>
    );
}

export default Dashboard;
