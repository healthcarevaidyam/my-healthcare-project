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
import { clearAdminSession, getAdminSession } from "@/lib/adminAuth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ArrowLeft, Download, Eye, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
interface OrderRecord {
  id?: string | number;
  product_name: string;
  product_price: string;
  product_category: string;
  customer_name: string;
  phone: string;
  email: string;
  house_no: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  quantity: number;
  notes: string;
  created_at: string;
}

interface OrderSummary {
  totalOrders: number;
  totalQuantity: number;
  uniqueCustomers: number;
  categories: Record<string, number>;
}

const AdminOrders = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleFetchOrders = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Use the webhook URL with query parameters
      const url = `https://vaidyamhealthcare.app.n8n.cloud/webhook/get-orders?fromDate=${fromDate}&toDate=${toDate}`;
      console.log("Fetching orders from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const payload = await response.json();
      console.log("Orders response:", payload);

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to fetch orders");
      }

      // Normalize the data - handle both array and object responses
      let ordersData: OrderRecord[] = [];
      if (Array.isArray(payload)) {
        ordersData = payload;
      } else if (payload?.data && Array.isArray(payload.data)) {
        ordersData = payload.data;
      } else if (payload?.orders && Array.isArray(payload.orders)) {
        ordersData = payload.orders;
      } else if (payload?.body && Array.isArray(payload.body)) {
        ordersData = payload.body;
      } else {
        // If it's a single object, wrap it in an array
        ordersData = [payload].filter(Boolean);
      }

      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        err instanceof Error ? err.message : "Unable to fetch orders"
      );
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate summary statistics
  const summary = useMemo<OrderSummary>(() => {
    const totalOrders = orders.length;
    const totalQuantity = orders.reduce((sum, order) => sum + (order.quantity || 1), 0);
    const uniqueCustomers = new Set(orders.map((o) => o.phone)).size;
    
    const categories: Record<string, number> = {};
    orders.forEach((order) => {
      const category = order.product_category || "Uncategorized";
      categories[category] = (categories[category] || 0) + 1;
    });

    return { totalOrders, totalQuantity, uniqueCustomers, categories };
  }, [orders]);

  const exportToExcel = () => {
    if (orders.length === 0) return;

    const data = orders.map((item, index) => ({
      "S.No": index + 1,
      "Customer Name": item.customer_name || "",
      "Phone": item.phone || "",
      "Email": item.email || "",
      "Product": item.product_name || "",
      "Price": item.product_price || "",
      "Category": item.product_category || "",
      "Quantity": item.quantity || 1,
      "Address": `${item.house_no || ""}, ${item.street || ""}, ${item.landmark || ""}, ${item.city || ""}, ${item.state || ""} - ${item.pincode || ""}`,
      "Notes": item.notes || "",
      "Order Date": item.created_at ? new Date(item.created_at).toLocaleString() : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `Orders_${fromDate}_to_${toDate}.xlsx`);
  };

  const viewOrderDetails = (order: OrderRecord) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const logout = () => {
    clearAdminSession();
    navigate("/", { replace: true });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">
              View and manage customer orders.
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

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalQuantity}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unique Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.uniqueCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(summary.categories).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fetch Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Fetch Orders</CardTitle>
            <CardDescription>Select a date range and load orders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="order-from">From</Label>
                <Input
                  id="order-from"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="order-to">To</Label>
                <Input
                  id="order-to"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleFetchOrders} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Fetch Orders"
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={exportToExcel} 
                disabled={orders.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <p className="text-sm text-muted-foreground">
              Total Orders: <strong>{orders.length}</strong>
            </p>

            {/* Category Breakdown */}
            {Object.keys(summary.categories).length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.entries(summary.categories).map(([category, count]) => (
                  <Badge key={category} variant="secondary">
                    {category}: {count}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Order List</CardTitle>
            <CardDescription>All orders fetched from the webhook.</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No orders found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-4 py-3 text-left">#</th>
                      <th className="border px-4 py-3 text-left">Customer</th>
                      <th className="border px-4 py-3 text-left">Phone</th>
                      <th className="border px-4 py-3 text-left">Product</th>
                      <th className="border px-4 py-3 text-left">Price</th>
                      <th className="border px-4 py-3 text-left">Qty</th>
                      <th className="border px-4 py-3 text-left">Category</th>
                      <th className="border px-4 py-3 text-left">Date</th>
                      <th className="border px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-muted/50">
                        <td className="border px-4 py-3">{index + 1}</td>
                        <td className="border px-4 py-3 font-medium">
                          {item.customer_name || "-"}
                        </td>
                        <td className="border px-4 py-3">{item.phone || "-"}</td>
                        <td className="border px-4 py-3 max-w-[150px] truncate">
                          {item.product_name || "-"}
                        </td>
                        <td className="border px-4 py-3 font-semibold text-primary">
                          {item.product_price || "-"}
                        </td>
                        <td className="border px-4 py-3 text-center">
                          {item.quantity || 1}
                        </td>
                        <td className="border px-4 py-3">
                          <Badge variant="outline">
                            {item.product_category || "Uncategorized"}
                          </Badge>
                        </td>
                        <td className="border px-4 py-3 text-sm">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="border px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewOrderDetails(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Order Details
              <Badge variant="secondary" className="ml-2">
                #{selectedOrder?.id || "N/A"}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Complete order information for {selectedOrder?.customer_name}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            {selectedOrder && (
              <div className="space-y-4">
                {/* Customer Information */}
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-primary">Customer Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>{" "}
                      <span className="font-medium">{selectedOrder.customer_name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      <span className="font-medium">{selectedOrder.phone}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Email:</span>{" "}
                      <span className="font-medium">{selectedOrder.email || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Product Information */}
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-primary">Product Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Product:</span>{" "}
                      <span className="font-medium">{selectedOrder.product_name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>{" "}
                      <span className="font-bold text-primary">{selectedOrder.product_price}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>{" "}
                      <span className="font-medium">{selectedOrder.quantity || 1}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Category:</span>{" "}
                      <Badge variant="outline">{selectedOrder.product_category}</Badge>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-semibold text-primary">Delivery Address</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      {selectedOrder.house_no && `${selectedOrder.house_no}, `}
                      {selectedOrder.street && `${selectedOrder.street}, `}
                      {selectedOrder.landmark && `${selectedOrder.landmark}, `}
                      {selectedOrder.city && `${selectedOrder.city}, `}
                      {selectedOrder.state && `${selectedOrder.state}`}
                      {selectedOrder.pincode && ` - ${selectedOrder.pincode}`}
                    </p>
                    {selectedOrder.notes && (
                      <p className="mt-2 text-muted-foreground">
                        <span className="font-medium">Notes:</span> {selectedOrder.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Date */}
                <div className="text-sm text-muted-foreground text-right">
                  Ordered on: {formatDate(selectedOrder.created_at)}
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AdminOrders;