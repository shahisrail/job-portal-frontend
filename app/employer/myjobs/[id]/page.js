"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function EditJob() {
  const router = useRouter();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get the job ID from the URL
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    location: '',
    country: '',
    salary: '',
    image: '',
    requirements: [{ value: '' }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch job details when the component is mounted
  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://job-portal-backend-lake.vercel.app/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        if (res.ok) {
          const data = await res.json();
          setJobDetails(data); // Populate the form with job data
        } else {
          toast.error('Failed to fetch job details.');
        }
      };

      fetchJob();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://job-portal-backend-lake.vercel.app/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobDetails),
      });

      if (!res.ok) {
        throw new Error('Failed to update job');
      }

      toast.success('Job updated successfully!');
      router.push('/employer/myjobs'); // Redirect back to the jobs list page
    } catch (err) {
      toast.error('Error updating job.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'JOB_PHOTO'); // Cloudinary settings
      formData.append('cloud_name', 'dm6crryf2'); // Cloudinary cloud name

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dm6crryf2/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          setJobDetails((prevDetails) => ({
            ...prevDetails,
            image: data.secure_url, // Set Cloudinary URL
          }));
        }
      } catch (error) {
        toast.error('Error uploading image.');
      }
    }
  };

  // Add new requirement
  const addRequirement = () => {
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      requirements: [...prevDetails.requirements, { value: '' }],
    }));
  };

  // Remove requirement
  const removeRequirement = (index) => {
    setJobDetails((prevDetails) => {
      const updatedRequirements = prevDetails.requirements.filter((_, i) => i !== index);
      return { ...prevDetails, requirements: updatedRequirements };
    });
  };

  // Update requirement value
  const handleRequirementChange = (index, e) => {
    const { value } = e.target;
    setJobDetails((prevDetails) => {
      const updatedRequirements = [...prevDetails.requirements];
      updatedRequirements[index].value = value;
      return { ...prevDetails, requirements: updatedRequirements };
    });
  };

  return (
    <div>
   
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto p-6 rounded-lg">
          <h1 className="text-[45.87px] font-bold text-[#282b4a] text-center mb-6">
            Edit Job: <span className="text-[#ff4153]">{jobDetails.title}</span>
          </h1>
          <form onSubmit={handleUpdate}>
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
              <label className="block text-lg font-medium" htmlFor="description">
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
                  <img
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
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center mt-2 text-blue-500"
              >
                Add Requirement
              </button>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className={`px-6 py-3 text-white font-medium bg-[#ff4153] w-full rounded-md ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
