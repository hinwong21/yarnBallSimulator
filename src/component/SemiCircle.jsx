import React from "react";

export const SemiCircle = ({ radius, color }) => {
  const diameter = radius * 2;
  const numParts = 120;
  const segmentAngle = 180 / numParts;

  return (
    <svg
      className="semi-circle"
      width={diameter}
      height={radius}
      viewBox={`0 0 ${diameter} ${radius}`}
    >
      {Array.from({ length: numParts }).map((_, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = (index + 1) * segmentAngle;
        const startX = radius * Math.sin((startAngle * Math.PI) / 180);
        const startY = radius - radius * Math.cos((startAngle * Math.PI) / 180);
        const endX = radius * Math.sin((endAngle * Math.PI) / 180);
        const endY = radius - radius * Math.cos((endAngle * Math.PI) / 180);

        return (
          <path
            key={index}
            d={`M ${startX},${startY} A ${radius},${radius} 0 0,0 ${endX},${endY}`}
            fill={color}
            stroke={"black"}
            strokeWidth={10}
          />
        );
      })}
    </svg>
  );
};
