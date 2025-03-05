"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const JobDetails = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
      fetchUserDetails(); // Fetch user role and ID on component mount
    }
  }, [id]);

  // Fetch job details
  const fetchJobDetails = async (jobId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://job-portal-backend-lake.vercel.app/api/jobs/${jobId}`);
      if (!response.ok) throw new Error("Failed to fetch job details");
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      toast.error("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch authenticated user role and ID
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://job-portal-backend-lake.vercel.app/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setUserRole(userData.role);
        setUserId(userData.id);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  // Handle job application
  const handleApply = async () => {
    if (hasApplied) {
      toast.warning("You have already applied for this job.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to apply.");
      router.push(`/auth/login?redirect=/jobs/${id}`);
      return;
    }

    if (!resumeFile) {
      toast.error("Please upload your resume first.");
      return;
    }

    setApplying(true);

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("upload_preset", "job_applications");
      formData.append("cloud_name", "dm6crryf2");
      formData.append("resource_type", "raw");

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dm6crryf2/raw/upload`,
        { method: "POST", body: formData }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      if (!cloudinaryData.secure_url)
        throw new Error("Cloudinary upload failed");

      const resumeUrl = cloudinaryData.secure_url;

      const response = await fetch(
        "https://job-portal-backend-lake.vercel.app/api/application/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ jobId: id, resumeUrl }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Successfully applied!");
        setHasApplied(true);
      } else {
        toast.error(data.message || "Failed to apply.");
      }
    } catch (error) {
      toast.error("Failed to upload resume or apply for job");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!jobData)
    return <div className="text-center py-10">No job details available</div>;

  // Disable the Apply button if the user is an employer and owns the job
  const isEmployer = userRole === "employer";
  const isOwnJob = jobData.employer === userId;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="flex justify-between mb-8 p-10">
        <div>
          <h1 className="font-semibold text-4xl text-[#282b4a]">
            Your Dream Job
          </h1>
          <h2 className="text-2xl text-[#ff4153] mt-2">Is Waiting for You</h2>
        </div>
        <div>
          <Image
            src="/singup.png"
            alt="Signup illustration"
            width={700}
            height={700}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex gap-6 items-center mb-6">
          <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-[#ff4153]">
            <Image
              src={jobData.image}
              alt="Job Image"
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-xl text-[#282b4a]">
              {jobData.title}
            </h3>
            <div className="flex items-center text-gray-500">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              {jobData.location}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-xl text-[#282b4a]">Job Description</h3>
          <p className="text-lg text-gray-700 mt-2">{jobData.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-xl text-[#282b4a]">Requirements</h3>
          <ul className="list-disc list-inside mt-2">
            {jobData.requirements?.map((req, index) => (
              <li key={index} className="text-lg text-gray-700">
                {req.value}
              </li>
            ))}
          </ul>
        </div>

        {!hasApplied && !isEmployer && !isOwnJob ? (
          <div className="mt-6">
            <label className="block font-semibold text-[#282b4a]">
              Upload Your Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            />
            <button
              className="btn btn-primary mt-4 px-6 py-3 bg-[#ff4153] text-white rounded-lg hover:bg-[#ff2a3b]"
              onClick={handleApply}
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>
          </div>
        ) : (
          <div className="mt-6 text-green-600 font-semibold">
            Already applied for this job
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
