import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactFormState } from "react-dom/client";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:7000/api/products/add-product",
        product
      );

      setLoading(false);

      setSuccess("Product addded successfully");


      setTimeout(()=>{
        setSuccess(null);
      }, 2000)
      
      setProduct({ name: "", quantity: "", categoryId: "", price: "" });
    } catch (error) {
      console.error("Error adding the product", error);

      setError("Error Adding the product");
    }
  };

  return (
    <div className="bg-gray-50 h-[580px] flex flex-col items-center gap-6 py-4 justify-center">
     

      

      <form onSubmit={handleSubmit} className="bg-white w-180 p-6 rounded-2xl h-100">

      <h1 className="text-center py-4 font-semibold text-xl"> Add Product</h1>
      {success && <p style={{ color: "green" }} className="text-center py-4">{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};


// export default AddProductForm
