"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../loading.css";
const Homejobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 6 jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://job-portal-backend-lake.vercel.app/api/jobs");
        const data = await response.json();

        // Sort jobs by createdAt or similar field in descending order
        const sortedJobs = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setJobs(sortedJobs.slice(0, 6)); // Take the latest 6 jobs after sorting
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="loader"></div> {/* Add your loader here */}
      </div>
    );
  }

  return (
    <>
      <h1 className="font-bold text-[#282b4a] text-center text-[51.87px]">
        Our Latestd{" "}
        <span className="font-bold text-[#ff4153] text center text-[51.23px]">
          Job
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="relative group mb-8 flex flex-col h-full overflow-hidden rounded-3xl border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Job Box Image */}
            <div className="relative flex-grow overflow-hidden rounded-3xl">
              <Image
                className="w-full h-[300px] object-cover rounded-3xl"
                width={500}
                height={300}
                src={job.image}
                alt={job.title}
                priority={true} // Make sure image loads first
              />
              {/* Gray Overlay */}
              <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-3xl"></div>
            </div>

            {/* Job Box Content */}
            <div className="absolute left-0 right-0 bottom-1/4 text-center text-white p-4 z-10  transition-opacity duration-300">
              <h3 className="text-2xl font-semibold mb-5">{job.title}</h3>

              <Link href={`/jobs/${job._id}`}>
                <button className="bg-[#d98813] text-white rounded-full px-6 py-2 text-lg font-semibold shadow-lg hover:bg-[#d47910] transition duration-300">
                  Apply Now
                </button>
              </Link>
            </div>

            {/* Job Box Hover Details */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Homejobs;
