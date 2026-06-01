import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/adminApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState("email"); // 'email', 'otp', 'reset', 'success'
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await loginAdmin({ email, password });

      if (data.success) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        navigate("/sms/dashboard", { replace: true });
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      handleLogin();
    }
  };

  // Forgot Password Functions
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setForgotStep("email");
    setError("");
  };

  const handleSendOTP = async () => {
    setError("");
    if (!forgotEmail) {
      setError("Please enter your email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await sendOTPApi({ email: forgotEmail });
      // Simulated API call
      setTimeout(() => {
        setIsLoading(false);
        setForgotStep("otp");
        startTimer();
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await verifyOTPApi({ email: forgotEmail, otp: otpValue });
      setTimeout(() => {
        setIsLoading(false);
        setForgotStep("reset");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await resetPasswordApi({ email: forgotEmail, password: newPassword });
      setTimeout(() => {
        setIsLoading(false);
        setForgotStep("success");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForgotStep("email");
    setError("");
    setForgotEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
  };

  const renderForgotPasswordContent = () => {
    if (forgotStep === "email") {
      return (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Forgot Password?
            </h2>
            <p className="text-slate-500">
              Enter your email address and we'll send you an OTP
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendOTP()}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700"
                placeholder="admin@school.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <span>Send OTP</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </button>

          <button
            onClick={handleBackToLogin}
            className="w-full text-slate-600 hover:text-slate-800 font-semibold py-3 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </button>
        </>
      );
    }

    if (forgotStep === "otp") {
      return (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Enter OTP
            </h2>
            <p className="text-slate-500">We've sent a 6-digit code to</p>
            <p className="text-slate-700 font-semibold">{forgotEmail}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4 text-center">
              Enter 6-Digit OTP
            </label>
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-slate-500">
                Resend OTP in{" "}
                <span className="font-semibold text-blue-600">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={() => {
                  setError("");
                  setOtp(["", "", "", "", "", ""]);
                  handleSendOTP();
                }}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Verify OTP</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            )}
          </button>

          <button
            onClick={handleBackToLogin}
            className="w-full text-slate-600 hover:text-slate-800 font-semibold py-3 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </button>
        </>
      );
    }

    if (forgotStep === "reset") {
      return (
        <>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Reset Password
            </h2>
            <p className="text-slate-500">Enter your new password</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700"
                placeholder="Enter new password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isLoading}
              >
                {showNewPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Must be at least 8 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleResetPassword()}
                className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700"
                placeholder="Confirm new password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleResetPassword}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Resetting Password...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            )}
          </button>
        </>
      );
    }

    if (forgotStep === "success") {
      return (
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-slate-500">
              Your password has been successfully reset
            </p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700">
              You can now login with your new password
            </p>
          </div>

          <button
            onClick={handleBackToLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Back to Login</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Books */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 animate-float">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-500"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </div>

        <div className="absolute top-40 right-20 w-20 h-20 opacity-20 animate-float-delayed">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-purple-500"
          >
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        </div>

        <div className="absolute bottom-20 left-1/4 w-24 h-24 opacity-20 animate-float-slow">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-indigo-500"
          >
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        </div>

        <div className="absolute bottom-32 right-10 w-16 h-16 opacity-20 animate-float">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-pink-500"
          >
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
          </svg>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding & Illustration */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* ADISHRISOFTECH BRANDING */}
          <div className="relative z-10 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
              <div className="text-center mb-4">
                <p className="text-blue-200 text-sm font-medium mb-3">
                  Powered by
                </p>
                <div className="flex justify-center mb-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/40 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                    <div className="relative bg-white/30 backdrop-blur-sm p-3 rounded-xl border-2 border-white/40">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          A
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Adishrisoftech
                </h3>
                <p className="text-blue-100 text-sm font-semibold mb-4">
                  Innovative Software Solutions
                </p>
                <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                  <p className="text-white text-xs leading-relaxed">
                    <span className="font-bold">Empowering Education</span>{" "}
                    through cutting-edge technology
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 text-center">
                  <p className="text-white text-xs font-semibold">🔒 Secure</p>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 text-center">
                  <p className="text-white text-xs font-semibold">⚡ Fast</p>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 text-center">
                  <p className="text-white text-xs font-semibold">✓ Reliable</p>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 text-center">
                  <p className="text-white text-xs font-semibold">
                    👥 User-Friendly
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 text-center">
                <p className="text-blue-200 text-xs">
                  © 2024 Adishrisoftech. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="relative z-10 mt-8">
            <div className="flex items-start gap-3">
              <svg
                className="w-8 h-8 text-blue-300 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div>
                <p className="text-white font-medium italic">
                  "Education is the most powerful weapon which you can use to
                  change the world."
                </p>
                <p className="text-blue-200 text-sm mt-2">— Nelson Mandela</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form / Forgot Password Form */}
        <div className="flex flex-col justify-center p-12 lg:p-16">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">SchoolFee</h1>
              <p className="text-slate-500 text-sm">Admin Dashboard</p>
            </div>
          </div>

          {!showForgotPassword ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Admin Login
                </h2>
                <p className="text-slate-500">
                  Enter your credentials to access the dashboard
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700"
                      placeholder="admin@school.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-slate-700"
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading || !email || !password}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  Need help? Contact{" "}
                  <button className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    support@schoolfee.com
                  </button>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure SSL Encrypted Connection</span>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* Error Message for Forgot Password */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {renderForgotPasswordContent()}
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.08); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 10s ease-in-out infinite 2s; }
      `}</style>
    </div>
  );
}
