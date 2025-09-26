import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/store/api/walletApi";
import { setUser } from "@/store/slices/authSlice";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Wallet } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    const dashboardRoute =
      user.role === "user"
        ? "/dashboard/user"
        : user.role === "agent"
        ? "/dashboard/agent"
        : "/dashboard/admin";
    navigate(dashboardRoute, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData).unwrap();
      dispatch(setUser(response.data.user));
      toast.success("Welcome back!");

      // Redirect based on role
      const dashboardRoute =
        response.data.user.role === "user"
          ? "/dashboard/user"
          : response.data.user.role === "agent"
          ? "/dashboard/agent"
          : "/dashboard/admin";
      navigate(dashboardRoute);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="rounded-lg bg-gradient-primary p-2">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Cashyo</span>
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-center">Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-muted-foreground"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:text-primary-hover"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary hover:text-primary-hover"
                    >
                      Sign up now
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-card bg-muted/50">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Demo Credentials
                </h3>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong>User:</strong> user@demo.com / password123
                  </p>
                  <p>
                    <strong>Agent:</strong> agent@demo.com / password123
                  </p>
                  <p>
                    <strong>Admin:</strong> admin@demo.com / password123
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="flex items-center justify-center h-full p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center text-white"
            >
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Wallet className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Your Digital Wallet Awaits
              </h2>
              <p className="text-xl text-white/90 max-w-md">
                Secure, fast, and reliable financial transactions at your
                fingertips
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold">10M+</div>
                  <div className="text-sm text-white/80">Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-white/80">Agents</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-white/80">Uptime</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
