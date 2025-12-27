
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { setCredentials } from "@/redux/features/auth/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailSignIn = async () => {
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      const user = data.user as any;
      dispatch(setCredentials({ user }));
      if (user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (user.role === "agent") {
        navigate("/dashboard/agent");
      } else {
        navigate("/dashboard/user");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({ provider: "github" });
  };

  return (
    <AuthLayout
      title="Login"
      description="Enter your email below to login to your account"
      quote="Cashyo has transformed how I manage my finances. Seek no further."
      author="Sofia Davis"
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={handleEmailSignIn}
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Login
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="w-full border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
            onClick={() => {
              setEmail("admin@mail.com");
              setPassword("Password123");
            }}
          >
            Demo Admin
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50"
            onClick={() => {
              setEmail("agent@mail.com");
              setPassword("Password123");
            }}
          >
            Demo Agent
          </Button>
          <Button
            variant="outline"
            className="w-full border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50"
            onClick={() => {
              setEmail("demo@mail.com");
              setPassword("Demo1234");
            }}
          >
            Demo User
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleGoogleSignIn}>
            Google
          </Button>
          <Button variant="outline" onClick={handleGithubSignIn}>
            GitHub
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout >
  );
}
