import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import TicketForm from "./pages/CreateTicket/TicketForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TicketsPage from "./pages/TicketPage/TicketPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/tickets" element={<TicketsPage />} />
          <Route exact path="/ticket/sell" element={
            <ProtectedRoute>
              <TicketForm />
            </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
