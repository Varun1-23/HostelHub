import { Link, useNavigate } from "react-router-dom";

function Navbar( {user, onLogout} ) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        if (onLogout) {
            onLogout();
        }
        navigate('/login');
    }

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🏢</span>
                        <Link to={user ? (user.role === "Warden" ? "/warden" : "/student"): "/login"} className="text-xl font-bold tracking-tight text-slate-900">
                            Hostel<span className="text-indigo-600">Hub</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="text-right hidden sm:block">
                                    <div className="text-xs font-semibold text-slate-800">
                                        {user.fullName}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                        {user.role === "Warden" ? "Warden" : "Student"} - {user.hostelName}
                                    </div>
                                </div>
                                <Link 
                                to={user.role === "Warden" ? "/warden" : "/student"}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogoutClick}
                                    className="px-3 py-1.5 text-xs font-semibold rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
                                        Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"
                                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    to='/register'
                                    className="px-3.5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-xs"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;