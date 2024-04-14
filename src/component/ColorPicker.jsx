import React, { useState } from "react";
import { HexColorPicker } from "react-colorful"; // npm i react-colorful

export const ColorPicker = ({ onChange }) => {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  // Array of popular colors
  const popularColors = [
    "#FF0000", // Red
    "#f0c56e", // Yellow
    "#0000FF", // Blue
    "#00FF00", // Green
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#800080", // Purple
    "#FFA500", // Orange
    "#808080", // Gray
    "#FFFFFF", // White
    "#000000", // Black
  ];

  // Function to handle popular color selection
  const handlePopularColorSelect = (selectedColor) => {
    setColor(selectedColor);
    onChange(selectedColor);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    // Regular expression to match a hex color code
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    // Check if the input value matches the color regex
    if (colorRegex.test(inputValue)) {
      // If the input value is a valid color, update the color state
      setColor(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <div className="colorPickerContainer">
      <div className="colorInputContainer">
        <div
          className="colorInputDisplay"
          style={{ backgroundColor: color }}
        ></div>

        <input
          className="colorInput"
          value={color}
          onChange={handleInputChange}
        />
      </div>

      <HexColorPicker color={color} onChange={handleColorChange} />

      <div className="popularColors">
        {popularColors.map((popularColor, index) => (
          <div
            className={`${
              color === popularColor
                ? "selectedPopularColorContainer"
                : "popularColorContainer"
            }`}
            key={index}
          >
            <div
              className={`${
                color === popularColor ? "selectedPopularColor" : "popularColor"
              }`}
              style={{ backgroundColor: popularColor }}
              onClick={() => handlePopularColorSelect(popularColor)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
