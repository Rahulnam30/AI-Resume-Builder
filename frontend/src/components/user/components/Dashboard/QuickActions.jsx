import playIcon from '../../../../assets/icons/icon-play-black.svg';
import eyeIcon from '../../../../assets/icons/icon-eye-black.svg';
import checkIcon from '../../../../assets/icons/icon-check-black.svg';

const QuickActions = ({ onCreateResume, onBrowseTemplates, onCheckATS }) => {
  return (
    <div className="dashboard-card">
      <h3>🚀 Quick Actions</h3>
      <div className="quick-actions">
        <button className="quick-action-btn" onClick={onCreateResume}>
          <img src={playIcon} alt="" className="icon-sm" style={{marginRight:8}}/> Create New Resume
        </button>
        <button className="quick-action-btn" onClick={onBrowseTemplates}>
          <img src={eyeIcon} alt="" className="icon-sm" style={{marginRight:8}}/> Browse Templates
        </button>
        <button className="quick-action-btn" onClick={onCheckATS}>
          <img src={checkIcon} alt="" className="icon-sm" style={{marginRight:8}}/> Check ATS Score
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
