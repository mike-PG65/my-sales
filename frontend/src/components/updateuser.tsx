import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface User {
  id?: number;
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

// interface RouteParams {
//   id: string; // 'id' will be passed as a string in URL params
// }

export const UpdateUserPage: React.FC = () => {
  // State for storing user data
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setmesage] = useState('')

  // State for managing loading/error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{id : string}>(); // Extracting the `id` from the URL

  // Fetch user data (for example, from an API)
  useEffect(() => {

    if (id){
        const fetchUser = async () => {
            try {
                // Make an API request to get the user data by id
                const response = await axios.get(`http://localhost:7000/api/user/${id}`);
                setUser(response.data); // Setting user data into state
                setLoading(false); // Finished loading
              } catch (err) {
                setError("Failed to load user data.");
                setLoading(false);
              }
            }
              fetchUser();  
    
        }else{
            setLoading(false)
        }
        
  }, [id]);


  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle confirm password field change
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission to update user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

        if(id){

            await axios.put(`http://localhost:7000/api/updateuser/${id}`, user);
      setmesage("User updated successfully!");
        setTimeout(()=>{
            navigate('/users');

        }, 2000)
        }else{
            await axios.put(`http://localhost:7000/api/usersadd`, user);
            setmesage("User added successfully!");
              setTimeout(()=>{
                  navigate('/users');
      
              }, 2000)

        }
      // Make an API request to update user data
      

      
       // Reset confirm password after successful update
    } catch (err) {
        setError("Failed to update user.");
    }
  };

  // Show loading state or error if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 h-full flex flex-col items-center gap-6 py-4 relative">
        
      <h2 className="font-semibold text-2xl">{id? "Update User" : "Add New User"}</h2>
      <Link to="/users" >
            <button className="absolute right-5 top-4 bg-blue-300 py-2 px-4 rounded-xl"> Users List </button>
            </Link>
      
      {user && (
        <form onSubmit={handleSubmit} className="bg-white grid grid-cols-2 space-x-3 w-180 p-6 rounded-2xl">
            {(message || error ) && (
          <div
            className={`py-2 px-4 rounded-lg ${error ? 'bg-red-300' : 'bg-green-300'} col-span-2`}
          >
            {message || error}
          </div>
        )}
            
        <div className="flex flex-col gap-3 py-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
            className="border border-gray-100 p-1 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3 py-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="border border-gray-100 p-1 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3 py-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            className="border border-gray-100 p-1 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3 py-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="border border-gray-100 p-1 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3 py-3">
          <label>Confirm Password</label>
          <input
            type="password"
            value={user.confirmPassword}
            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
            required
            className="border border-gray-100 p-1 rounded-xl"
          />
        </div>

        

        <button type="submit" className="bg-blue-200  py-2 rounded-full col-span-2">{id? "Update User" : "Add New User"}</button>
      </form>
      )}
      
    </div>
  );
};


