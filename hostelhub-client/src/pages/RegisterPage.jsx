import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../api/apiClient.js";

const HOSTEL_OPTIONS = [
    "Ganga Hostel",
    "Kavery Hostel",
    "Yamuna Hostel",
    "Godavari Hostel"
]

function RegisterPage ({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "Student",
        hostelName: "Ganga Hostel",
        roomNumber: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.role === 'Student' && !formData.roomNumber.trim()) {
            setError("Room Number is required for students.");
            return;
        }

        setLoading(true);

        try {
            const response = await registerUser(formData);
            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            if(onLoginSuccess) {
                onLoginSuccess(data);
            }

            if(data.role === 'Warden')
            {
                navigate('/warden');
            } else {
                navigate('/student')
            }
        } catch (err) {
            console.error("Registration Failed:", err);
            const msg = err.response?.data || "Registration failed. please check your inputs"
            setError(typeof msg === "string" ? msg: "Registration failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center">
                    <span className="text-4xl">📝</span>
                    <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Join HostelHub to submit and manage hostel requests
                    </p>
                </div>
                {error && (
                    <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">{error}</div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label 
                        className="block text-sm font-medium text-slate-700 mb-1"
                        >Full Name</label>
                        <input type="text"
                        name="fullName"
                        required
                        value={formData.fullName} 
                        onChange={handleChange}
                        placeholder="eg: Rahul sharma"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                            <input type="email" name="email" required
                            value={formData.email} onChange={handleChange}
                            placeholder="eg: rahul@example.com"
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                         <input type="password" name="password" required
                            value={formData.password} onChange={handleChange}
                            placeholder="*******"
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">I am a:</label>
                            <select name="role" value={formData.role} onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Student">Student</option>
                                <option value="Warden">Warden</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Hostel</label>
                            <select name="hostelName" value={formData.hostelName}
                            onChange={handleChange} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                {
                                    HOSTEL_OPTIONS.map((hostel)=> (
                                        <option key={hostel} value={hostel}>{hostel}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {formData.role === "Student" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                            <input type="text" name="roomNumber" required
                            value={formData.roomNumber} onChange={handleChange}
                            placeholder="eg A-204"
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                        </div>
                    )}
                    <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors
                    cursor-pointer disabled:opacity-50 mt-2"
                    >
                        {loading ? "Registering..." : "Create an account"}
                    </button>
                </form>

                <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">Already have an account?("")
                    <Link to='/login' className="font-semibold text-indigo-600 hover:text-indigo-500">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;

