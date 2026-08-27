import { useMemo, useState } from "react";
import {
  ArrowRight, Leaf, PackageCheck, Search, Pill, SlidersHorizontal, Stethoscope, X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderDialog from "@/components/OrderDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import medicalProductCatalog from "@/data/store/medical-products.json";
import wellnessProductCatalog from "@/data/store/wellness-products.json";

interface ProductRecord {
  slug: string;
  name: string;
  price: string;
  startingPrice: number;
  image: string;
  category: string;
  shortDescription: string;
  tags: string[];
  productType: "medical" | "wellness";
  stockStatus: "In stock" | "Limited stock";
  doctorRecommended?: boolean;
  featured?: boolean;
}

interface ProductCatalogRecord extends Omit<ProductRecord, "image"> {
  desktopImage: string;
  mobileImage: string;
}

const desktopImageModules = import.meta.glob(
  "@/assets/store/fordesktop/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
) as Record<string, string>;

const mobileImageModules = import.meta.glob(
  "@/assets/store/formobile/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
) as Record<string, string>;

const imageMap = (modules: Record<string, string>) => Object.fromEntries(
  Object.entries(modules).map(([path, source]) => [path.split("/").pop(), source]),
);

const desktopImages = imageMap(desktopImageModules);
const mobileImages = imageMap(mobileImageModules);
const productCatalog = [...medicalProductCatalog, ...wellnessProductCatalog];

const Store = () => {
  const isMobile = useIsMobile();
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeProductType, setActiveProductType] = useState<"medical" | "wellness">("medical");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("recommended");

  const products = useMemo<ProductRecord[]>(() => (
    (productCatalog as ProductCatalogRecord[]).map(({ desktopImage, mobileImage, ...product }) => ({
      ...product,
      image: (isMobile ? mobileImages[mobileImage] : desktopImages[desktopImage]) || "/placeholder.svg",
    }))
  ), [isMobile]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matches = products.filter((product) => {
      const matchesProductType = product.productType === activeProductType;
      const matchesSearch = !query || [product.name, product.category, product.shortDescription]
        .some((value) => value.toLowerCase().includes(query));
      return matchesProductType && matchesSearch;
    });

    return [...matches].sort((first, second) => {
      if (sortOrder === "price-low") return first.startingPrice - second.startingPrice;
      if (sortOrder === "price-high") return second.startingPrice - first.startingPrice;
      if (sortOrder === "name") return first.name.localeCompare(second.name);
      return Number(Boolean(second.featured)) - Number(Boolean(first.featured));
    });
  }, [activeProductType, products, searchQuery, sortOrder]);

  const medicalProducts = filteredProducts.filter((product) => product.productType === "medical");
  const wellnessProducts = filteredProducts.filter((product) => product.productType === "wellness");

  const clearFilters = () => {
    setSearchQuery("");
    setSortOrder("recommended");
  };

  const orderProduct = (product: ProductRecord) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const renderProductGrid = (items: ProductRecord[]) => (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((product) => (
        <article key={product.slug}
          className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-background shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
            <img src={product.image} alt={product.name} loading="lazy" decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <Badge className="absolute left-4 top-4 bg-background/95 text-foreground shadow-sm hover:bg-background">{product.category}</Badge>
            {product.featured && <Badge className="absolute right-4 top-4 bg-primary">Popular</Badge>}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant={product.productType === "medical" ? "default" : "secondary"}>
                {product.productType === "medical" ? <Pill className="mr-1 h-3 w-3" /> : <Leaf className="mr-1 h-3 w-3" />}
                {product.productType === "medical" ? "Medical product" : "Daily wellness"}
              </Badge>
              <span className="text-xs font-medium text-emerald-700">{product.stockStatus}</span>
            </div>
            <h3 className="text-xl font-bold leading-snug">{product.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{product.shortDescription}</p>
            {product.doctorRecommended && <p className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
              <Stethoscope className="h-4 w-4 shrink-0" /> Practitioner guidance recommended
            </p>}
            <div className="mt-6 flex items-end justify-between gap-4 border-t pt-5">
              <div><p className="text-xs text-muted-foreground">Starting price</p><p className="mt-1 text-xl font-bold text-primary">{product.price}</p></div>
              <Button onClick={() => orderProduct(product)} className="rounded-xl px-5">Order now <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <section className="sticky top-[73px] z-40 border-b bg-background/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex shrink-0 items-center justify-between gap-4 lg:mr-2">
              <div>
                <h1 className="text-lg font-bold leading-tight">Ayurveda Store</h1>
                <p className="text-xs text-muted-foreground">{filteredProducts.length} products</p>
              </div>
              <SlidersHorizontal className="h-5 w-5 text-primary lg:hidden" />
            </div>

            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products" aria-label="Search store products"
                className="h-10 rounded-xl bg-muted/50 pl-10 pr-10" />
              {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted">
                <X className="h-4 w-4" />
              </button>}
            </div>

          <div className="grid grid-cols-2 gap-2 lg:flex lg:shrink-0">
            <div className="min-w-0 lg:w-52">
              <label htmlFor="store-product-type" className="sr-only">Product type</label>
              <Select value={activeProductType} onValueChange={(value: "medical" | "wellness") => setActiveProductType(value)}>
                <SelectTrigger id="store-product-type" className="h-10 rounded-xl bg-background">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical products</SelectItem>
                  <SelectItem value="wellness">Daily wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-0 lg:w-48">
              <label htmlFor="store-sort" className="sr-only">Sort by</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger id="store-sort" className="h-10 rounded-xl bg-background">
                  <SelectValue placeholder="Sort products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(searchQuery || sortOrder !== "recommended") && <Button variant="ghost" size="sm" onClick={clearFilters} className="col-span-2 h-10 lg:col-span-1">Reset</Button>}
          </div>
        </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6 sm:py-8">

        {filteredProducts.length ? <div className="space-y-10">
          {medicalProducts.length > 0 && <section aria-labelledby="medical-products-heading" className="rounded-3xl border bg-blue-50/40 p-5 sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <span className="rounded-2xl bg-primary p-3 text-primary-foreground"><Pill className="h-6 w-6" /></span>
              <div>
                <h2 id="medical-products-heading" className="text-2xl font-bold">Ayurvedic medical products</h2>
                <p className="mt-1 text-sm text-muted-foreground">{medicalProducts.length} condition-focused medicines and treatment kits. Practitioner guidance is recommended.</p>
              </div>
            </div>
            {renderProductGrid(medicalProducts)}
          </section>}

          {wellnessProducts.length > 0 && <section aria-labelledby="wellness-products-heading" className="rounded-3xl border bg-emerald-50/40 p-5 sm:p-7">
            <div className="mb-6 flex items-start gap-4">
              <span className="rounded-2xl bg-emerald-700 p-3 text-white"><Leaf className="h-6 w-6" /></span>
              <div>
                <h2 id="wellness-products-heading" className="text-2xl font-bold">Daily wellness products</h2>
                <p className="mt-1 text-sm text-muted-foreground">{wellnessProducts.length} everyday herbal food, tea, oil, and personal wellness products.</p>
              </div>
            </div>
            {renderProductGrid(wellnessProducts)}
          </section>}
        </div> : <div className="rounded-3xl border border-dashed bg-background px-6 py-16 text-center">
          <Search className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <h3 className="mt-4 text-xl font-semibold">No products found</h3>
          <p className="mt-2 text-muted-foreground">Try another search term or browse all products.</p>
          <Button className="mt-6" variant="outline" onClick={clearFilters}>View all products</Button>
        </div>}

        <section className="mt-14 overflow-hidden rounded-3xl bg-primary px-6 py-8 text-primary-foreground sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div className="flex max-w-2xl items-start gap-4">
            <div className="rounded-2xl bg-white/15 p-3"><PackageCheck className="h-7 w-7" /></div>
            <div><h2 className="text-2xl font-bold">Not sure which product is right for you?</h2>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/80">Ayurvedic care is personal. Speak with our team before ordering a condition-specific wellness kit.</p></div>
          </div>
          <Button asChild variant="secondary" className="mt-6 w-full rounded-xl lg:mt-0 lg:w-auto">
            <a href="tel:+918377085976"><Stethoscope className="mr-2 h-4 w-4" />Talk to our team</a>
          </Button>
        </section>
        <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-5 text-muted-foreground">
          Product information is for general wellness support and is not a substitute for professional medical advice, diagnosis, or treatment. Consult a qualified practitioner, especially if you are pregnant, nursing, taking medication, or managing a health condition.
        </p>
      </main>

      <OrderDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} selectedProduct={selectedProduct} />
    </div>
  );
};

export default Store;
