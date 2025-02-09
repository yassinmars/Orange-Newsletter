
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Clear authentication on component mount
    localStorage.removeItem("isAuthenticated");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, hardcoded credentials
    if (email === "admin@orange.com" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      window.location.reload();
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow">
        <div className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2000px-Orange_logo.svg.png"
            alt="Orange Logo"
            className="mx-auto h-12"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@orange.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
