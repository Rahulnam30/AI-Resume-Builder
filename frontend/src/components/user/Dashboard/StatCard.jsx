const StatCard = ({ icon, value, label, colorClass }) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h2>{value}</h2>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
