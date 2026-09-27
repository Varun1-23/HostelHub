import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const getTickets = () => apiClient.get('/tickets');

export const createTicket = (ticketData) => apiClient.post('/tickets', ticketData);

export const updateTicket = (id, newStatus) => apiClient.patch(`/tickets/${id}/status`, { status: newStatus });

export const deleteTicket = (id) => apiClient.delete(`/tickets/${id}`);

export default apiClient;