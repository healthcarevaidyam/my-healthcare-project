import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductRecord {
  slug: string;
  name: string;
  price: string;
  image: string;
  category: string;
  shortDescription: string;
}

const dummyProducts: ProductRecord[] = [
  {
    slug: "infertility-management-kit",
    name: "Infertility Management Kit",
    price: "₹1499-₹3100",
    image: "/assets/store/formobile/infertility-management-kit.png",
    category: "Women's Wellness",
    shortDescription:
      "A thoughtfully curated wellness kit designed to support a healthy lifestyle and reproductive wellness journey.",
  },
  {
    slug: "pcos-pcos-care-kit",
    name: "PCOS/PCOD Care Kit",
    price: "₹1,299-₹2,499",
    image: "/images/products/pcos-care-kit.jpg",
    category: "Women's Wellness",
    shortDescription:
      "A curated wellness kit designed to complement a balanced lifestyle and support women's everyday wellness.",
  },
  {
    slug: "diabetes-care-kit",
    name: "Diabetes Care Kit",
    price: "₹1,199-₹2,499",
    image: "/assets/store/formobile/diabetes-care-kit.png",
    category: "Diabetes Wellness",
    shortDescription:
      "A carefully selected wellness kit designed to complement healthy lifestyle and dietary routines.",
  },
  {
    slug: "piles-fistula-care-kit",
    name: "Piles/Fistula Care Kit",
    price: "₹999-₹1,499",
    image: "/assets/store/formobile/piles-fistula-care-kit.png",
    category: "Digestive Wellness",
    shortDescription:
      "A curated herbal wellness kit designed to complement a healthy digestive and lifestyle routine.",
  },
  {
    slug: "skin-care-kit",
    name: "Skin Care Kit",
    price: "₹899",
    image: "/assets/store/formobile/skin-care-kit.png",
    category: "Skin Wellness",
    shortDescription:
      "A natural wellness kit featuring carefully selected products to complement your everyday skincare routine.",
  },
  {
    slug: "ayurvedic-herbal-tea-kit",
    name: "Ayurvedic Herbal Tea Kit",
    price: "₹99-₹399",
    image: "/assets/store/formobile/ayurvedic-herbal-tea-kit.png",
    category: "Herbal Wellness",
    shortDescription:
      "A refreshing collection of traditional herbal teas designed to complement your daily wellness routine.",
  },
];


const Store = () => {
  return (
    <section className="!m-0 !p-0">
      <div className="container mx-auto px-4 !pt-0 pb-20">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Store
          </p>

          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Our wellness products
          </h1>

          <p className="text-lg text-muted-foreground">
            Browse the latest Ayurvedic wellness products curated for everyday
            health and balance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dummyProducts.map((product) => (
            <Card
              key={product.slug}
              className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="h-56 w-full overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Product Information */}
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl">
                    {product.name}
                  </CardTitle>

                  <Badge variant="secondary">
                    {product.category}
                  </Badge>
                </div>

                <CardDescription className="pt-2">
                  {product.shortDescription}
                </CardDescription>
              </CardHeader>

              {/* Product Price */}
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    {product.category}
                  </span>

                  <span className="text-lg font-semibold text-primary">
                    {product.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Store;