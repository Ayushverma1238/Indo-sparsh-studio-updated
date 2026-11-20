import ScrollMarquee from "../../../../../components/ScrollMarquee";
import "./ToolUsed.css";

const ToolsUsed = ({ stack }) => {
  return (
    <ScrollMarquee direction="right" gap={14} className="adh-marquee" fade>
      {stack.map((item, i) => (
        <span className="adh-marquee__item" key={`${item}-${i}`}>
          {item}
        </span>
      ))}
    </ScrollMarquee>
  );
};

export default ToolsUsed;
