import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Leaf, PackageCheck, Pill, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrderDialog from "@/components/OrderDialog";
import { getProductBySlug, storeProducts } from "@/data/productLoader";
import { useIsMobile } from "@/hooks/use-mobile";

const desktopImageModules = import.meta.glob("@/assets/store/fordesktop/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }) as Record<string, string>;
const mobileImageModules = import.meta.glob("@/assets/store/formobile/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }) as Record<string, string>;
const imageMap = (modules: Record<string, string>) => Object.fromEntries(Object.entries(modules).map(([path, source]) => [path.split("/").pop(), source]));
const desktopImages = imageMap(desktopImageModules);
const mobileImages = imageMap(mobileImageModules);

const categoryGuidance: Record<string, { highlights: string[]; usage: string; storage: string }> = {
  "Herbal Foods & Spreads": {
    highlights: ["Made for convenient everyday food use", "Available in multiple pack sizes", "Clearly displayed MRP and website price"],
    usage: "Enjoy as part of meals, breakfast or snacks according to the serving directions on the product label.",
    storage: "Store in a cool, dry place away from direct sunlight. Refrigerate after opening when instructed on the package.",
  },
  "Juices & Beverages": {
    highlights: ["A refreshing beverage for everyday enjoyment", "Convenient individual and family pack sizes", "Easy to serve at home or while travelling"],
    usage: "Serve chilled or use according to the directions printed on the product label. Shake before serving when instructed.",
    storage: "Keep in a cool, dry place away from sunlight. Follow the package directions for refrigeration and use after opening.",
  },
  "Herbal Powders": {
    highlights: ["Traditional herbal preparation in powder form", "Multiple pack sizes for different requirements", "Suitable for a simple daily wellness routine when used appropriately"],
    usage: "Use only in the quantity and manner stated on the package or recommended by a qualified practitioner.",
    storage: "Keep the container tightly closed in a cool, dry place. Protect the powder from moisture and use a clean, dry spoon.",
  },
  "Grains, Flour & Pulses": {
    highlights: ["A practical pantry staple for everyday meals", "Available in household and value pack sizes", "Suitable for a variety of traditional recipes"],
    usage: "Sort, rinse or prepare as appropriate for the product and cook thoroughly before consumption. Follow any directions on the package.",
    storage: "Store in an airtight container in a cool, dry place. Protect from moisture, insects and direct sunlight.",
  },
  "Pahadi Spices & Kits": {
    highlights: ["A selection inspired by traditional Uttarakhand flavours", "Useful for adding distinctive flavour to home cooking", "Multiple kit sizes for trial or family use"],
    usage: "Use in small quantities while cooking according to taste and the directions supplied with the selected kit.",
    storage: "Keep every spice container tightly closed in a cool, dry place away from moisture, heat and direct sunlight.",
  },
  "Oils & Personal Care": {
    highlights: ["Designed for an easy personal-care routine", "Available in practical pack sizes", "Simple format for regular use as directed"],
    usage: "Use externally or as stated on the package. Perform a small patch test before first use and stop if irritation occurs.",
    storage: "Close securely after use and store away from heat, moisture and direct sunlight. Keep out of reach of children.",
  },
};

const medicalGuidance = {
  highlights: ["Condition-focused products grouped in one coordinated kit", "Practitioner guidance recommended before ordering or use", "Designed to support a consistent care routine"],
  usage: "Use only after consultation with a qualified practitioner and follow the prescribed dose, duration and product-label instructions.",
  storage: "Store each item according to its package instructions, away from heat, moisture and direct sunlight. Keep out of reach of children.",
};

const ProductDetail = () => {
  const { slug } = useParams();
  const isMobile = useIsMobile();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedPack, setSelectedPack] = useState(product?.variants?.[0]?.label ?? "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedVariant = product?.variants?.find((variant) => variant.label === selectedPack) ?? product?.variants?.[0];
  const relatedProducts = useMemo(() => product
    ? storeProducts.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3)
    : [], [product]);

  if (!product) {
    return <div className="container mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Product not found</p>
      <h1 className="mt-4 font-heading text-4xl font-bold">This product is not available.</h1>
      <Button asChild className="mt-8"><Link to="/store"><ArrowLeft className="mr-2 h-4 w-4" />Back to store</Link></Button>
    </div>;
  }

  const imageFile = isMobile ? product.mobileImage : product.desktopImage;
  const image = (isMobile ? mobileImages[imageFile] : desktopImages[imageFile]) || "/placeholder.svg";
  const currentPrice = selectedVariant?.price ?? product.startingPrice;
  const currentMrp = selectedVariant?.mrp;
  const discount = currentMrp ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : 0;
  const fallbackGuidance = product.productType === "medical"
    ? medicalGuidance
    : categoryGuidance[product.category] ?? {
      highlights: ["Selected for everyday use", "Transparent pricing", "Convenient online ordering"],
      usage: "Use according to the directions printed on the product package.",
      storage: "Store according to the instructions printed on the product package.",
    };
  const aboutProduct = product.aboutProduct ?? `${product.shortDescription} This ${product.category.toLowerCase()} product is available through Vaidyam Healthcare with clear pricing and convenient online ordering.`;
  const productBenefits = product.benefits?.length ? product.benefits : fallbackGuidance.highlights;
  const usageInstructions = product.usageInstructions ?? fallbackGuidance.usage;
  const storageInstructions = product.storageInstructions ?? fallbackGuidance.storage;
  const checkoutProduct = {
    ...product,
    image,
    name: selectedVariant ? `${product.name} (${selectedVariant.label})` : product.name,
    price: `₹${currentPrice.toLocaleString("en-IN")}`,
  };

  return <div className="min-h-screen bg-[#f8faf9]">
    <main className="container mx-auto max-w-6xl px-4 py-8 md:py-14">
      <Link to="/store" className="inline-flex items-center text-sm font-semibold text-primary hover:underline"><ArrowLeft className="mr-2 h-4 w-4" />Back to store</Link>

      <div className="mt-6 grid gap-8 rounded-3xl border bg-background p-5 shadow-sm md:grid-cols-2 md:p-8">
        <div className="overflow-hidden rounded-2xl bg-secondary/40">
          <img src={image} alt={product.seo?.imageAlt ?? product.name} className="aspect-square h-full w-full object-cover" fetchPriority="high" decoding="async" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <Badge>{product.category}</Badge>
            <Badge variant="secondary">{product.productType === "medical" ? <Pill className="mr-1 h-3 w-3" /> : <Leaf className="mr-1 h-3 w-3" />}{product.productType === "medical" ? "Medical product" : "Daily wellness"}</Badge>
          </div>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.shortDescription}</p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700"><CheckCircle2 className="h-4 w-4" />{product.stockStatus}</p>

          {product.variants?.length && <div className="mt-7 max-w-sm">
            <label htmlFor="detail-pack-size" className="mb-2 block text-sm font-semibold">Choose pack size</label>
            <Select value={selectedVariant?.label} onValueChange={setSelectedPack}>
              <SelectTrigger id="detail-pack-size" className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>{product.variants.map((variant) => <SelectItem key={variant.label} value={variant.label}>{variant.label} — ₹{variant.price.toLocaleString("en-IN")}</SelectItem>)}</SelectContent>
            </Select>
          </div>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-primary">₹{currentPrice.toLocaleString("en-IN")}</span>
            {currentMrp && <><span className="text-lg text-muted-foreground line-through">₹{currentMrp.toLocaleString("en-IN")}</span><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{discount}% OFF</Badge></>}
          </div>
          <Button size="lg" className="mt-7 w-full rounded-xl sm:w-fit" onClick={() => setIsDialogOpen(true)}>Order now<ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </div>

      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        {[{ icon: PackageCheck, title: "Carefully packed", text: "Packed securely after your order is confirmed." }, { icon: Truck, title: "Delivery across India", text: "Availability depends on the destination PIN code." }, { icon: ShieldCheck, title: "Responsible guidance", text: product.doctorRecommended ? "Practitioner guidance is recommended before use." : "Read the product label and use as directed." }].map((item) => <div key={item.title} className="rounded-2xl border bg-background p-6"><item.icon className="h-6 w-6 text-primary" /><h2 className="mt-4 font-semibold">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-background p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Product details</p>
          <h2 className="mt-3 font-heading text-3xl font-bold">About {product.name}</h2>
          <p className="mt-5 leading-8 text-muted-foreground">{aboutProduct}</p>
          <div className="mt-7">
            <h3 className="text-lg font-semibold">Why you may like it</h3>
            <ul className="mt-4 space-y-3">
              {productBenefits.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{benefit}</li>)}
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border bg-background p-6 shadow-sm md:p-8"><h2 className="font-heading text-2xl font-bold">How to use</h2><p className="mt-4 leading-7 text-muted-foreground">{usageInstructions}</p></div>
          <div className="rounded-3xl border bg-background p-6 shadow-sm md:p-8"><h2 className="font-heading text-2xl font-bold">Storage guidance</h2><p className="mt-4 leading-7 text-muted-foreground">{storageInstructions}</p></div>
          <p className="rounded-2xl bg-amber-50 p-4 text-xs leading-5 text-amber-900">Product information is for general guidance. Always follow the ingredients, usage, allergen and storage information printed on the actual package.</p>
        </div>
      </section>

      {relatedProducts.length > 0 && <section className="mt-14"><h2 className="font-heading text-3xl font-bold">Related products</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{relatedProducts.map((item) => <Link key={item.slug} to={`/store/${item.slug}`} className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><Badge variant="secondary">{item.category}</Badge><h3 className="mt-4 text-xl font-bold group-hover:text-primary">{item.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.shortDescription}</p><p className="mt-4 font-bold text-primary">From {item.price}</p></Link>)}</div></section>}
    </main>
    <OrderDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} selectedProduct={checkoutProduct} />
  </div>;
};

export default ProductDetail;
