import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clearAdminSession, getAdminSession } from "@/lib/adminAuth";
import { MessageSquareText, Package, LogOut, ShoppingBag, FileText } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const logout = () => {
    clearAdminSession();
    navigate("/", { replace: true });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="border-b bg-muted/40 p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <div>
                <p className="text-sm font-medium text-primary">Admin Panel</p>
                <h2 className="mt-1 text-xl font-semibold">Dashboard</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manage inquiries, orders, and products from one place.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/inquiries")}
                >
                  <MessageSquareText className="mr-2 h-4 w-4" />
                  Inquiries
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                {/* <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/products")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </Button> */}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/admin/doctorpad")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Prescription Pad
                </Button>
              </div>

              <div className="mt-8 rounded-lg border bg-background/70 p-3 text-sm text-muted-foreground">
                Use the sidebar to quickly move between admin modules.
              </div>
            </aside>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground">
                    Choose a module to manage inquiries, orders, or products.
                  </p>
                </div>

                <Button variant="outline" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Card className="hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquareText className="h-5 w-5" />
                      Inquiries
                    </CardTitle>
                    <CardDescription>
                      Review consultation requests and export them to Excel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => navigate("/admin/inquiries")} className="w-full">
                      Open Inquiries
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Orders
                    </CardTitle>
                    <CardDescription>
                      View customer orders and export order data to Excel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => navigate("/admin/orders")} className="w-full">
                      View Orders
                    </Button>
                  </CardContent>
                </Card>

                {/* Uncomment when products management is ready */}
                {/* <Card className="hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Products
                    </CardTitle>
                    <CardDescription>
                      Manage your product catalog and inventory.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => navigate("/admin/products")} className="w-full">
                      Manage Products
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;