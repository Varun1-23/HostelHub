import { useState } from "react";
import { createTicket } from "../api/apiClient.js";

function TicketForm({ onTicketCreated}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        roomNumber: '',
        category: 'General',
        priority: 'Medium'
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.roomNumber) {
            alert("please fill in all fields");
            return;
        }
        setError(null);

        try {
            setSubmitting(true);
            await createTicket(formData);
            setFormData({ title: '', description: '', category: 'General', roomNumber: '', priority: 'Normal'});
            if (onTicketCreated) {
                await onTicketCreated();
            }
        } catch (err) {
            console.error(err);
            alert('failed to submit ticket. Check CORS or console errors');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="w-full p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">Submit New Ticket</h2>
            {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="eg. - Leaking tap"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue in detail..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">            
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category: </label>
                    <select name="category" value={formData.category} onChange={handleChange} 
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="General">General</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Cleaning">Cleaning</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority: </label>
                    <select name="priority" value={formData.priority} onChange={handleChange} 
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room Number: </label>
                    <input 
                    type="text" 
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="eg. A-204"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                </div>  


                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                        >
                        {submitting ? 'Submitting...' : 'Create Ticket'}
                    </button>
             </form>
            </section>
    )
}

export default TicketForm;