import ScrollBeam from "../../../../ScrollBeam";
import ScrollMarquee from "../../../../../components/ScrollMarquee";
import "./commonMarquee.css";

const CommonMarquee = ({ data }) => {
  return (
    <>
      <ScrollMarquee direction="left" gap={56} className="bm-marquee">
        {data.map((name, i) => (
          <span className="bm-marquee__item" key={`${name}-${i}`}>
            {name}
          </span>
        ))}
      </ScrollMarquee>
      <ScrollBeam />
    </>
  );
};

export default CommonMarquee;
