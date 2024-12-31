import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/AxiosInstance";
import TicketCard from "../../components/TicketCard/TicketCard";
import "./TicketPage.css";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get("/tickets");
        setTickets(response.data);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="tickets-page">
      <h1 className="tickets-title">Available Tickets</h1>
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
