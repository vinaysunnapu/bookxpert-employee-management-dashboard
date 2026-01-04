import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { STORAGE_KEYS } from "../data/constants";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@bookxpert.com" && password === "admin123") {
      localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, "true");
      navigate("/");
    } else {
      setError("Invalid credentials. Hint: admin@bookxpert.com / admin123");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-slate-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
          alt="Financial Data"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-24 text-white">
          <div className="bg-blue-600 w-16 h-1 rounded-full mb-8"></div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Empowering MSMEs with <br />
            <span className="text-blue-400">Digital Accuracy.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-md">
            The BookXpert Employee Management Portal provides streamlined tools
            to manage your workforce, ensuring your team stays focused on
            financial growth.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500">
              Sign in to manage your employee records
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-pulse">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <footer className="mt-12 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookXpert Private Limited. <br />
            Secure Dashboard Environment
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
