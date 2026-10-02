import { useState, useEffect } from "react";
import { getTickets } from "../api/apiClient.js";
import TicketForm from "../components/TicketForm.jsx";
import TicketList from "../components/TicketList.jsx";

function StudentPortal({ user })
{
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");

    const loadTickets = async () => {
        try {
            setLoading(true);
            setError("")
            const response = await getTickets(user?.hostelName || "")
            setTickets(response.data)
        } catch (error) {
            console.error("Failed to load tickets:", err);
            setError("Failed to fetch tickets. Please check if the backend is running.");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        loadTickets();
    }, [user?.hostelName]);


    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
            <header className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                        Student Maintenace Desk
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Welcome, <span className="font-semibold text-slate-800">{user?.fullName}</span>
                        Report Issues and track repairs for {""}
                        <span className="font-semibold text-indigo-600">{user?.hostelName}</span>
                        (Room: {user?.roomNumber || "N/A"})
                    </p>
                </div>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <section className="lg:col-span-5 lg:sticky lg:top-24">
                    <TicketForm onTicketCreated={loadTickets}/>
                </section>

                <section className="lg:col-span-7">
                    <TicketList
                    tickets={tickets}
                    loading={loading}
                    error={error}
                    onTicketUpdated={loadTickets}
                    isWarden={false}
                    />
                </section>
            </main>
        </div>
    )
}

export default StudentPortal;

