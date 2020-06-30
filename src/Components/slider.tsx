import React, { useState } from "react";
import "../Style/slider.scss";
import { POINT_CONVERSION_UNCOMPRESSED } from "constants";
import { Picture } from "../model";
const leftarrow: string = require("../Style/leftarrow.svg");
const rightarrow: string = require("../Style/rightarrow.svg");

export default function Slider(props: { pictures: Picture[] }) {
  const [x, set_x] = useState(0);

  const goLeft = () => {
    console.log(x);
    x === 0 ? set_x(-100 * (props.pictures.length - 1)) : set_x(x + 100);
  };
  const goRight = () => {
    x === -100 * (props.pictures.length - 1) ? set_x(0) : set_x(x - 100);
  };

  return (
    <div className="slider">
      {props.pictures.map((picture) => {
        return (
          <div
            key={picture.id}
            className="slide"
            style={{ transform: `translateX(${x}%)` }}
          >
            <img src={picture.imageUrl} key={picture.id} alt="" />
          </div>
        );
      })}
      <button id="goLeft" onClick={goLeft}>
        {/* <img src={leftarrow} className="arrow" /> */}
      </button>
      <button id="goRight" onClick={goRight}>
        {/* <img src={rightarrow} className="arrow" /> */}
      </button>
    </div>
  );
}
