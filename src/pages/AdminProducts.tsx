import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clearAdminSession, getAdminSession } from "@/lib/adminAuth";
import { ArrowLeft, PlusCircle, Package } from "lucide-react";

interface ProductRecord {
  slug?: string;
  name?: string;
  price?: string | number;
  image?: string;
  category?: string;
  shortDescription?: string;
}

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    slug: "",
    name: "",
    price: "",
    image: "",
    category: "",
    shortDescription: "",
  });

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate("/admin/login", { replace: true });
      return;
    }

    void loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://vaidyamhealthcare.app.n8n.cloud/webhook/products");
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to load products");
      }

      const list = Array.isArray(payload) ? payload : payload?.products || payload?.data || [];
      setProducts(list as ProductRecord[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load products");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://vaidyamhealthcare.app.n8n.cloud/webhook/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: form.slug,
          name: form.name,
          price: form.price,
          image: form.image,
          category: form.category,
          shortDescription: form.shortDescription,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to add product");
      }

      setSuccess(payload?.message || "Product added successfully");
      setForm({
        slug: "",
        name: "",
        price: "",
        image: "",
        category: "",
        shortDescription: "",
      });
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add product");
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const productCount = useMemo(() => products.length, [products]);

  const logout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Add products and manage the product catalog.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
            <CardDescription>Send a new product to the webhook.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="product-slug">Slug</Label>
                  <Input id="product-slug" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} className="mt-1" placeholder="herbal-tea" />
                </div>
                <div>
                  <Label htmlFor="product-name">Name</Label>
                  <Input id="product-name" value={form.name} onChange={(e) => updateField("name", e.target.value)} className="mt-1" placeholder="Herbal Tea" />
                </div>
                <div>
                  <Label htmlFor="product-price">Price</Label>
                  <Input id="product-price" value={form.price} onChange={(e) => updateField("price", e.target.value)} className="mt-1" placeholder="499" />
                </div>
                <div>
                  <Label htmlFor="product-image">Image</Label>
                  <Input id="product-image" value={form.image} onChange={(e) => updateField("image", e.target.value)} className="mt-1" placeholder="https://example.com/image.jpg" />
                </div>
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <Input id="product-category" value={form.category} onChange={(e) => updateField("category", e.target.value)} className="mt-1" placeholder="Wellness" />
                </div>
              </div>

              <div>
                <Label htmlFor="product-description">Short Description</Label>
                <Textarea id="product-description" value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} className="mt-1" placeholder="Brief description of the product" rows={4} />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {success ? <p className="text-sm text-green-600">{success}</p> : null}

              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
            <CardDescription>Products fetched from the webhook.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Total Products: {productCount}</span>
            </div>

            {isLoading ? (
              <p className="text-muted-foreground">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-muted-foreground">No products found.</p>
            ) : (
              <div className="space-y-3">
                {products.map((product, index) => (
                  <div key={`${product.slug || product.name || index}-${index}`} className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      <p className="font-semibold">{product.name || "Unnamed product"}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{product.shortDescription || "No description provided"}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <span>Slug: {product.slug || "-"}</span>
                      <span>Price: {product.price || "-"}</span>
                      <span>Category: {product.category || "-"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminProducts;
