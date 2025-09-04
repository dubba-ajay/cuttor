import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, AppRole } from "@/contexts/AuthContext";
import { getSupabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AuthDialog({ open, onOpenChange, mode = "login" as "login" | "signup" }) {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppRole>("customer");
  const [tab, setTab] = useState<"login"|"signup">(mode);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      const supabase = getSupabase();
      const { data } = await supabase.auth.getUser();
      const r = (data.user?.user_metadata?.role as AppRole | undefined) || "customer";
      toast("Logged in");
      onOpenChange(false);
      if (r === "freelancer") navigate("/freelancer-dashboard");
      else if (r === "owner") navigate("/store-owner-dashboard");
      else navigate("/user-dashboard");
    } catch (e:any) { toast.error(e.message); } finally { setLoading(false); }
  };
  const onSignup = async () => {
    try {
      setLoading(true);
      await signUp(email, password, role);
      toast("Account created. Check email if confirmation required.");
      onOpenChange(false);
      if (role === "freelancer") navigate("/freelancer-dashboard");
      else if (role === "owner") navigate("/store-owner-dashboard");
      else navigate("/user-dashboard");
    } catch (e:any) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tab === "login" ? "Login" : "Create account"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          {tab === "signup" && (
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(v)=>setRole(v as AppRole)}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="owner">Store Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button className="flex-1" onClick={tab === "login" ? onLogin : onSignup} disabled={loading}>
              {tab === "login" ? "Login" : "Sign up"}
            </Button>
            <Button variant="ghost" onClick={()=>setTab(tab === "login" ? "signup" : "login")}>{tab === "login" ? "Create account" : "Have an account? Login"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
