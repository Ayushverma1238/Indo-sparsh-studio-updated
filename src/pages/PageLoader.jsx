import "./PageLoader.css";
import loaderImg from "/tech/loader.gif";

export default function PageLoader({ show }) {
  if (!show) return null;

  return (
    <div className="page-loader">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
}
