import React from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import "../styles/Card.css";

const Card = ({ i, title, tags, status }) => {
  return (
    <div className="container">
      <div className="cardHeading2" style={{ justifyContent: "space-between" }}>
        <span style={{ textTransform: "uppercase", color: "darkgrey" }}>
          {i}
        </span>

        <div className="image">
          <img
            src="https://quicksell.co/assets/logo/logo.png"
            alt="QuickSell"
          />

          <div className="status"></div>
        </div>
      </div>

      <div className="tit">
        <p>{title}</p>
      </div>

      <div className="tags">
        <div className="tag">
          <BsExclamationSquareFill />
        </div>
        {tags?.map((element, ind) => {
          return (
            <div key={ind} className="tag">
              <span>.</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
