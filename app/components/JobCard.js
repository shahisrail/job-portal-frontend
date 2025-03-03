export default function JobCard({ job }) {
    return (
      <div className="job-card">
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <p>Company: {job.company}</p>
        <p>Location: {job.location}</p>
      </div>
    );
  }
  