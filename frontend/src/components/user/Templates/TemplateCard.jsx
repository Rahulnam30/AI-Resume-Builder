const TemplateCard = ({ template, onSelect }) => {
  return (
    <div
      className="template-card"
      onClick={() => onSelect?.(template.id)}
    >
      <div className="template-preview-box">
        {template.img && (
          <img
            src={template.img}
            alt={template.name}
            className="template-preview-img"
          />
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
