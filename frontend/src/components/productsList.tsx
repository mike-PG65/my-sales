import React, { useState, useEffect }from "react";
import axios from "axios";
import { GiCrossMark } from "react-icons/gi";

import { Link } from "react-router-dom";

interface Category {
    _id: string;
    name: string;
  }

interface Product{
    _id:string
    name: string
    quantity: string
    categoryId:Category | null
    price: string
}

export const ProductsList:React.FC = ()=>{
// const [success, setSuccess] = useState<string | null >(null)
const [products, setProducts] = useState<Product[]>([])
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<string | null> (null)
const [success, setSuccess] =useState<string | null>(null)


const toggleButton =()=>{
  setSuccess(null);
  setError(null)
}


useEffect(()=>{
    const fetchProducts = async ()=>{
    

        try {
    
            const response = await axios.get('http://localhost:7000/api/products/products')
    
            setProducts(response.data)
            
        } catch (error) {
    
            console.error("Error fetching products", error)
            setError("Error fetching products")
            
        } finally{
            setLoading(false);
        }
    };
    fetchProducts();
},[]);


const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return; // Stop if user cancels

    try {
      await axios.delete(`http://localhost:7000/api/products/deleteproduct/${id}`);
      setProducts(products.filter((product) => product._id !== id)); // Remove from UI
      setSuccess("Product Deleted Sucessfully!!")
      // setTimeout(()=>{
      //   setSuccess(null)
      // }, 1000);
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product.");
    }
  };

if (loading) return <p>Loading products...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;


return(
    <div className="relative mt-6">
      <h1 className="text-xl font-semibold text-center">Product List</h1>
      <Link to={"/Addproduct"}>
      <button className="absolute right-4 bg-green-200 px-4 py-2 rounded-full font-medium text-white"> Add Product </button>
</Link>
      {(success || error) && (
          <div className="absolute right-0 bg-green-100 p-8  rounded-lg mr-3 h-30">
            <div className="relative h-full p-4">

            <p className={`${error ? 'text-green-600' : 'text-red-500'}  font-bold mb-4 text-lg font-(family-name:--)`}>
            {success || error}
          </p>
          <GiCrossMark className="absolute right-0 -top-5 cursor-pointer" onClick={toggleButton}/>
            </div>
          </div>
        )}
      {products.length === 0 ? (
        <p className="text-2xl font-bold text-red-500">No products available.</p>
      ) : (

       
        <table className=" table-auto w-screen mt-15">
          <thead className="">
            <tr className="bg-gray-50 border-b-2 border-gray-200 ">
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Name</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Quantity</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Category</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center"> Price  </th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center"> Actions  </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className={`py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                <td className="p-6 text-sm text-gray-700 text-center">{product.name}</td>
                <td className="p-6 text-sm text-gray-700 text-center">{product.quantity}</td>
                <td className="p-6 text-sm text-gray-700 text-center">{product.categoryId?.name}</td>
                <td className="p-6 text-sm text-gray-700 text-center">Ksh. {product.price}</td>
                <td className="text-center">

                    <Link to={`/updateproduct/${product._id}`}>
                    <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg mr-6">
                    Update

                    </button>
                    </Link>  


                    <button
                  className="px-4 py-2 text-white bg-red-500 rounded-lg" onClick={() => handleDelete(product._id)}>
                   Delete

                    </button>        
                   
                    

               

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}





    </div>
)

}





