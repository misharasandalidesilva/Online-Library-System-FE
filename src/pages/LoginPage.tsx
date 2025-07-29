import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { loginUser } from '../service/AuthService';
import toast from 'react-hot-toast';
import type { LoginRequest } from '../types/User';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const response = await loginUser(formData);
            toast.success('Login success!');
            navigate('/DashBoard');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 overflow-hidden">
            {/* subtle animated gradient overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-teal-600 via-green-400 to-teal-400 opacity-40 animate-gradient-x pointer-events-none"></div>

            <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="bg-white bg-opacity-30 backdrop-blur-lg border border-gradient-to-r from-green-400 via-teal-400 to-green-400 rounded-3xl shadow-2xl px-8 py-10 hover:shadow-[0_0_25px_rgba(22,163,74,0.7)] transition-shadow duration-500 max-h-[90vh] overflow-y-auto">
                    <div className="text-center mb-8">
                        <div className="h-14 w-14 mx-auto bg-gradient-to-r from-green-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg mb-4 animate-pulse">
                            <Lock className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide mb-1 drop-shadow-md">Library Login</h2>
                        <p className="text-gray-600 text-base">Access your dashboard</p>
                    </div>

                    <div className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 text-green-600 transition-transform duration-300 group-focus-within:scale-110" />
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="you@example.com"
                                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-all focus:ring-4 focus:ring-green-600 focus:outline-none focus:border-transparent ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 text-green-600 transition-transform duration-300 group-focus-within:scale-110" />
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-10 py-3 rounded-2xl border transition-all focus:ring-4 focus:ring-green-600 focus:outline-none focus:border-transparent ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full py-3 mt-3 bg-gradient-to-r from-green-600 via-teal-500 to-green-400 text-white font-semibold rounded-3xl shadow-lg hover:from-green-700 hover:to-teal-600 transition-all disabled:opacity-50 active:scale-95"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don’t have an account?{' '}
                            <button className="text-green-600 font-medium hover:underline">Sign up</button>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes gradient-x {
                    0%, 100% {background-position: 0% center;}
                    50% {background-position: 100% center;}
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 10s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
