import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
// import { useState } from "react";
import Sidebar from "./home";



const Navbar = () => {

    const location = useLocation();

    // const [sidebaropen, setsidebaropen] = useState(false);

    // const togglesidebar = ()=>{
    //     setsidebaropen(prevState => !prevState)
    // }


    return (
        <nav className="bg-white flex justify-between py-3 px-4 items-center w-full sticky top-0 z-10 ">
            <div className="flex md:flex-row justify-between md:w-1/2 flex-row-reverse w-full">
                <div className="text-3xl onClick={togglesidebar}">
                    <FiAlignJustify />
                </div>
                <div className="font-semibold text-xl">
                    STYLEHIVE
                </div>
            </div>
            <div className="md:w-[40%] md:flex md:justify-end gap-12 hidden md:items-center">
                <ul className=" flex gap-8">
                    <li className="cursor-pointer"> About Us</li>
                    <li className="cursor-pointer"> Blog </li>
                    <li className="cursor-pointer"> FAQ </li>
                </ul>
                <div className="">
                    {/* <i className="fa-solid fa-user cursor-pointer"></i>
                <i class="fa-solid fa-cart-shopping "></i>  */}


                    {location.pathname !== "/login" && (

                        <Link to="/login">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-300">
                                <button type="submit" className=""> Login  </button>
                                <CiLogin className="text-2xl" />
                            </div>
                        </Link>

                    )}


                </div>

                {/* {sidebaropen && Sidebar} */}
            </div>

        </nav>
    )
}

export default Navbar;

 