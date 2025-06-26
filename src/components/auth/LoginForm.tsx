import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
const LoginForm = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    otp: "",
    rememberMe: false,
  });
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isPhone && !showOTP) {
        setShowOTP(true);
        toast.success("OTP sent to your phone");
      } else {
        toast.success("Login successful!");
        navigate("/dashboard");
      }
      setIsLoading(false);
    }, 1000);
  };
  const toggleAuthMethod = () => {
    setIsPhone(!isPhone);
    setShowOTP(false);
    setFormData((prev) => ({
      ...prev,
      emailOrPhone: "",
      password: "",
      otp: "",
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email/Phone Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            !isPhone
              ? "bg-teal-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => !isPhone || toggleAuthMethod()}
        >
          Email
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            isPhone
              ? "bg-teal-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => isPhone || toggleAuthMethod()}
        >
          Phone
        </button>
      </div>

      <div>
        <Label className="text-black font-medium">
          {isPhone ? "Phone number" : "Email address"}
        </Label>
        <Input
          type={isPhone ? "tel" : "email"}
          placeholder={isPhone ? "+1 (555) 123-4567" : "john@company.com"}
          value={formData.emailOrPhone}
          onChange={(e) => handleInputChange("emailOrPhone", e.target.value)}
          required
          className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white text-black placeholder-gray-400 input-text-black"
          style={{ color: "#000" }}
        />
      </div>

      {isPhone && showOTP ? (
        <div>
          <Label className="text-black font-medium">Enter OTP</Label>
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={(e) => handleInputChange("otp", e.target.value)}
            className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white text-black placeholder-gray-400 input-text-black"
            maxLength={6}
            required
            style={{ color: "#000" }}
          />
        </div>
      ) : !isPhone ? (
        <div>
          <Label className="text-black font-medium">Password</Label>
          <div className="relative mt-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 pr-10 bg-white text-black placeholder-gray-400 input-text-black"
              style={{ color: "#000" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              handleInputChange("rememberMe", !!checked)
            }
          />
          <Label htmlFor="remember" className="text-sm text-black">
            Keep me signed in
          </Label>
        </div>
        {!isPhone && (
          <button
            type="button"
            className="text-sm text-teal-600 hover:text-teal-500"
          >
            Forgot password?
          </button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium"
        disabled={isLoading}
      >
        {isLoading
          ? "Processing..."
          : isPhone && showOTP
          ? "Verify OTP"
          : "Sign in"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-black">or</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full py-3 border-gray-300 bg-gray-50 text-teal-800"
        >
          <div className="w-5 h-5 bg-blue-500 rounded-full mr-2"></div>
          Sign in with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full py-3 border-gray-300 text-teal-800 bg-gray-50"
        >
          <div className="w-5 h-5 bg-blue-700 rounded mr-2"></div>
          Sign in with LinkedIn
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;
