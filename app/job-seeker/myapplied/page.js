"use client";

import { motion } from "framer-motion";
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
        const res = await fetch("https://job-portal-backend-lake.vercel.app/api/application/app", {
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

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600">Loading...</p>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Your Applied Jobs
      </h1>

      {appliedJobs && appliedJobs.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <motion.li
              key={job._id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <motion.h2
                className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {job.job.title}
              </motion.h2>
              <motion.p
                className="text-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {job.job.description}
              </motion.p>
              <motion.p
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Applied on:{" "}
                <span className="font-semibold">
                  {new Date(job.appliedAt).toLocaleDateString()}
                </span>
              </motion.p>
            </motion.li>
          ))}
        </ul>
      ) : (
        <motion.p
          className="text-lg text-gray-600 text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          You have not applied to any jobs yet.
        </motion.p>
      )}
    </div>
  );
};

export default AppliedJobsPage;
