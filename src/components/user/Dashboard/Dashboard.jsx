import StatCard from './StatCard';
import docIcon from '../../../assets/images/doc-glyph.svg';
import checkIcon from '../../../assets/images/check-glyph.svg';
import downloadIcon from '../../../assets/images/download-glyph.svg';
import templateIcon from '../../../assets/images/template-glyph.svg';
import RecentResumes from './RecentResumes';
// import QuickActions from './QuickActions';
import './Dashboard.css';

const Dashboard = ({ user, resumes, setActivePage }) => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>👋 Welcome back, {user?.name || 'User'}!</h1>
        <p>Here's your resume building progress</p>
      </div>
      
      <div className="dashboard-stats">
        <StatCard 
          iconSrc={docIcon}
          value={resumes.length} 
          label="Resumes Created" 
          colorClass="blue" 
        />
        <StatCard 
          iconSrc={checkIcon}
          value="92%" 
          label="Avg ATS Score" 
          colorClass="green" 
        />
        <StatCard 
          iconSrc={downloadIcon}
          value="12" 
          label="Downloads" 
          colorClass="purple" 
        />
        <StatCard 
          iconSrc={templateIcon}
          value="5" 
          label="Templates Used" 
          colorClass="orange" 
        />
      </div>

      <div className="dashboard-grid">
        <RecentResumes 
          resumes={resumes} 
          onViewAll={() => setActivePage('my-resumes')} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
