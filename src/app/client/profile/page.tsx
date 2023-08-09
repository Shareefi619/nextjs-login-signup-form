"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Iregister } from "@/app/interface/interface";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [userData, setUserData] = useState<Iregister>();

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.status === 200) {
        router.push("/client/login");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    setButtonClick(true);
    try {
      const res = await axios.get("/api/userData");
      setUserData(res.data.user);
    } catch (error) {
      alert("Data could not be retrieved" + error);
    }
  };

  console.log(userData);
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-white text-2xl font-semibold">
            Welcome! Home Page
          </h2>
          <button
            onClick={onLogout}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-950"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex items-center justify-center">
        {!buttonClick && (
          <button
            disabled={loading}
            onClick={getUserDetails}
            className="bg-white text-blue-500 px-4 py-2 rounded-lg border border-blue-500"
          >
            Get Detaills
          </button>
        )}
      </div>
      {buttonClick && (
        <div className="p-4 rounded-lg shadow-md shadow-gray-700 m-10 bg-blue-200">
          <h1 className="text-center font-bold text-blue-800 text-lg mb-6">
            USERS DATA
          </h1>
          <div className="flex justify-center">
            {userData && (
              <div className="text-center mx-10 bg-gray-400 p-4 mb-4 rounded-lg">
                <p className="font-medium">First Name: {userData.firstName}</p>
                <p className="font-medium">Last Name: {userData.lastName}</p>
                <p className="font-medium">Gender: {userData.gender}</p>
                <p className="font-medium">Contact #: {userData.contactNumber}</p>
                <p className="font-medium">Address: {userData.address}</p>
                <p className="font-medium">Email: {userData.email}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
