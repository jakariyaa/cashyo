import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { useRegisterMutation } from "@/store/api/walletApi";
import { setUser } from "@/store/slices/authSlice";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, User, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" as "user" | "agent",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }).unwrap();

      dispatch(setUser(response.data.user));
      toast.success("Account created successfully! Welcome to Cashyo!");

      // Redirect based on role
      const dashboardRoute =
        response.data.user.role === "user"
          ? "/dashboard/user"
          : response.data.user.role === "agent"
          ? "/dashboard/agent"
          : "/dashboard/admin";
      navigate(dashboardRoute);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as "user" | "agent",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
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

            <Badge variant="secondary" className="mb-4">
              Create Account
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Join Cashyo
            </h1>
            <p className="mt-2 text-muted-foreground">
              Create your account and start managing your finances
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-center">Create Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                    />
                  </div>

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
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Account Type
                    </label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="user" id="user" />
                          <Label
                            htmlFor="user"
                            className="flex items-center space-x-3 cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">Personal User</div>
                              <div className="text-sm text-muted-foreground">
                                Send money, pay bills, manage finances
                              </div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="agent" id="agent" />
                          <Label
                            htmlFor="agent"
                            className="flex items-center space-x-3 cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-success">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">Business Agent</div>
                              <div className="text-sm text-muted-foreground">
                                Provide cash-in/out services to users
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
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
                        placeholder="Create a strong password"
                        required
                        autoComplete="new-password"
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

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:text-primary-hover"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-primary hover:text-primary-hover"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white hover:opacity-90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary hover:text-primary-hover"
                    >
                      Sign in here
                    </Link>
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
                Start Your Financial Journey
              </h2>
              <p className="text-xl text-white/90 max-w-md mb-8">
                Join millions of users who trust Cashyo for secure and
                convenient financial services
              </p>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-semibold">Personal Users</div>
                  <div className="text-sm text-white/80">
                    Send money, pay bills
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-semibold">Business Agents</div>
                  <div className="text-sm text-white/80">
                    Cash-in/out services
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
