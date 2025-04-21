import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './LoginPage.css';
import axios from 'axios';
import Footer from './Footer'; // Import Footer Component

function LoginPage() {
    const [user, setuser] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        try {
            let url = "https://localhost:44311/Login/log";
            let obj = { user, password };
            data = await getData(url, obj);
            if (data === "Login Successful") {
                navigate("/firstpage");
            }
        } catch (error) {
            alert(data || error.message);
        }
    };

    async function getData(url, obj) {
        try {
            const response = await axios.post(url, obj);
            return response.data;
        } catch (error) {
            console.error("Error details:", error);
            throw new Error("Data Loading Error");
        }
    }

    return (
        <div className="hcontainer">
            <header className="header"></header>
            <div className="container">
                <div className="right">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <input
                            type="user"
                            placeholder="user"
                            className="login-input"
                            value={user}
                            onChange={(e) => setuser(e.target.value)}
                            required
                        />
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle type
                                placeholder="Password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <button type="submit" className="login-button">Login</button>
                        <button type="button" className="register-button" onClick={() => navigate('/register')}>Registration</button>

                    </form>
                </div>
            </div>
            <Footer /> {/* Footer added here */}
        </div>
    );
}

export default LoginPage;
