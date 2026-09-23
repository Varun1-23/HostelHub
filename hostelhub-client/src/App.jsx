import { useState, useEffect } from 'react';
import { getTickets, createTicket } from './api/apiClient';

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roomNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadTickets = async () => {
    try {
      setloading(true);
      setError('');
      const response = await getTickets();
      setTickets(response.data);
    } catch(err){
      console.error(err);
      setError('Failed to fetch ticekts. Make sure the backend API is running.');
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.title || !formData.description || !formData.roomNumber) {
      alert('Please fill in all fields.');
      return;
    }

    try{
      setSubmitting(true);
      await createTicket(formData);
      setFormData({ title: '', description: '', roomNumber: '' });  // Reset form on success
      await loadTickets(); // Refresh list from database
    } catch (err) {
      console.error(err);
      alert('Failed to submit ticket. check CORS or console errors.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1>Hostel Maintenance Portal</h1>

      {/* Ticket Submission Form */}
      <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
        <h2>Raise a New Ticket</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>Title</label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Leaking tap"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box'}}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>Room Number</label>
            <input 
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g., A-204"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box'}}
              required
              />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>Description</label>
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail...."
              rows={3}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '10px 16px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
            >
              {submitting ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>
      </section>

      {/* Tickets Display */}
      <section>
        <h2>Existing Tickets</h2>
        {loading && <p>Loading Tickets...</p>}
        {error && <p style ={{ color: 'red' }}>{error}</p>}

        {!loading && !error && tickets.length === 0 && (
          <p>No tickets ffound. Submit the form above to add your first one.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {tickets.map((ticket)=>(
            <div
            key={ticket.id}
            style={{
              border: '1px solid #e1e1e1',
              borderRadius: '6px',
              padding: '16px',
              backgroundColor: '#fbfbfb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>{ticket.title}</h3>
                <span 
                  style={{
                    backgroundColor: ticket.status === 'Resolved' ? '#e6f4ea' : '#fef7e0',
                    color: ticket.status === 'Resolved' ? '#137333' : '#b06000',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {ticket.status || 'Pending'}
                </span>
              </div>
              <p style={{ margin: '4px 0', color: '#555' }}>{ticket.description}</p>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#888'}}>
                <span>Room: <strong>{ticket.roomNumber}</strong></span>
                {ticket.createdAt && (
                  <span style={{ marginLeft: '16px' }}>
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;