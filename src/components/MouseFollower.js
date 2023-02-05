import React, { useState, useCa, useCallback } from "react";
import { ReactDOM } from "react";

const width = 1200;
const height = 800;

const circleRadius = 30;
const initialMousePosition = { x: width / 2, y: height / 2 };
export const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      console.log(mousePosition);
    },
    [setMousePosition]
  );

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
    </svg>
  );
};
