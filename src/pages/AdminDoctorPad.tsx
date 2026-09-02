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
import { ArrowLeft, FileText, LogOut } from "lucide-react";
import DoctorPad from "@/components/admin/doctorpad/DoctorPad";

const AdminDoctorPad = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const logout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Admin Panel</p>
            <h1 className="mt-1 text-3xl font-semibold">Prescription Pad</h1>
            <p className="text-sm text-muted-foreground">
              Create and preview prescriptions using the Vaidyam doctor pad.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate("/admin/dashboard")}> 
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Doctor Prescription Pad
            </CardTitle>
            <CardDescription>
              This page is available only to admin users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DoctorPad />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminDoctorPad;
