import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const getTickets = (hostelName) => {
    const params = hostelName ? { hostelName } : {}
    return apiClient.get('/tickets', { params });
}

export const createTicket = (ticketData) => apiClient.post('/tickets', ticketData);

export const updateTicket = (id, newStatus) => apiClient.patch(`/tickets/${id}/status`, { status: newStatus });

export const deleteTicket = (id) => apiClient.delete(`/tickets/${id}`);

export const updateWardenRemarks = (id, remarks) => apiClient.patch(`/tickets/${id}/remarks`, { remarks })

export default apiClient;