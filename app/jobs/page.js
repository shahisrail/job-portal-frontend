"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [jobData, setJobData] = useState([]); // To hold job data
  const [loading, setLoading] = useState(true); // Loading state
  const [visibleJobs, setVisibleJobs] = useState(9); // Number of jobs visible at a time
  const jobsPerLoad = 9; // Jobs to load each time

  // Fetch jobs data from API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast.error("Failed to fetch job data");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchJobs when page loads
  useEffect(() => {
    fetchJobs();
  }, []);

  // Show more jobs
  const showMoreJobs = () => {
    setVisibleJobs((prev) => prev + jobsPerLoad);
  };

  // Show less jobs (optional)
  const showLessJobs = () => {
    setVisibleJobs((prev) => Math.max(prev - jobsPerLoad, 9)); // Keep at least 9 jobs visible
  };

  return (
    <div>
     
      <div className="flex justify-between p-20">
        <div>
          <h1 className="font-bold text-[#282b4a] text-[45.87px]">Your dream Job</h1>
          <h6 className="font-bold text-[#ff4153] text-[35.23px]">Is Near to You</h6>
        </div>
        <div>
          <Image src="/girl-img.png" alt="Signup illustration" width={300} height={300} />
        </div>
      </div>
      <h2 className="font-bold text-[#282b4a] text-center text-[35.87px] p-2">
        Job <span className="text-[#ff4153]">Listing</span>{" "}
      </h2>

      {loading ? (
        <div className="flex justify-center p-5">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {jobData.slice(0, visibleJobs).map((job) => (
            <div key={job.id} className="card bg-base-100 shadow-sm">
              <figure>
                <Image width={100} height={100} src={job.image} alt="Job Image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{job.title}</h2>
                <p>{job.description}</p>
                <div className="card-actions justify-between">
                  <button className="btn btn-primary">{job.location}</button>
                  <Link href={`/jobs/${job._id}`}>
                    <button className="btn btn-primary">Apply Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show More / Show Less button */}
      <div className="flex justify-center mt-6">
        {visibleJobs < jobData.length && (
          <button
            onClick={showMoreJobs}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Show More
          </button>
        )}
        {visibleJobs > 9 && (
          <button
            onClick={showLessJobs}
            className="px-4 py-2 bg-gray-600 text-white rounded-md ml-4"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
