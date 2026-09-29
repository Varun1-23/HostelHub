import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🏢</span>
                        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
                            Hostel<span className="text-indigo-600">Hub</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                isActive("/")
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                            Student Portal
                        </Link>
                        <Link
                            to="/warden"
                            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                                isActive("/warden")
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                            Warden Portal
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;