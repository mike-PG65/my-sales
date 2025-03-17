import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Userlist: React.FC = ()=>{

    interface User {
        id: number;
        name: string;
        email: string;
        username: string;
        // Add any other properties as per your DB schema
      }
    const navigate =useNavigate();
    const [users, setusers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [err, setErr] = useState<string | null>(null)
    


    useEffect( () => {

        const fetchusers = async ()=>{
        try {
            
                const response = await axios.get('http://localhost:7000/api/users')

                setusers(response.data);
                setLoading(false);

            }
            
         catch (error) {
            setErr("Error fetching the users")
            setLoading(false)

            
        };
    };
        
        fetchusers();
    }, []);

   

    if (loading){
        return <div> Loading .....</div>
    }
    
    if(err){
        return<div> {err}</div>
    }
    return(
        <div className="w-100% h-100% flex gap-6 items-center flex-col bg-gray-100 relative">
          
          <h2 className="font-semibold text-xl">User List</h2>
        <Link to="/Adduser" >
      <button className="absolute right-5 top-4 bg-blue-300 py-2 px-4 rounded-xl"> Add User </button>
      </Link>
          
       
        <table className=" table-auto w-[90%]">
          <thead className="">
            <tr className="bg-gray-50 border-b-2 border-gray-200 ">
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Name</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Email</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Username</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center"> Actions </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <td className="p-6 text-sm text-gray-700 text-center">{user.name}</td>
                <td className="p-6 text-sm text-gray-700 text-center">{user.email}</td>
                <td className="p-6 text-sm text-gray-700 text-center">{user.username}</td>
                <td className="flex gap-2 justify-center">

                    <Link to={`/updateuser/${user.id}`}>
                    <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                    Update

                    </button>
                    </Link>         
                   
                    

                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg"
                >
                  Delete
                </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Userlist



