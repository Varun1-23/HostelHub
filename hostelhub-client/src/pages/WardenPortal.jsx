import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getTickets } from "../api/apiClient.js";
import TicketList from "../components/TicketList";

const HOSTEL_OPTIONS = [
    "All hostels",
    "kavery hostel",
    "godavari hostel",
    "Yamuna Hostel"
]

function WardenPortal( { user} ) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    const [selectedHostel, setSelectedHostel] = useState(user?.hostelName || "Ganga Hostel")

    const loadTickets = async () => {
        try {
            setLoading(true);
            setError("");
            const hostelQuery = selectedHostel === "All hostels" ? "" : selectedHostel;
            const response = await getTickets(hostelQuery);
            setTickets(response.data);
        } catch (error) {
            console.error("Failed to load tickets", error);
            setError("Failed to fetch tickets. please check if the backend is running.");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        loadTickets()
    }, [selectedHostel]);

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-200 pb-5 gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 mb-2">
                        Official Administration Portal
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                        Warden Management Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Welcome, Warden <span className="font-semibold text-slate-800">{user?.fullName}</span>. Inspect Complaints, update repair statuses, and maintain internal logs.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 border border-slate-200 rounded-xl shadow-xs self-start sm:self-auto">
                    <label className="text-xs font-bold text-slate-700">Filter Hostel</label>
                    <select 
                    value={selectedHostel} 
                    onChange={(e) => setSelectedHostel(e.target.value)}
                    className="px-3 py-1.5 text-sm font-medium border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        {HOSTEL_OPTIONS.map((hostel) => (
                            <option key={hostel} value={hostel}>{hostel}</option>
                        ))}
                    </select>
                </div>
            </header>

            <main>
                <TicketList
                    tickets={tickets}
                    loading={loading}
                    error={error}
                    onTicketUpdated={loadTickets}
                    isWarden={true}
                />
            </main>
        </div>
    );
}

export default WardenPortal;