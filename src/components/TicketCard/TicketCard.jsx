import React from "react";
import "./TicketCard.css";

const TrainTicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h2 className="train-name">{ticket.trainName}</h2>
        <span className="train-number">#{ticket.trainNumber}</span>
      </div>
      <div className="ticket-body">
        <div className="route">
          <span className="from">{ticket.from.toUpperCase()}</span>
          <span className="arrow">➝</span>
          <span className="to">{ticket.to.toUpperCase()}</span>
        </div>
        <div className="details">
          <div className="info">
            <label>Date:</label>
            <span>{new Date(ticket.departureDate).toLocaleDateString("en-GB")}</span>
          </div>
          <div className="info">
            <label>Seat:</label>
            <span>{ticket.seatNumber}</span>
          </div>
          <div className="info">
            <label>Price:</label>
            <span>₹{ticket.price}</span>
          </div>
          <div className={`info status ${ticket.status}`}>
            <label>Status:</label>
            <span>{ticket.status}</span>
          </div>
        </div>
      </div>
      <div className="ticket-footer">
        <p>Passenger: {ticket.userId.name} ({ticket.userId.email})</p>
        <p className="id">Booking ID: {ticket._id}</p>
      </div>
    </div>
  );
};

export default TrainTicketCard;
