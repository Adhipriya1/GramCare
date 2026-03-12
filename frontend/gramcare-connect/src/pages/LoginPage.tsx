import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("-> Starting login via Supabase...");
      // 1. Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("-> signInWithPassword complete. Data:", authData, "Error:", authError);

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user returned from login.");

      console.log("-> Extracting User Profile from Auth Metadata...");
      // 2. Extract user details directly from Auth Metadata (FAST)
      const { role, full_name } = authData.user.user_metadata || {};
      
      if (!role) {
        throw new Error("User role not found in auth metadata. Please try signing up again.");
      }

      const profile = {
        id: authData.user.id,
        email: authData.user.email,
        role: role,
        full_name: full_name || 'User',
      };

      console.log("-> Calling login(profile) context update...");
      // 3. Update local context & navigate
      login(profile as any);
      console.log("-> Showing toast and navigating...");
      toast.success("Logged in successfully!");
      navigate(`/${profile.role}`);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
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
}
