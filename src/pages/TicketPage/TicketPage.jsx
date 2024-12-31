import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/AxiosInstance";
import TicketCard from "../../components/TicketCard/TicketCard";
import "./TicketPage.css";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get("/tickets");
        setTickets(response.data);
        setFilteredTickets(response.data); // Initially show all tickets
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = tickets.filter((ticket) => {
      return (
        ticket.trainNumber.toLowerCase().includes(term) ||
        ticket.trainName.toLowerCase().includes(term) ||
        ticket.from.toLowerCase().includes(term) ||
        ticket.to.toLowerCase().includes(term) ||
        new Date(ticket.departureDate).toLocaleDateString().includes(term)
      );
    });

    setFilteredTickets(filtered);
  };

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="tickets-page">
      <h1 className="tickets-title">Available Tickets</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by train number, name, date, station..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="tickets-grid">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <div className="no-results">No tickets found.</div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
