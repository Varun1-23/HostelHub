import { useState } from "react";
import { deleteTicket, updateTicket, updateWardenRemarks } from "../api/apiClient.js";

function TicketList({ tickets, loading, error, onTicketUpdated, isWarden = false }) {

    const [ remarksDrafts, setRemarksDrafts ] = useState({});
    const [ savingRemarksId, setSavingRemarksId ] = useState(null);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this ticket?')
        if (!confirmDelete) return;

    try {
        await deleteTicket(id);
        if (onTicketUpdated) {
            await onTicketUpdated();
        }
    } catch (err) {
        console.error('Failed to delete ticket:', err)
        alert('Could not delete ticket. Please try again.')
    }
};

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateTicket(id, newStatus);
            if(onTicketUpdated) {
                await onTicketUpdated();
            }
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Could not update status. please try again.');
        }
    }

    const handleSaveRemarks = async (id) => {
        const textToSave = remarksDrafts[id];
        if ( textToSave === undefined ) return;

        try {
            setSavingRemarksId(id);
            await updateWardenRemarks(id, textToSave);
            alert('Warden remarks saved successfully');
            if (onTicketUpdated) await onTicketUpdated();
        } catch (err) {
            console.error('Failed to save remarks:', err);
            alert('Could not save remarks. Please Try Again.')
        } finally {
            setSavingRemarksId(null);
        }
    }

    const getPriorityClasses = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20";
            case 'medium':
                return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20";
            case 'low':
                return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200 ring-slate-600/20";
        }
    };


    return ( 
        <section className="w-full">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{isWarden ? "Hostel Tickets (Warden View)" : "Existing Tickets"}</h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Total: {tickets.length}
                </span>
            </div>
            {loading && (
            <div className="flex items-center justify-center p-8 text-slate-500 text-sm">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Loading Tickets...
            </div>
            )}
            {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {error}
            </div>
            )}

            {!loading && !error && tickets.length === 0 && (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-500">
                    No tickets found. Submit the form above to add your first one.
                </p>
            </div>
            )}
            <div className="flex flex-col gap-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                            <div>
                                <h3 className="text-base font-semibold text-slate-900 tracking-tight">{ticket.title}</h3>
                                {ticket.hostelName && (
                                    <span className="inline-block mt-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                                        {ticket.hostelName}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {ticket.category && (
                                    <span 
                                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 ring-1 ring-inset ring-indigo-700/10"
                                    >
                                        {ticket.category}
                                    </span>
                                )}
                                {ticket.priority && (
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ring-1 ring-inset ${getPriorityClasses(
                                        ticket.priority
                                )}`}
                                    >
                                        {ticket.priority}
                                    </span>
                                )}
                                <select 
                                    value={ticket.status || 'Pending'}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-none ${
                                        ticket.status === "Resolved"
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                        : ticket.status === "In Progress"
                                        ? "bg-blue-50 text-blue-800 border-blue-200"
                                        : "bg-amber-50 text-amber-800 border-amber-200"
                                    }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                </select>
                            </div>    
                        </div>
                        {isWarden && (
                            <div className="mb-4 p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
                                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                                    Warden Internal Remarks
                                </label>
                                <textarea 
                                    rows={2}
                                    placeholder="Add Notes...."
                                    value={remarksDrafts[ticket.id] !== undefined ? remarksDrafts[ticket.id] : (ticket.wardenRemarks || '')}
                                    onChange={(e) => setRemarksDrafts({...remarksDrafts, [ticket.id]: e.target.value})}
                                    className="w-full text-xs p-2 bg-white border border-amber-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                />
                                <div className="flex justify-end mt-2">
                                    <button 
                                        type="button"
                                        disabled={savingRemarksId === ticket.id}
                                        onClick={() => handleSaveRemarks(ticket.id)}
                                        className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded cursor-pointer transition-colors disabled:opacity-50"
                                    >
                                        {savingRemarksId === ticket.id ? "Saving..." : "Save Remarks"}
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{ticket.description}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                            <span>Room Number: <strong className="font-semibold text-slate-700">{ticket.roomNumber}</strong></span>
                            {ticket.createdAt && (
                                <span>
                                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => handleDelete(ticket.id)}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-md transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </section>
    )
}

export default TicketList;