import React, { useState, useEffect } from "react";
import FormInput from "../../components/shared/inputs/Input";

import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const { login, error } = useAuth();

  useEffect(() => {
    // Reset form data when the component mounts or when the redirect occurs
    setFormData({
      password: "",
      email: "",
    });

    setErrors({});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Dynamically update errors state based on user input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission here
      login(formData);
    }
  };

  return (
    <div className="flex justify-center bg-primary/10 w-screen items-center mx-auto h-screen ">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 px-14 sm:px-20 py-10 rounded-md bg-white shadow-lg"
      >
        <div className="">
          <div className="text-primary text-center font-bold text-2xl">
            Login
          </div>
          {error && (
            <div className="text-red-400 text-bold text-center">
              Invalid credentials
            </div>
          )}
        </div>
        <div className="">
          <FormInput
            name="email"
            type="text"
            placeholder="email"
            label="email"
            value={formData["email"]}
            error={errors["email"]}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <FormInput
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={formData["password"]}
            error={errors["password"]}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="py-2 px-4 bg-primary hover:bg-secondary focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white rounded-md shadow-md focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;