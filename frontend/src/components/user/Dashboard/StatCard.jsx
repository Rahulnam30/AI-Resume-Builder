const StatCard = ({ label, value, icon, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-content">
        <div className="stat-header">
          <span className="stat-label">{label}</span>
          <span className="stat-icon-inline">{icon}</span>
        </div>

        <div className="stat-value">{value}</div>

        {trend && <div className="stat-trend">{trend}</div>}
      </div>
    </div>
  );
};

export default StatCard;

