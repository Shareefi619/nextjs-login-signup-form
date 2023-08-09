"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Iregister } from "@/app/interface/interface";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const { handleSubmit, control } = useForm<Iregister>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male" || "female",
      contactNumber: 0,
      address: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSignup: SubmitHandler<Iregister> = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/register", data);

      if (res.status === 400) {
        throw new Error("Registration Failed");
      } else {
        alert("Registration Success");
        router.push("/client/login");
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
    <form onSubmit={handleSubmit(onSignup)}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-green-400">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {loading ? "Processing" : "Signup"}
          </h2>
          <hr className="mb-4" />
          <div className="flex items-center mb-3">
            <label
              htmlFor="firstName"
              className="flex items-start mb-2 mr-5 font-medium"
            >
              First Name:
            </label>
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: { value: true, message: "firstname is required!" },
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Invalid firstname",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mx-2">
                  <input
                    className="flex p-2 border border-gray-300 rounded-lg mb-1 mt-4 focus:outline-none focus:border-gray-300"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="firstName"
                  />
                  <span className="flex mb-2 text-red-700 text-xs">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              htmlFor="lastName"
              className="flex items-start mb-2 mr-3 font-medium"
            >
              Last Name:
            </label>
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: { value: true, message: "lastname is required!" },
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Invalid lastname",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mx-2">
                  <input
                    className="flex mx-2 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-300"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="lastName"
                  />
                  <span className="flex text-red-700 text-xs ml-3">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              htmlFor="gender"
              className="flex items-start mb-2 mr-9 font-medium "
            >
              Gender :
            </label>
            <Controller
              control={control}
              name="gender"
              rules={{
                required: { value: true, message: "gender is required!" },
                pattern: {
                  value: /^(?:m|M|male|Male|f|F|female|Female)$/,
                  message: "Invalid gender",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mx-2">
                  <input
                    className="flex mx-2 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-300"
                    type="text"
                    onChange={onChange}
                    placeholder="gender"
                  />
                  <span className="flex text-red-700 text-xs ml-3">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              htmlFor="contact#"
              className="flex items-start mb-2 mr-3 font-medium"
            >
              Contact # :
            </label>
            <Controller
              control={control}
              name="contactNumber"
              rules={{
                required: { value: true, message: "number is required!" },
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  message: "Invalid number",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mx-2">
                  <input
                    className="flex mx-2 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-300"
                    type="text"
                    onChange={onChange}
                    placeholder="number"
                  />
                  <span className="flex text-red-700 text-xs ml-3">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              htmlFor="address"
              className="flex items-start mb-1 mr-6 font-medium"
            >
              Address :
            </label>
            <Controller
              control={control}
              name="address"
              rules={{
                required: { value: true, message: "address is required!" },
                pattern: {
                  value: /^[A-Za-z0-9\s\.,\-\/()&'#]*$/,
                  message: "Invalid address",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mx-2">
                  <input
                    className="flex mx-2 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-300"
                    type="text"
                    onChange={onChange}
                    placeholder="residential address"
                  />
                  <span className="flex text-red-700 text-xs ml-3">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <label
              htmlFor="email"
              className="flex items-start mb-2 mr-12 font-medium"
            >
              Email:
            </label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: { value: true, message: "email is required!" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid address",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mx-2">
                  <input
                    className="flex mx-2 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-300"
                    type="text"
                    onChange={onChange}
                    placeholder="Email address"
                  />
                  <span className="flex text-red-700 text-xs ml-3">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-5 mb-4">
            <label htmlFor="password" className="flex items-start font-medium">
              Password:
            </label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: { value: true, message: "password is required!" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Invalid Text: Minimum eight characters, at least one letter and one number",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <input
                    className="flex mx-2 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-300"
                    type="text"
                    onChange={onChange}
                    placeholder="password"
                  />
                  <span className="flex text-red-700 text-xs ml-3">
                    {error?.message}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <button
              type="submit"
              disabled={loading}
              className={`flex px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "No signup" : "Signup"}
            </button>

            <p className="mt-4">
              <Link
                href="/client/login"
                className="text-blue-500 hover:underline"
              >
                Visit Login Page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
