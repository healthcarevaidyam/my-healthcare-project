import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAdminSession, getAdminSession, isAdminCredentialsValid, saveAdminSession } from "@/lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAdminCredentialsValid(username, password)) {
      setError("Invalid admin credentials");
      return;
    }

    saveAdminSession(username);
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Access the administration panel for inquiries and future tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Username</Label>
                <Input id="admin-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="mt-1" />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminLogin;
