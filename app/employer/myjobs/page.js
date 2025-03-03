"use client";
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa"; // Import the three-dot icon

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
          "http://localhost:4000/api/jobs/employer/jobs",
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
        `http://localhost:4000/api/jobs/${selectedJob._id}`,
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
      <h1>Your Posted Jobs</h1>
      {jobs.length === 0 ? (
        <div>No jobs found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-10">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card bg-slate-200 shadow-2xl p-2 relative"
            >
              <figure>
                <Image
                  width={100}
                  height={100}
                  src={job.image}
                  alt="Job Image"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{job.title}</h2>
                <p>Applications: {job.applications.length}</p>
                <div className="card-actions justify-between">
                  <button className="btn btn-primary">{job.location}</button>
                  <Link
                    href={`/employer/${job._id}`}
                    className="btn btn-secondary"
                  >
                    View Applicants
                  </Link>
                  <Link href={`/jobs/${job._id}`} className="btn btn-link">
                    View Job
                  </Link>
                  {/* Three dot icon for edit/delete options */}
                  <div className="absolute top-2 right-2">
                    <button
                      className="btn btn-ghost"
                      onClick={() =>
                        setShowOptions(job._id === showOptions ? null : job._id)
                      } // Toggle options
                    >
                      <FaEllipsisV />
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
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">
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
                <button onClick={closeModal} className="btn btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdate : handleDelete}
                  className="btn btn-danger"
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
