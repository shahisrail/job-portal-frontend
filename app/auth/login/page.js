"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../auth.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        const currentPath = window.location.pathname;

        if (redirect && currentPath !== redirect) {
          router.push(redirect);
        } else if (!redirect) {
          router.push("/");
        }
      }, 3000);
    } else {
      toast.error(data.message || "Login failed! Check credentials.");
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
          <h1 className="font-bold text-[#282b4a] text-center text-[51.87px] mb-10">
            Welcome Back
          </h1>
          <div className="latestForm">
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
          </div>

          <div className="form-group">
            <input
              type="submit"
              name="submit"
              className="btn w-[400px] bg-[#ff4153] hover:bg-[#282B4A] text-white p-3 rounded-lg cursor-pointer transition duration-300"
              value="Login Now"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-balck">
              No account?{" "}
              <span
                onClick={() => router.push("/auth/signup")}
                className="text-[#ff4153] cursor-pointer hover:underline"
              >
                Create one
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
