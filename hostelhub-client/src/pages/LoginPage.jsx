import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiClient.js";

function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(formData);
            const data = response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            if(onLoginSuccess) {
                onLoginSuccess(data);
            }

            if(data.role === "Warden") {
                navigate('/warden')
            } else {
                navigate("/student");
            }
        } catch (err) {
            console.error("Login failed:", err);
            const msg = err.response?.data || "login failed. please check your credentials"
            setError(typeof msg === "string" ? msg : "invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center">
                    <span className="text-4xl">🏢</span>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">Sign in to HostelHub</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Enter Your credentials to access your maintenance portal
                    </p>
                </div>
                {error && (
                    <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}
                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                        </label>
                        <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="eg: ragul@example.com"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1"> Password </label>
                        <input 
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="******"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Signing in...." : "Sign in"}
                    </button>
                </form>

                <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">
                    Don't have an account?("") 
                    <Link to='/register' className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;