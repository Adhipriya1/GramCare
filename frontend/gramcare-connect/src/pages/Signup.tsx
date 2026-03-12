import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Stethoscope, Pill, BarChart3, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/lib/supabase";
import { UserRole } from "@/lib/types";

const roles = [
  { id: "patient", label: "Patient", icon: User, color: "healthcare-blue", description: "Check symptoms & consult doctors" },
  { id: "doctor", label: "Doctor", icon: Stethoscope, color: "healthcare-green", description: "Treat patients remotely" },
  { id: "pharmacist", label: "Pharmacist", icon: Pill, color: "healthcare-orange", description: "Manage medicines & prescriptions" },
  { id: "admin", label: "Admin", icon: BarChart3, color: "healthcare-purple", description: "Monitor community health" },
] as const;

type Role = typeof roles[number]["id"];

const roleColorMap: Record<Role, string> = {
  patient: "border-healthcare-blue bg-healthcare-blue/5 ring-healthcare-blue",
  doctor: "border-healthcare-green bg-healthcare-green/5 ring-healthcare-green",
  pharmacist: "border-healthcare-orange bg-healthcare-orange/5 ring-healthcare-orange",
  admin: "border-healthcare-purple bg-healthcare-purple/5 ring-healthcare-purple",
};

export default function Signup() {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role to continue.");
      return;
    }

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value;

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user returned from signup.");

      const userId = authData.user.id;

      // 2. Insert into the main `users` table
      const userPayload = {
        id: userId,
        role: selectedRole,
        full_name: name,
        phone,
        email,
        is_active: true,
        created_at: new Date().toISOString()
      };

      const { error: userError } = await supabase.from('users').insert(userPayload);
      if (userError) throw userError;

      // 3. Insert into the role-specific table
      // (Leaving other fields empty/default to be filled later via profile page)
      if (selectedRole === 'patient') {
        await supabase.from('patients').insert({ id: userId });
      } else if (selectedRole === 'doctor') {
        await supabase.from('doctors').insert({ id: userId, available: true });
      } else if (selectedRole === 'pharmacist') {
        await supabase.from('pharmacies').insert({ id: userId });
      }

      // 4. Update local context & navigate
      login(userPayload);
      toast.success("Account created successfully!");
      navigate(`/${selectedRole}`);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Heart className="h-7 w-7 text-healthcare-blue" />
            <span className="text-xl font-bold text-foreground">GramCare AI</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join GramCare AI to access healthcare services</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter your full name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" name="confirm" type="password" placeholder="••••••••" required />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Select Your Role</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`rounded-xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                      isSelected
                        ? `${roleColorMap[role.id]} ring-2`
                        : "border-border bg-card hover:border-muted-foreground/30"
                    }`}
                  >
                    <role.icon className={`h-6 w-6 mb-2 text-${role.color}`} />
                    <div className="font-semibold text-foreground text-sm">{role.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{role.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
