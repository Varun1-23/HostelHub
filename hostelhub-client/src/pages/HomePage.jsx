import { useState, useEffect } from "react";
import { getTickets } from "../api/apiClient.js";
import TicketForm from "../components/TicketForm.jsx";
import TicketList from "../components/TicketList.jsx";

function HomePage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    const loadTickets = async () => {
        try {
            setLoading(true);
            setError('')
            const response = await getTickets();
            setTickets(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch tickets. Make sure the backend API is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="text-center sm:text-left border-b border-slate-200 pb-5">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"> 
                        Hostel Maintenance Portal
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Submit, track, and manage hostel room maintenance and repair requests.
                    </p>
                </header>
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <section className="lg:col-span-5 lg:sticky lg:top-8">
                        <TicketForm onTicketCreated={loadTickets}/>
                    </section>
                <section className="lg:col-span-7">
                    <TicketList 
                        tickets={tickets} 
                        loading={loading} 
                        error={error} 
                        onTicketUpdated={loadTickets}/>  
                </section>
                </main>       
            </div>
        </div>
    );
}

export default HomePage;