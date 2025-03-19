"use client";
import toastUtils from "@lib/toast";
import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { name: "", email: "", phone: "", message: "" };

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted:", formData);
    toastUtils.success("Message submitted");

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-gray-100 w-full max-w-7xl m-auto py-8 px-4 md:p-12 rounded-2xl  flex flex-col md:flex-row items-center">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-2xl lg:text-4xl font-bold text-black">
          We'd love to <br /> <span className="text-primary ml-5">hear from you</span>
        </h2>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-400 max-w-lg w-full">
          <h2 className="text-lg md:text-2xl font-bold text-center text-gray-800 mb-6">
            Contact <span className="text-primary">Us</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs md:text-sm ">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-xs md:text-sm  w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary outline-none"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-xs md:text-sm ">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs md:text-sm ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-xs md:text-sm  w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs md:text-sm ">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs md:text-sm ">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="text-xs md:text-sm  w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary outline-none"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-xs md:text-sm ">{errors.phone}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-xs md:text-sm ">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="text-xs md:text-sm w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary outline-none resize-none"
                rows={4}
                placeholder="Enter your message"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs md:text-sm ">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-sm md:text-base bg-primary/50 text-white font-semibold py-2 rounded-md hover:bg-primary transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
