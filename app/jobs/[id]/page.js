"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const JobDetails = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [userRole, setUserRole] = useState(null); // To store user role
  const [userId, setUserId] = useState(null); // To store the user's ID
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
      // fetchUserRole(); // Fetch the current user role when the component mounts
    }
  }, [id]);

  // Fetch job details
  const fetchJobDetails = async (jobId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`);
      if (!response.ok) throw new Error("Failed to fetch job details");
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      toast.error("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the current user's role
  // const fetchUserRole = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;
  //   try {
  //     const response = await fetch("http://localhost:4000/api/user/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setUserRole(data.user.role);
  //     setUserId(data.id); // Store the user's ID
  //   } catch (error) {
  //     console.error("Failed to fetch user role", error);
  //   }
  // };

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
        "http://localhost:4000/api/application/apply",
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

  if (loading) return <div>Loading...</div>;
  if (!jobData) return <div>No job details available</div>;

  // Disable the Apply button if the user is an employer and owns the job
  const isEmployer = userRole === "employer";
  const isOwnJob = jobData.employer === userId; // Compare with user ID, not the role

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
            src="/singup.png"
            alt="Signup illustration"
            width={900}
            height={900}
          />
        </div>
      </div>

      <div className="p-20">
        <div className="flex gap-2 items-center">
          <Image
            width={100}
            height={100}
            src={jobData.image}
            alt="image is loading"
          />
          <div>
            <h3 className="font-bold text-[#282b4a] text-[25.87px]">
              {jobData.title}
            </h3>
            <p className="text-[#ff4153] text-[20.23px]">{jobData.location}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#282b4a] text-[25px]">
            Job Description
          </h3>
          <p>{jobData.description}</p>
        </div>
        <div>
          <h3 className="font-bold text-[#282b4a] text-[25px]">Requirements</h3>
          <ul>
            {jobData.requirements?.map((req, index) => (
              <li key={index}>{req.value}</li>
            ))}
          </ul>
        </div>

        {!hasApplied && !isEmployer && !isOwnJob ? (
          <>
            <div>
              <label className="font-bold text-[#282b4a]">
                Upload your Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>
            <button
              className="btn btn-primary mt-4"
              onClick={handleApply}
              // disabled={applying || isEmployer || isOwnJob || hasApplied}
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>
          </>
      
        ) : (
          <div className="mt-4 text-green-600 font-bold">
            Already applied for this job
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
