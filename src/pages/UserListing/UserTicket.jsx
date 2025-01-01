import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/AxiosInstance";

import "./UserTicket.css";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get("/tickets/user");
        setTickets(response.data.tickets);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await axiosInstance.delete(`/api/tickets/${ticketId}`);
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
 
        alert("Ticket deleted successfully!");
      } catch (error) {
        alert("Failed to delete ticket");
      }
    }
  };

  const handleEdit = (ticketId) => {
    // Redirect user to the ticket edit page with the ticket ID
    window.location.href = `/ticket/edit/${ticketId}`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-tickets-container">
      <h1>Your Tickets</h1>
      {tickets?.length === 0 ? (
        <p className="no-tickets">You have no tickets listed.</p>
      ) : (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div className="user-ticket-card" key={ticket._id}>
              <h3>{ticket.trainName}</h3>
              <p><strong>Train Number:</strong> {ticket.trainNumber}</p>
              <p><strong>From:</strong> {ticket.from} <strong>To:</strong> {ticket.to}</p>
              <p><strong>Departure:</strong> {ticket.departureDate} at {ticket.departureTime}</p>
              <p><strong>Seat:</strong> {ticket.seatNumber}</p>
              <p><strong>Price:</strong> Rs. {ticket.price}</p>
              <div className="ticket-actions">
                <button className="edit-btn" onClick={() => handleEdit(ticket._id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(ticket._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTickets;