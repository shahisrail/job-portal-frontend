"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaMapMarkerAlt } from "react-icons/fa"; // Import location icon

export default function MyJobs() {
  const router = useRouter(); // Initialize the router
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(null); // State to track which job's options to show

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://job-portal-backend-lake.vercel.app/api/jobs/employer/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://job-portal-backend-lake.vercel.app/api/jobs/${selectedJob._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }

      toast.success("Job deleted successfully!");
      setJobs(jobs.filter((job) => job._id !== selectedJob._id));
      setShowModal(false);
      router.push("/employer/jobs"); // Redirect to the job listing page after deletion
    } catch (err) {
      toast.error("Error deleting job.");
    }
  };

  const handleUpdate = (job) => {
    setSelectedJob(job);
    setIsEditing(true);
    router.push(`/employer/myjobs/${job._id}`); // Navigate to the edit page with the job ID
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setIsEditing(false);
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-semibold mb-8">Your Posted Jobs</h1>
      {jobs.length === 0 ? (
        <div className="text-center text-lg">No jobs found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center relative hover:shadow-xl transition duration-300"
            >
              <Image
                width={100}
                height={100}
                src={job.image}
                alt="Job Image"
                className="rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-4">
                Applications: {job.applications.length}
              </p>
              <div className="flex justify-between w-full">
                <div className="flex items-center text-gray-500">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  {job.location}
                </div>
                <Link
                  href={`/employer/${job._id}`}
                  className="btn btn-secondary py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  View Applicants
                </Link>
              </div>
              <Link
                href={`/jobs/${job._id}`}
                className="btn btn-link mt-4 text-gray-500 hover:text-gray-700"
              >
                View Job
              </Link>

              {/* Three dot icon for edit/delete options */}
              <div className="absolute top-2 right-2">
                <button
                  className="btn btn-ghost p-2 rounded-full"
                  onClick={() =>
                    setShowOptions(job._id === showOptions ? null : job._id)
                  } // Toggle options
                >
                  <FaEllipsisV className="text-gray-600" />
                </button>
                {showOptions === job._id && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-36">
                    <button
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={() => handleUpdate(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="block px-4 py-2 text-red-600 hover:bg-gray-200"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800">
              {isEditing
                ? "Update Job"
                : "Are you sure you want to delete this job?"}
            </h3>
            <div className="mt-4">
              {isEditing ? (
                <div>
                  <p>
                    Update form goes here (you can prefill the form with
                    `selectedJob` data)
                  </p>
                </div>
              ) : (
                <div>
                  <p>Once deleted, this action cannot be undone.</p>
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={closeModal}
                  className="btn btn-secondary py-2 px-4 rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdate : handleDelete}
                  className="btn btn-danger py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  {isEditing ? "Update Job" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
