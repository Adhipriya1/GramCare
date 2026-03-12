import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Loader2, Save, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Patient } from "@/lib/types";

export default function PatientProfile() {
  const { user, t } = useApp();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState<Partial<Patient>>({
    age: undefined,
    gender: "",
    village: "",
    blood_group: "",
    medical_history: ""
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (error) throw error;
        if (data) {
          setProfile({
            age: data.age || undefined,
            gender: data.gender || "",
            village: data.village || "",
            blood_group: data.blood_group || "",
            medical_history: data.medical_history || ""
          });
        }
      } catch (err: any) {
        console.error("Error fetching patient profile:", err);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("patients")
        .update({
          age: profile.age ? Number(profile.age) : null,
          gender: profile.gender || null,
          village: profile.village || null,
          blood_group: profile.blood_group || null,
          medical_history: profile.medical_history || null,
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error saving profile:", err);
      toast.error(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const setField = (field: keyof Patient) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            My Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Keep your health and demographic information up to date.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-healthcare space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                placeholder="e.g. 34"
                value={profile.age || ""}
                onChange={setField("age")}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={profile.gender || ""}
                onValueChange={(val) => setProfile((prev) => ({ ...prev, gender: val }))}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Village */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="village">Village / City</Label>
              <Input
                id="village"
                placeholder="Enter your village or city"
                value={profile.village || ""}
                onChange={setField("village")}
              />
            </div>

            {/* Blood Group */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="blood_group">Blood Group</Label>
              <Select
                value={profile.blood_group || ""}
                onValueChange={(val) => setProfile((prev) => ({ ...prev, blood_group: val }))}
              >
                <SelectTrigger id="blood_group">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Medical History */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="medical_history">Medical History / Allergies</Label>
              <Textarea
                id="medical_history"
                placeholder="List any ongoing conditions, past surgeries, or allergies..."
                className="min-h-[120px]"
                value={profile.medical_history || ""}
                onChange={setField("medical_history")}
              />
            </div>

          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
