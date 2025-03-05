"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleJobs, setVisibleJobs] = useState(9);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const jobsPerLoad = 9;

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://job-portal-backend-lake.vercel.app/api/application/countries"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch country list");
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching country list:", error);
      toast.error("Failed to fetch country list");
    }
  };

  const fetchJobs = async (country = "") => {
    setLoading(true);
    try {
      let url = "https://job-portal-backend-lake.vercel.app/api/jobs";
      if (country) {
        url = `https://job-portal-backend-lake.vercel.app/api/jobs/country/${country}`;
      }
      const response = await fetch(url);
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

  useEffect(() => {
    fetchJobs();
    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    fetchJobs(country);
  };

  const showMoreJobs = () => {
    setVisibleJobs((prev) => prev + jobsPerLoad);
  };

  const showLessJobs = () => {
    setVisibleJobs((prev) => Math.max(prev - jobsPerLoad, 9));
  };

  return (
    <div>
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
            src="/girl-img.png"
            alt="Signup illustration"
            width={300}
            height={300}
          />
        </div>
      </div>
      <h2 className="font-bold text-[#282b4a] text-center text-[35.87px] p-2">
        Job <span className="text-[#ff4153]">Listing</span>
      </h2>

      <div className="flex justify-center p-4">
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Countries</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center p-5">Loading...</div>
      ) : jobData.length === 0 ? (
        <div className="flex justify-center p-5 text-red-500 font-bold">
          No jobs available for this country.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {jobData.slice(0, visibleJobs).map((job) => (
            <div
              key={job.id}
              className="card bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
            >
              <div className="flex justify-center p-4">
                <Image
                  width={120}
                  height={120}
                  src={job.image}
                  alt="Job Image"
                  className="border-2 border-[#ff4153] rounded-lg"
                />
              </div>

              <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold text-[#282b4a]">
                  {job.title}
                </h2>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    {job.location}
                  </div>
                  <Link href={`/jobs/${job._id}`}>
                    <button className="px-4 py-2 bg-[#282b4a] text-white font-medium rounded-lg shadow-md hover:bg-[#1f2239]">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
