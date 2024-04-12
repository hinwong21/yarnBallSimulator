import React from "react";

export const Path = React.memo(
  ({
    className,
    id,
    startAngle,
    endAngle,
    startX,
    startY,
    endX,
    endY,
    radius,
    color,
    pathColor,
    updatePathColor,
  }) => {
    const handleClick = React.useCallback(() => {
      if (color !== pathColor) {
        updatePathColor(color);
      }
    }, [color, pathColor, updatePathColor]);

    return (
      <path
        className={className}
        id={id}
        d={`M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${
          endAngle - startAngle > 180 ? 1 : 0
        },1 ${endX},${endY} Z`}
        fill={color}
        onClick={handleClick}
      />
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the color prop has changed
    return prevProps.color === nextProps.color;
  }
);
