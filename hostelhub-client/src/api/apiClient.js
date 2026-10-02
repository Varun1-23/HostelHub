import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Automatic Interceptor: attaches Jwt token from localstorage to every request

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token)
    {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

// Auth EndPoints

export const registerUser = (userData) => apiClient.post('/auth/register', userData);
export const loginUser = (credentials) => apiClient.post('/auth/login', credentials);

// Ticket Endpoints

export const getTickets = (hostelName) => {
    const params = hostelName ? { hostelName } : {};
    return apiClient.get('/tickets', { params });
}

export const createTicket = (ticketData) => apiClient.post('/tickets', ticketData);

export const updateTicket = (id, newStatus) => apiClient.patch(`/tickets/${id}/status`, { status: newStatus });

export const deleteTicket = (id) => apiClient.delete(`/tickets/${id}`);

export const updateWardenRemarks = (id, remarks) => apiClient.patch(`/tickets/${id}/remarks`, { remarks })

export default apiClient;