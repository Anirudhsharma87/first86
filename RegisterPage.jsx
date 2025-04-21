import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./RegisterPage.css";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "https://localhost:44311/Login/Regs";
            const response = await axios.post(url, formData);

            if (response.status === 200) {
                setMessage("Registration Successful!");
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
            } else {
                setMessage("Registration Failed!");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="register-container">
                <h2>Register</h2>
                {message && (
                    <p
                        className={`message ${message.includes("Successful") ? "success" : "error"
                            }`}
                    >
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="login-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                       // type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="login-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type="submit" className="login-button">
                        Register
                    </button>
                </form>

                <button className="login-btn" onClick={() => navigate("/login")}>
                    Click Here to Login
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;
