"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Assuming token contains user role (e.g., employer), decode it here
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken?.role); // Set role (e.g., employer)
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
    toast.success("Successfully logged out!"); // Show success toast when logged out
    router.push("/"); // Redirect to home page after logout
  };

  return (
    <>
      <ToastContainer />
      <div className="navbar bg-[#F1F1F1] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              Job-portal
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/aboutus">About</Link>
              </li>
              <li>
                <Link href="/jobs">jobs</Link>
              </li>
              {isLoggedIn && role === "employer" && (
                <li>
                  <Link href="/postjob">Post a Job</Link>{" "}
                  {/* Only show if logged in and employer */}
                </li>
              )}
            </ul>
          </div>
          <Link href={"/"} className=" text-xl">
            <Image height={100} width={100} alt="logo" src="/Logo.png" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/aboutus">About</Link>
            </li>
            <li>
              <Link href="/jobs">jobs</Link>
            </li>
            {isLoggedIn && role === "employer" && (
              <li>
                <Link href="/postjob">Post a Job</Link>{" "}
                {/* Only show if logged in and employer */}
              </li>
            )}
            {isLoggedIn && role === "employer" && (
              <li>
                <Link href="/employer/myjobs">My post</Link>{" "}
                {/* Only show if logged in and employer */}
              </li>
            )}

            <li>
              <Link href="/job-seeker/myapplied">My applied</Link>{" "}
              {/* Only show if logged in and employer */}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button> // Show logout button if logged in
          ) : (
            <Link href="/auth/login">Login</Link> // Show login link if not logged in
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
