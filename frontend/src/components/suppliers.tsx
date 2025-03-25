import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface supplier{
    name:string
    phone: string
    product:string
    email:string
    address: string
}

export const AddSupplier:React.FC = ()=>{

const [supplier, setSupplier] = useState<supplier>(
    {
        name: "",
        phone: "",
        product: "",
        email: "",
        address: "",

    }
)
const [error, setError] = useState<string | null>()
const [sucess, setSucess] = useState<string | null>()
const [loading, setLoading] = useState<boolean>()
const navigate = useNavigate()

const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault()
    setError(null)
    setSucess(null)
    setLoading(true)
    try {

        const response =  await axios.post('http://localhost:7000/api/suppliers/addsupplier', supplier)
        console.log(supplier)
        setSucess(response.data.message)
        setLoading(false)
        
    } catch (error: any) {
        setError(error.response.data)
        
    }finally{
        setLoading(false)
    }

}


return(
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name=""
            onChange={(e)=>setSupplier({...supplier, name: e.target.value})}
            value={supplier.name}
            placeholder="Enter your name"
            required            
            />

            <input
             type="tel" 
             placeholder="Enter your phone number"
             value={supplier.phone}
             onChange={(e)=>setSupplier({...supplier, phone: e.target.value})}
             required
             />

             <input 
             type="text"
             value={supplier.product}
             onChange={(e)=>setSupplier({...supplier, product: e.target.value})}
             placeholder="Enter the product"
             required



             />
             <input 
             type="email" 
             value={supplier.email}
             onChange={(e)=>setSupplier({...supplier, email: e.target.value})}
             placeholder="Enter your email"
             required
             />
            <input 
            type="address" 
            value={supplier.address}
            onChange={(e)=>setSupplier({...supplier, address: e.target.value})}
            placeholder="Enter your address"
            required
            />
            
            <button className="bg-green-300 font-bold"> Add Supplier </button>
        </form>
    </div>
)

}