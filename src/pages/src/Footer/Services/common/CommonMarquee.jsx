import ScrollBeam from "../../../../ScrollBeam";
import "./commonMarquee.css"

const CommonMarquee = ({data}) => {
  return (
    <>
      <div className="bm-marquee">
        <div className="bm-marquee__track">
          {[...Array(2)]
            .flatMap(() => data)
            .map((name, i) => (
              <span className="bm-marquee__item" key={i}>
                {name}
              </span>
            ))}
        </div>
      </div>
      <ScrollBeam />
    </>
  );
};

export default CommonMarquee;
