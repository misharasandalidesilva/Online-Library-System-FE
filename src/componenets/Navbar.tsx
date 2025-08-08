import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-teal-500 via-green-500 to-emerald-600 shadow-md">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <div className="text-white text-3xl select-none">📚</div>
                        <h1 className="text-white font-extrabold text-xl sm:text-2xl tracking-wide hover:underline">
                            Online Library System
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={handleLogin}
                            className="px-5 py-2 rounded-lg bg-white text-teal-600 font-semibold hover:bg-green-100 transition"
                        >
                            Login
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                        >
                            Logout
                        </button>

                        <button
                            onClick={handleDashboard}
                            className="px-5 py-2 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800 transition"
                        >
                            Dashboard
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-2 bg-white rounded-lg shadow-lg">
                        <button
                            onClick={handleLogin}
                            className="block w-full text-left px-5 py-3 font-semibold text-teal-600 hover:bg-teal-100 transition rounded-t-lg"
                        >
                            Login
                        </button>

                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-5 py-3 font-semibold text-green-700 hover:bg-green-100 transition"
                        >
                            Logout
                        </button>

                        <button
                            onClick={handleDashboard}
                            className="block w-full text-left px-5 py-3 font-semibold text-teal-800 hover:bg-teal-200 transition rounded-b-lg"
                        >
                            Dashboard
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
