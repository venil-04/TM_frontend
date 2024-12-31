import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import './Login.css'
import { AuthContext } from "../../context/AuthContext.jsx";

const Login = () => {
    const navigate = useNavigate();

    const authentication = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (isLogin) {
                // Login API request
                const response = await axios.post("https://tm-backend-dhsh.onrender.com/api/users/login", {
                    email: formData.email,
                    password: formData.password,
                });

                // Store token in localStorage
                // localStorage.setItem("token", );
                authentication.login(response.data.token)

                // Redirect to the dashboard or home page
                navigate("/");
            } else {
                // Registration API request
                const response = await axios.post("https://tm-backend-dhsh.onrender.com/api/users/register", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                });

                // Show success message and switch to login
                alert("Registration successful! Please log in.");
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.response ? error.response.data.error : error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {!isLogin && (
                        <input
                            type="text"
                            name="phone"
                            placeholder="Mobile Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    )}
                    <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                {error && <p className="error">{error}</p>}
                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
