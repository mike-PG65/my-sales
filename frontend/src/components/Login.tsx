import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error or message
    setError('');
    setMessage('');

    // Password mismatch check before making the API call

    const user = {
      username,
      password,
     
    };

    try {
      const response = await axios.post('http://localhost:7000/api/login', user);

      // Set success message and redirect after 3 seconds
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 500);

    } catch (error: any) {
      // Handle error response
      if (error.response) {
        // Show the message returned by the backend
        setError(error.response.data.message || "Login failed!");
      } else {
        // Fallback error message
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-300 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex gap-12 flex-col bg-white h-fit w-96 rounded-2xl p-4 items-center">
        <h2 className="font-semibold text-5xl">Login</h2>

        {/* Show either error or success message */}
        {(message || error) && (
          <div
            className={`py-2 px-4 rounded-lg ${error ? 'bg-red-300' : 'bg-green-300'}`}
          >
            {message || error}
          </div>
        )}

        {/* Form fields */}
        <div className="gap-8 flex flex-col w-full">
          
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your Username"
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl w-full"
            required
          />
          
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl w-full"
            required
          />
          
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-200 w-3/4 text-center py-3 rounded-xl">
        Login
        </button>
      </form>
    </div>
  );
};

export default Login;

