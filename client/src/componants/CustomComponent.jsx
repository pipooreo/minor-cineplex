import rightArrow from "../assets/Expand_right.svg";
import leftArrow from "../assets/Expand_left.svg";

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-next-arrow ${className}`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={onClick}
    >
      <img src={rightArrow} alt="Next" style={{ width: "30px" }} />
    </div>
  );
};

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-prev-arrow ${className}`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={onClick}
    >
      <img
        src={leftArrow}
        alt="Previous"
        style={{ width: "30px", transform: "rotate(180deg)" }}
      />
    </div>
  );
};
