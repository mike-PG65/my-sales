import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { ReactFormState } from "react-dom/client";
import { GiCrossMark } from "react-icons/gi";

interface Categories {
  _id: string;
  name: string;
}

interface ProductForm {
  name: string;
  quantity: string;
  categoryId: string;
  price: string;
}

export const AddProductForm: React.FC = () => {
  const [product, setProduct] = useState<ProductForm>({
    name: "",
    quantity: 0,
    categoryId: "",
    price: "",
  });

  const [categories, setCategories] = useState<Categories[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { id } = useParams<{id : string}>(); // Extracting the `id` from the URL
  const navigate = useNavigate();



  const toggleButton = ()=>{
    setSuccess(null)
    setError(null)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/categories/categories"
        );

       

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching the categories", error);

        setError("Error fetching the categories");
      }
    };
    fetchCategories();
  }, []);


  useEffect(()=>{
    console.log("Extracted _id from URL:", id);
    if (id){
      const fetchProduct = async ()=>{
        try {
          const response =await axios.get(`http://localhost:7000/api/products/product/${id}`)

          console.log("Fetched product:", response.data);

          if (!response.data) {
            console.log("No data received from server");
          }
  

          setProduct(response.data)
          setLoading(false)
          
        } catch (error) {
          setError("unable to fetch product")
          setLoading(false)

          
        }
      }
      fetchProduct();
    }else{
      setLoading(false);
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (id){
      await axios.put(`http://localhost:7000/api/products/updateproduct/${id}`, product)
      setSuccess("Product updated sucessfully")
      // setProduct(response.data)
      setTimeout(()=>{
        setSuccess(null);
        navigate('/productslist')
      }, 2000)

     

      }else{
         await axios.post("http://localhost:7000/api/products/add-product", product);            
          setLoading(false);  
        setSuccess("Product addded successfully"); 
        // setProduct(response.data);
          setTimeout(()=>{
          setSuccess(null);
          navigate('/productslist')
        }, 2000)
        
        // setProduct({ name: "", quantity: "", categoryId: "", price: "" });
  
        
      }
    } catch (error) {
      console.error("Error saving the product", error);

      setError("Error saving the product");

    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-gray-50 h-[580px] flex flex-col items-center gap-6 py-4 justify-center relative">
     {product && (
      <form onSubmit={handleSubmit} className="bg-white w-180 p-6 rounded-2xl h-100">

      <h1 className="text-center py-4 font-semibold text-xl"> {id? 'Update Product' : 'Add Product'}</h1>
      {(success || error) && (
                <div className="absolute right-0 bg-green-100 p-8  rounded-lg mr-3 h-30 top-10">
                  <div className="relative h-full p-4">
      
                  <p className={`${error ? 'text-red-500' : 'text-green-600'  }  font-bold mb-4 text-lg`}>
                  {success || error}
                </p>
                <GiCrossMark className="absolute right-0 -top-5 cursor-pointer" onClick={toggleButton}/>
                  </div>
                </div>
              )}
     
        <div className="grid grid-cols-2 space-x-3 gap-12">
          <input
            type="text"
            value={product.name}
            placeholder="Enter product name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            className="border border-blue-100 py-2 px-4 rounded-xl"
          />

          <input
            type="text"
            value={product.quantity}
            placeholder="Enter product quantity"
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
            required
            className="border border-blue-100 py-2 px-4 rounded-xl"
          />

          <select
            name=""
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: e.target.value })
            }
            required
            className="border border-blue-100 py-2 px-4 rounded-xl"
          >
            <option value=""> Select Category </option>

            {categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
            placeholder="Price"
            className="border border-blue-100 py-2 px-4 rounded-xl"
          />

          <button type="submit" disabled={loading} className="col-span-2 bg-blue-200  py-2 rounded-full">
            {loading ?  (id ? "Updating..." : "Adding...") : (id ? "Update Product" : "Add Product")}
          </button>
        </div>
      </form>
     )}
    </div>
  );
};


// export default AddProductForm
