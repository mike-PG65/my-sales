// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate} from "react-router-dom";

// // Define a type for the form fields
// const Register: React.FC = () => {
  

//   // Error state
 
//   const [name, setName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setconfirmPassword] = useState('');

//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('')

//   const navigate = useNavigate()

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if(password !== confirmPassword){
//       setError("Passwords do not match !")
//     }
    
    
//     const user = {
//       name,
//       username,
//       email,
//       password,
//     }

//     try {

//       const response = await axios.post('http://localhost:3000/register', user);

//       setMessage(response.data.message) 
      
//       setTimeout(()=>{
//         navigate("/login");

//       }, 500)
     
  
      
//     } catch (error: any) {

//       if (error.response){
//         setMessage(error.response.data.detail || "Registration failed")
//         // console.log("Error details:", error.response.data)
//     }else{
//         setMessage("An error occured!")
//     }

      
//     }

    
//   };

//   return (
//     <div className="h-screen bg-gray-300 flex flex-col items-center justify-center">
      
//       <form onSubmit={handleSubmit} className="flex gap-12 flex-col bg-white h-fit w-96 rounded-2xl p-4 items-center">
        

//       <h2 className="font-semibold text-5xl">Register</h2>
//       {(message || error) && (
//           <div
//             className={`py-2 px-4 rounded-lg ${error ? 'bg-red-300' : 'bg-green-300'}`}
//           >
//             {message || error}
//           </div>
//         )}
//         {/* Username */}
//         <div className="gap-8 flex flex-col">

//           <div>
//             <input 
//             type="text"
//             placeholder="Enter your name"
//             onChange={(e) => setName(e.target.value)}
//             name="name"
//             value={name}
//             className="border border-gray-300 px-4 py-2 rounded-xl w-full"
//             required
            
//             />
//           </div>

//         <div>
        
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             placeholder="Enter your Username"
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="border border-gray-300 px-4 py-2 rounded-xl w-full"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             placeholder="Enter your Email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//              className="border border-gray-300 px-4 py-2 rounded-xl w-full"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             placeholder="Enter your Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//              className="border border-gray-300 px-4 py-2 rounded-xl w-full"
//           />
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChange={(e) => setconfirmPassword(e.target.value)}
//             required
//              className="border border-gray-300 px-4 py-2 rounded-xl w-full"
//           />
//         </div>

//         </div>
        

        
//         {/* Submit Button */}
//         <button type="submit" className="bg-blue-200 w-3/4 text center py-3 rounded-xl">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return; // Prevent the form from submitting if passwords do not match
    }

    const user = {
      name,
      username,
      email,
      password,
      confirmPassword
    };

    try {
      const response = await axios.post('http://localhost:7000/api/register', user);

      // Set success message and redirect after 3 seconds
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 500);

    } catch (error: any) {
      // Handle error response
      if (error.response) {
        // Show the message returned by the backend
        setError(error.response.data.message || "Registration failed!");
      } else {
        // Fallback error message
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-300 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex gap-12 flex-col bg-white h-fit w-96 rounded-2xl p-4 items-center">
        <h2 className="font-semibold text-5xl">Register</h2>

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
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl w-full"
            required
          />
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
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-200 w-3/4 text-center py-3 rounded-xl">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

