
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBox,
  FaTachometerAlt,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";


const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setisDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setisDropdownOpen(isDropdownOpen == dropdown ? null : dropdown);
  };

  return (
    <div className={`sidebar bg-blue-200 h-screen w-64`}>
      {/* <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button> */}

      {}
      <nav>
        <ul className="px-4 flex flex-col gap-20 py-12">
          <li className="">
            <Link to="/" className="flex gap-2">
              <FaTachometerAlt className="text-2xl" />{" "}
              <span className="font-semibold">Dashboard</span>
              {/* <p>Dashboard</p> */}
            </Link>
          </li>
          {/* <li>
            <Link to="/users" className="flex gap-2">
              <FaUsers className="text-2xl"/> <span className="font-semibold">Users</span>
            </Link>
          </li> */}
          <li className="relative">
            <button
              className="flex gap-2 items-center"
              onClick={() => toggleDropdown("users")}
            >
              <FaUsers className="text-2xl" />
              <span className="font-semibold">Users</span>
            </button>
            {isDropdownOpen === "users" && (
              <ul className="px-4 py-3 absolute left-0 mt-2 bg-white shadow-2xl rounded-lg w-48 z-10">
                <li>
                  <Link
                    to="/users"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Users List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Adduser"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Add User
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              onClick={() => toggleDropdown("products")}
              className="flex gap-3"
            >
              <FaBox className="text-2xl" />{" "}
              <span className="font-semibold">Products</span>
            </button>

            {isDropdownOpen === "products" && (
              <ul className="absolute bg-white rounded-lg px-4 py-3 left-0 mt-2 shadow-2xl w-48 z-10">
                <li>
                  <Link to="/products" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-200">
                    Product List
                  </Link>
                </li>

                <li>
                  <Link to="/Addproduct" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"> Add product</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button onClick={() => toggleDropdown("suppliers")} className="flex gap-3">
              <FaClipboardList className="text-2xl" />{" "}
              <span className="font-semibold">Suppliers</span>
            </button>

            {isDropdownOpen === "suppliers" && (
              <ul className="absolute bg-white rounded-lg px-4 py-3 left-0 mt-2 shadow-2xl w-48 z-10">
                <li>
                  <Link to="/suppliers" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-200">
                    Suppliers list
                  </Link>
                </li>

                <li>
                  <Link to="/suppliers/add" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
                    Add Supplier
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* <li>
            <Link to="/settings" className="flex gap-2">
              <FaCog className="text-2xl" />{" "}
              <span className="font-semibold">Settings</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
