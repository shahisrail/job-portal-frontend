"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const JobDetails = () => {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
    }
  }, [id]);

  const fetchJobDetails = async (jobId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${jobId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch job details");
      }
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleApply = async () => {
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

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("upload_preset", "job_applications");
    formData.append("cloud_name", "dm6crryf2");
    formData.append("resource_type", "raw");

    try {
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dm6crryf2/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      console.log(cloudinaryData);
      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      const resumeUrl = cloudinaryData.secure_url;

      const response = await fetch("http://localhost:4000/api/application/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId: id, resumeUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Successfully applied!");
      } else {
        toast.error(data.message || "Failed to apply.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume or apply for job");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!jobData) return <div>No job details available</div>;

  return (
    <div>
      <Header />
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
          <div>
            <Image
              width={100}
              height={100}
              src={jobData.image}
              alt="image is loading"
            />
          </div>
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
        <div>
          <label className="font-bold text-[#282b4a]">Upload your Resume (PDF)</label>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="mt-2" 
          />
        </div>
        <button className="btn btn-primary mt-4" onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
