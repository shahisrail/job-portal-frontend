"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const { jobId } = useParams(); // Extract jobId from the dynamic URL

  useEffect(() => {
    // Check if jobId is available
    if (!jobId) {
      console.log("No jobId found in URL");
      return; // Prevent fetching before the jobId is available
    }

    const fetchApplicants = async () => {
      try {
        console.log(`Fetching applicants for jobId: ${jobId}`);

        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:4000/api/jobs/${jobId}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const data = await res.json();
        console.log("Applicants data:", data); // Log the fetched data
        setApplicants(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchApplicants();
  }, [jobId]); // Run the effect whenever jobId changes

  if (error) return <div>Error: {error}</div>;

  // if (!applicants.length) return <div>Loading applicants...</div>;

  return (
    <div>
 

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Applicants for Job ID: {jobId}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {applicants.length === 0 ? (
            <p>No applicants yet.</p>
          ) : (
            <ul className="space-y-6">
              {applicants.map((applicant) => (
                <li
                  key={applicant._id}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  {/* <h2 className="text-xl font-semibold">
                    {applicant.seeker.name || "Unknown Seeker"}
                  </h2>
                  <p className="text-gray-600">
                    Email: {applicant.seeker.email}
                  </p>
                  <p className="text-gray-600">
                    Phone: {applicant.seeker.phone || "N/A"}
                  </p> */}
                  <p className="text-gray-600">
                    Applied On: {new Date(applicant.appliedAt).toLocaleString()}
                  </p>
                  <a
                    href={applicant.resumeUrl}

                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Resume
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
