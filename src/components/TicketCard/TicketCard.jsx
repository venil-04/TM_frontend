import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h2>{ticket.trainName}</h2>
        <span>#{ticket.trainNumber}</span>
      </div>
      <div className="ticket-info">
        <p><strong>From:</strong> {ticket.from.toUpperCase()}</p>
        <p><strong>To:</strong> {ticket.to.toUpperCase()}</p>
        <p><strong>Departure:</strong> {new Date(ticket.departureDate).toLocaleDateString()} at {ticket.departureTime}</p>
        <p><strong>Seat:</strong> {ticket.seatNumber}</p>
        <p><strong>Price:</strong> ₹{ticket.price}</p>
        <p className={`ticket-status ${ticket.status}`}>{ticket.status.toUpperCase()}</p>
      </div>
      <div className="ticket-user">
        <p>Created by: <strong>{ticket.userId.name}</strong> ({ticket.userId.email})</p>
        <small>Listed on: {new Date(ticket.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default TicketCard;
