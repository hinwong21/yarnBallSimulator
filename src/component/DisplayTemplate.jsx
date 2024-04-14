import React, { useMemo } from "react";

export const DisplayTemplate = ({
  radius,
  zIndex,
  top,
  left,
  bottom,
  fillColors,
}) => {
  const diameter = radius * 2;
  const numParts = 120;
  const segmentAngle = 360 / numParts;

  const startAngles = useMemo(() => {
    return Array.from({ length: numParts }, (_, index) => index * segmentAngle);
  }, [numParts, segmentAngle]);

  return (
    <svg
      className="circle-divider"
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      style={{ zIndex, top, left, bottom }}
    >
      {startAngles.map((startAngle, index) => {
        const endAngle = startAngle + segmentAngle;
        const startX = radius + radius * Math.cos((startAngle * Math.PI) / 180);
        const startY = radius + radius * Math.sin((startAngle * Math.PI) / 180);
        const endX = radius + radius * Math.cos((endAngle * Math.PI) / 180);
        const endY = radius + radius * Math.sin((endAngle * Math.PI) / 180);

        const pathId = `path-${index}`;
        const fillColor = fillColors[index];

        return (
          <path
            key={index}
            id={pathId}
            d={`M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${
              endAngle - startAngle > 180 ? 1 : 0
            },1 ${endX},${endY} Z`}
            fill={fillColor} // Apply color from tempColor array
          ></path>
        );
      })}
    </svg>
  );
};
