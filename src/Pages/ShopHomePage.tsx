import React from "react";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {PAGE_NUMBER} from "../atoms/ItemsPerPage.tsx";
import {ROUTES} from "../Routes/Routes.tsx";
import {Users} from "../Models/Users.tsx";
import {UserTypeAtom} from "../atoms/UserTypeAtom.tsx";

const HomePage = () => {
    const [firstPage] = useAtom(PAGE_NUMBER);
    const [,setUser] = useAtom(UserTypeAtom);
    const navigate =  useNavigate();
    const saveUser=(user:Users)=>{
        localStorage.setItem("loggedUser",user);
        setUser(user);
    }

    return (
        <div className="min-h-screen bg-lightBlue-100 flex flex-col items-center justify-center">
            {/* Shop Description */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to the Paper Shop!
                </h1>
                <p className="text-lg text-gray-700">
                    We offer a wide selection of high-quality paper products for all your
                    needs, from office supplies to craft materials. Whether you're an
                    admin managing inventory or a customer browsing our collection, we've
                    got you covered!
                </p>
            </div>

            {/* Card Components */}
            <div className="flex space-x-8">
                {/* Admin Card */}
                <div className="card w-80 bg-white shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl text-gray-800">Admin</h2>
                        <p className="text-gray-600">
                            Manage products, inventory, and orders from the admin panel.
                        </p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={()=>{navigate(`/api/admin/${firstPage}`);saveUser(Users.admin)}}>Go to Admin</button>
                        </div>
                    </div>
                </div>

                <div className="card w-80 bg-white shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl text-gray-800">Customer</h2>
                        <p className="text-gray-600">
                            Browse our paper collection and place orders easily.
                        </p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-secondary" onClick={()=>{navigate(`/api/papers/${firstPage}`);saveUser(Users.customer)}}>Go to Customer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
