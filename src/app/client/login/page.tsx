"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Ilogin } from "@/app/interface/interface";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const { handleSubmit, control } = useForm<Ilogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogin: SubmitHandler<Ilogin> = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", data);
      console.log(res.status);
      if (res.status === 401) {
        alert("Incorrect Password");
      } else {
        alert("Login Successful");
        router.push("/client/profile");
      }
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({ error: "Registration Faild" + error.message }),
        {
          status: 400,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <div className="flex flex-col items-center bg-green-400 justify-center min-h-screen py-2">
        <div className="w-full max-w-md bg-white -700 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 items-center text-center">
            {loading ? "Processing" : "Login"}
          </h2>
          <hr className="mb-4" />
          <label htmlFor="email" className="flex mb-5 font-medium">
            Email
          </label>
          <Controller
            // ... rest of the Controller code for email input
            control={control}
            name="email"
            rules={{
              required: { value: true, message: "Email is required!" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid Email",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="mb-2">
                <input
                  className="flex p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-300"
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="email"
                />
                <span className="text-red-700 text-xs">{error?.message}</span>
              </div>
            )}
          />
          <label htmlFor="password" className="flex mt-4 mb-2 font-medium">
            Password
          </label>
          <Controller
            // ... rest of the Controller code for password input
            control={control}
            name="password"
            rules={{
              required: { value: true, message: "Password is required!" },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="mb-4">
                <input
                  className="flex p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-300"
                  type="password"
                  value={value}
                  onChange={onChange}
                  placeholder="password"
                />
                <span className="text-red-700 text-xs">{error?.message}</span>
              </div>
            )}
          />
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing" : "Login"}
            </button>
            <p className="mt-4">
              <Link
                href="/client/register"
                className="text-blue-500 hover:underline"
              >
                Visit Signup Page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
