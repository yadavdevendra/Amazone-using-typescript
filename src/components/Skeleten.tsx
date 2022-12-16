import { SkeletonPage, Layout} from '@shopify/polaris';
function Skeleten() {
    const count = [1, 2, 3, 4, 5, 6]
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {count?.map((item) => {
                return (
                    <Layout key={item} sectioned>
                        <Layout.Section>
                            <SkeletonPage primaryAction></SkeletonPage>
                            <SkeletonPage primaryAction></SkeletonPage>
                            <SkeletonPage primaryAction></SkeletonPage>
                            <SkeletonPage primaryAction></SkeletonPage>
                        </Layout.Section>
                    </Layout>
                )
            })}
        </div>




    );
}
export default Skeleten;

