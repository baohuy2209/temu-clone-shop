import { getCurrentSession } from "@/actions/auth";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/sanity/lib/client";

export default async function Home() {
  const { user } = await getCurrentSession();

  const products = await getAllProducts();

  // const { randomProducts, winningIndex } =
  //   await getWheelOfFortuneConfiguration();
  return (
    <div>
      <SalesCampaignBanner />
      {/* <WheelOfFortune products={randomProducts} winningIndex={winningIndex} /> */}

      <section className="container mx-auto py-8">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
