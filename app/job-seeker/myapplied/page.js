'use client';

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/application/app", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setAppliedJobs(data);
        } else {
          console.error("Error fetching applied jobs:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-5 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Applied Jobs</h1>

        {appliedJobs && appliedJobs.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {appliedJobs.map((job) => (
              <li key={job._id} className="bg-white p-5 border border-gray-200 rounded-lg shadow-md">
                <div>
                  <h2 className="text-xl text-blue-500">{job.job.title}</h2>
                  <p className="text-gray-700 my-2">{job.job.description}</p>
                  <p className="text-sm text-gray-500">Applied at: {new Date(job.appliedAt).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600 text-center">
            You have not applied to any jobs yet.
          </p>
        )}
      </div>
    </>
  );
};

export default AppliedJobsPage;
