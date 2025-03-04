"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCube } from "react-icons/fa";

const Homejobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 6 jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/jobs");
        const data = await response.json();
        setJobs(data.slice(0, 6)); // Only take the latest 6 jobs
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5">
      {jobs.map((job, index) => (
        <div key={index} className="relative group mb-8 flex flex-col h-full overflow-hidden">
          {/* Job Box Image */}
          <div className="relative flex-grow">
            <Image
              className="w-full h-[500px] object-cover rounded-3xl"
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
          <div className="absolute left-0 right-0 bottom-1/4 text-center text-white">
            <h3 className="text-[24.13px] mb-7">{job.title}</h3>
            <button
              type="button"
              className="text-white border-2 border-[#d98813] rounded-none font-semibold px-3 py-1.5 h-7 leading-none text-[14.58px]"
            >
              Apply Now
            </button>
          </div>

          {/* Job Box Hover */}
          <div className="absolute inset-0 opacity-0 z-[-1] border-2 border-transparent rounded-3xl transform perspective-400 rotate-x-[-90deg] origin-top group-hover:opacity-100 group-hover:z-10 group-hover:rotate-x-0 transition-all duration-1000 group-hover:h-[80%] group-hover:scale-105">
            <div className="card border-2 border-[#2a3b4a] rounded-3xl h-full bg-white">
              <Image
                className="card-img-top w-full rounded-3xl object-cover"
                src={job.image} // Assuming hover image URL in the API response
                alt={job.title}
                width={300}
                height={200}
                priority={true}
              />
              <div className="absolute left-0 right-0 bottom-1/4 text-center text-white">
                <FaCube className="text-2xl text-center text-red-600" />
                <h3>{job.title}</h3>
              </div>
              <div className="card-body text-left bg-white text-black">
                <h4>{job.title}</h4>
                <ul className="list-none mb-0">
                  <li>{job.location}</li>
                  <li>Salary: {job.salary}</li>
                  <li>Country: {job.country}</li>
                </ul>
              </div>
              <a
                href={job.detailsLink}
                className="block text-center py-2 px-4 mt-2 text-black rounded-full"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homejobs;
