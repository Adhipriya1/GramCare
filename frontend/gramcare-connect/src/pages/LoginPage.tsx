import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useApp, UserRole } from "@/contexts/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay for realistic UI
    setTimeout(() => {
      // Default to "patient" if the user hasn't signed up with a role yet
      const role = (localStorage.getItem("gramcare_last_role") as UserRole) || "patient";
      
      // Call static login
      login(email, role);
      setLoading(false);
      toast.success("Logged in successfully!");
      navigate(`/${role}`);
    }, 500);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Heart className="h-7 w-7 text-healthcare-blue" />
            <span className="text-xl font-bold text-foreground">GramCare AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Login to your GramCare AI account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
            {loading ? "Logging in..." : "Login"} <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
