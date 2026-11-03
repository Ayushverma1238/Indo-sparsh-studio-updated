import "./ToolUsed.css"
const ToolsUsed = ({ stack }) => {
  return (
    <div className="adh-marquee">
      <div className="adh-marquee__track">
        {[...stack, ...stack].map((item, i) => (
          <span className="adh-marquee__item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ToolsUsed;
