import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./TicketForm.css"
import axiosInstance from "../../config/AxiosInstance";

const TicketForm = () => {
  const navigate = useNavigate();
  const authentication = useContext(AuthContext);
  const [ticketData, setTicketData] = useState({
    trainNumber: "",
    trainName: "",
    departureDate: "",
    departureTime: "",
    from: "",
    to: "",
    seatNumber: "",
    price: "",
  });

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authentication.isAuthenticated) {
      alert("You must be logged in to list a ticket.");
      navigate("/login");
      return;
    }

    try {
        const response = await axiosInstance.post("/tickets/create", ticketData);
    
        if (response.status === 200 || response.status === 201) {
          alert("Ticket listed successfully!");
        } else {
          alert("Failed to list ticket!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while listing the ticket!");
      }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
    <label>Train Number</label>
    <input
      type="text"
      name="trainNumber"
      placeholder="Enter Train Number"
      value={ticketData.trainNumber}
      onChange={handleChange}
      required
    />

    <label>Train Name</label>
    <input
      type="text"
      name="trainName"
      placeholder="Enter Train Name"
      value={ticketData.trainName}
      onChange={handleChange}
      required
    />

    <label>Departure Date</label>
    <input
      type="date"
      name="departureDate"
      value={ticketData.departureDate}
      onChange={handleChange}
      required
    />

    <label>Departure Time</label>
    <input
      type="time"
      name="departureTime"
      value={ticketData.departureTime}
      onChange={handleChange}
      required
    />

    <label>From</label>
    <input
      type="text"
      name="from"
      placeholder="Enter Starting Station"
      value={ticketData.from}
      onChange={handleChange}
      required
    />

    <label>To</label>
    <input
      type="text"
      name="to"
      placeholder="Enter Destination Station"
      value={ticketData.to}
      onChange={handleChange}
      required
    />

    <label>Seat Number</label>
    <input
      type="text"
      name="seatNumber"
      placeholder="Enter Seat Number"
      value={ticketData.seatNumber}
      onChange={handleChange}
      required
    />

    <label>Price</label>
    <input
      type="number"
      name="price"
      placeholder="Enter Ticket Price"
      value={ticketData.price}
      onChange={handleChange}
      required
    />

    <button type="submit">List Ticket</button>
  </form>
  );
};

export default TicketForm;
