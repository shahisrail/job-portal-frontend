"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const PostJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    country: "",
    location: "",
    salary: "",
    image: "",
    requirements: [{ value: "" }], // initial requirements input field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle dynamic requirements input change
  const handleRequirementChange = (index, e) => {
    const newRequirements = [...jobDetails.requirements];
    newRequirements[index].value = e.target.value;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      requirements: newRequirements,
    }));
  };

  // Add a new requirement input field
  const addRequirement = () => {
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      requirements: [...prevDetails.requirements, { value: "" }],
    }));
  };

  // Remove a requirement input field
  const removeRequirement = (index) => {
    const newRequirements = jobDetails.requirements.filter(
      (_, i) => i !== index
    );
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      requirements: newRequirements,
    }));
  };

  // Handle image upload
  // Handle image upload with Cloudinary
const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "JOB_PHOTO"); // Cloudinary upload preset
  
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dm6crryf2/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        if (data.secure_url) {
          setJobDetails((prevDetails) => ({
            ...prevDetails,
            image: data.secure_url, // Save Cloudinary image URL
          }));
          toast.success("Image uploaded successfully!");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Try again!");
      }
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to post the job");
      }

      const data = await response.json();
      toast.success("Job posted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="flex justify-between p-3">
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
            src="/jobpost.png"
            alt="Signup illustration"
            width={900}
            height={500}
          />
        </div>
      </div>
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto p-6 rounded-lg">
          <h1 className="text-[45.87px] font-bold text-[#282b4a] text-center mb-6">
            Post Your <span className="text-[#ff4153]">Job</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="title">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={jobDetails.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="e.g. Software Engineer"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-lg font-medium"
                htmlFor="description"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={jobDetails.description}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Job description goes here"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={jobDetails.country}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="e.g. UK"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={jobDetails.location}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="e.g. London"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="salary">
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={jobDetails.salary}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="e.g. 500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="image">
                Job Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {jobDetails.image && (
                <div className="mt-4">
                  <Image
                    src={jobDetails.image}
                    alt="Job Preview"
                    width={300}
                    height={200}
                  />
                </div>
              )}
            </div>

            {/* Requirements Section */}
            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="requirements">
                Job Requirements
              </label>
              {jobDetails.requirements.map((req, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={req.value}
                    onChange={(e) => handleRequirementChange(index, e)}
                    placeholder={`Requirement ${index + 1}`}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 text-red-500"
                  >
                    <AiOutlineMinus size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center mt-2 text-blue-500"
              >
                <AiOutlinePlus size={20} className="mr-2" />
                Add Requirement
              </button>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`px-6 py-3 text-white font-medium bg-[#ff4153] w-full rounded-md ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
