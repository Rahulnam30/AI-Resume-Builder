const StatCard = ({ icon, iconSrc, value, label, colorClass }) => {
  const imgSrc = iconSrc || null;
  return (
    <div className="stat-card">
      <div className="stat-icon-left" aria-hidden>
        {imgSrc ? <img src={imgSrc} alt="" /> : icon}
      </div>

      <div className="stat-info">
        <span className="stat-label small">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;