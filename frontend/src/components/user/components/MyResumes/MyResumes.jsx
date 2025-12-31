import ResumeSearch from './ResumeSearch';
import ResumeCard from './ResumeCard';
import './MyResumes.css';

const MyResumes = ({ resumes, setActivePage }) => {
  return (
    <div className="my-resumes-page">
      <div className="page-header">
        <h1>📁 My Resumes</h1>
        <p>Manage your saved resumes and downloads</p>
      </div>

      <ResumeSearch onNewResume={() => setActivePage('resume')} />

      <div className="resumes-list">
        {resumes.map(resume => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default MyResumes;
