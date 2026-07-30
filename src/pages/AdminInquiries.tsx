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
import {
  normalizeInquiries,
  type InquiryRecord,
} from "@/lib/adminInquiries";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ArrowLeft, Download } from "lucide-react";

const AdminInquiries = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("2026-07-01");
  const [toDate, setToDate] = useState("2026-07-27");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleFetchInquiries = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://vaidyamhealthcare.app.n8n.cloud/webhook/inquiries?from=${fromDate}&to=${toDate}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to fetch inquiries");
      }

      setInquiries(normalizeInquiries(payload));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to fetch inquiries"
      );
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const inquiryCount = useMemo(() => inquiries.length, [inquiries]);

  const exportToExcel = () => {
    if (inquiries.length === 0) return;

    const data = inquiries.map((item, index) => ({
      "S.No": index + 1,
      Name: item.name || "",
      Phone: item.phone || "",
      Email: item.email || "",
      Problem: item.problem || "",
      Date: item.date || item.createdAt || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `Inquiries_${fromDate}_to_${toDate}.xlsx`);
  };

  const logout = () => {
    clearAdminSession();
    navigate("/", { replace: true });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Inquiries</h1>
            <p className="text-muted-foreground">
              Review user inquiries and export them for reporting.
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
            <CardTitle>Fetch Inquiries</CardTitle>
            <CardDescription>Select a date range and load inquiries.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="inquiry-from">From</Label>
                <Input
                  id="inquiry-from"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="inquiry-to">To</Label>
                <Input
                  id="inquiry-to"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleFetchInquiries} disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch Inquiries"}
              </Button>
              <Button variant="outline" onClick={exportToExcel} disabled={inquiries.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <p className="text-sm text-muted-foreground">
              Total Inquiries: <strong>{inquiryCount}</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inquiry List</CardTitle>
            <CardDescription>All inquiries fetched from the webhook.</CardDescription>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-muted-foreground">No inquiries found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-4 py-3 text-left">#</th>
                      <th className="border px-4 py-3 text-left">Name</th>
                      <th className="border px-4 py-3 text-left">Phone</th>
                      <th className="border px-4 py-3 text-left">Email</th>
                      <th className="border px-4 py-3 text-left">Problem</th>
                      <th className="border px-4 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((item, index) => (
                      <tr key={`${item.email ?? item.phone ?? index}-${index}`} className="hover:bg-muted/50">
                        <td className="border px-4 py-3">{index + 1}</td>
                        <td className="border px-4 py-3">{item.name || "-"}</td>
                        <td className="border px-4 py-3">{item.phone || "-"}</td>
                        <td className="border px-4 py-3">{item.email || "-"}</td>
                        <td className="border px-4 py-3">{item.problem || "-"}</td>
                        <td className="border px-4 py-3">{item.date || item.createdAt || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminInquiries;
