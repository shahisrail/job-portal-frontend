"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobSeeker"); // default to job-seeker
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://job-portal-backend-lake.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } else {
      toast.error(data.message || "Registration failed!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between p-20">
        <div>
          <h1 className="font-bold text-[#282b4a] text-[45.87px]">
            Your dream Job
          </h1>
          <h6 className="font-bold text-[#ff4153] text-[35.23px]">
            Is Near to You
          </h6>
        </div>
        <div>
          <Image
            src="/singup.png"
            alt="Signup illustration"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-[#282b4a] text-center text-[51.87px]">
            REGISTRATION
          </h1>
          <div className="latestForm">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control w-[400px]"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control w-[400px]"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control w-[400px]"
                required
              />
            </div>
            <div className="form-group">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control w-[400px]"
              >
                <option value="jobSeeker">jobSeeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              name="submit"
              className="btn w-[400px] bg-[#ff4153] hover:bg-[#282B4A] text-white p-3 rounded-lg cursor-pointer transition duration-300"
              value=" Register Now"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-balck">
              Already Have an account?{" "}
              <span
                onClick={() => router.push("/auth/login")}
                className="text-[#ff4153] cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
 