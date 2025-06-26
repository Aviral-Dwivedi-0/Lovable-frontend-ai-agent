import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    password: "",
    otp: "",
  });
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Only allow email sign up for now
    if (isPhone) {
      toast.error("Phone sign up not supported yet.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.emailOrPhone,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
    setIsLoading(false);
  };

  const toggleAuthMethod = () => {
    setIsPhone(!isPhone);
    setShowVerification(false);
    setFormData((prev) => ({
      ...prev,
      emailOrPhone: "",
      password: "",
      otp: "",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!showVerification && (
        <>
          <div>
            <Label className="text-gray-700 font-medium">Full name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white text-black placeholder-gray-400 input-text-black"
              required
              style={{ color: "#000" }}
            />
          </div>

          {/* Email/Phone Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-gray-700 font-medium">
                {isPhone ? "Phone number" : "Email address"}
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleAuthMethod}
                className="text-teal-600 hover:text-teal-500 text-sm p-0 h-auto"
              >
                Use {isPhone ? "email" : "phone"} instead
              </Button>
            </div>
            <Input
              type={isPhone ? "tel" : "email"}
              placeholder={isPhone ? "+1 (555) 123-4567" : "john@company.com"}
              value={formData.emailOrPhone}
              onChange={(e) =>
                handleInputChange("emailOrPhone", e.target.value)
              }
              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white text-black placeholder-gray-400 input-text-black"
              required
              style={{ color: "#000" }}
            />
          </div>

          {!isPhone && (
            <div>
              <Label className="text-gray-700 font-medium">Password</Label>
              <div className="relative mt-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 pr-10 bg-white text-black placeholder-gray-400 input-text-black"
                  required
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
          )}
        </>
      )}

      {showVerification && (
        <div>
          <Label className="text-gray-700 font-medium">
            {isPhone ? "Enter OTP" : "Verification code"}
          </Label>
          <Input
            type="text"
            placeholder={
              isPhone ? "Enter 6-digit OTP" : "Enter verification code"
            }
            value={formData.otp}
            onChange={(e) => handleInputChange("otp", e.target.value)}
            className="mt-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 bg-white text-black placeholder-gray-400 input-text-black"
            maxLength={6}
            required
            style={{ color: "#000" }}
          />
          <p className="text-sm text-gray-500 mt-2">
            {isPhone
              ? `We sent a code to ${formData.emailOrPhone}`
              : `Check your email at ${formData.emailOrPhone}`}
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium"
        disabled={isLoading}
      >
        {isLoading
          ? "Processing..."
          : showVerification
          ? "Verify & create account"
          : "Create account"}
      </Button>

      {!showVerification && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full py-3 border-gray-300 bg-gray-50 text-teal-800"
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full mr-2"></div>
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full py-3 border-gray-300 text-teal-800 bg-gray-50"
            >
              <div className="w-5 h-5 bg-blue-700 rounded mr-2"></div>
              Sign up with LinkedIn
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default SignUpForm;
