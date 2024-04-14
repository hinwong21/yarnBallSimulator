import React, { useState, useRef } from "react";
import "./App.css";
import { Template } from "./Template";
import { ColorPicker } from "./component/ColorPicker";
import { WhiteCircle } from "./component/WhiteCircle";
import { filterAndReducePathColors } from "./useFetch/filterPathColors";
import { Display } from "./component/Display";
import { FillAssist } from "./component/FillAssist";
import { FillGrid } from "./component/FillGrid";

function App() {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const upperSemiCircles = [];
  const lowerSemiCircles = [];
  const upperCircleRef = useRef();
  const lowerCircleRef = useRef();
  const [showDisplay, setShowDisplay] = useState(false);
  const [upperPathColors, setUpperPathColors] = useState([]);
  const [lowerPathColors, setLowerPathColors] = useState([]);

  const filledWhiteArrTemp = new Array(120 * 10).fill("#FFFFFF");
  const filledWhiteArr = [];
  for (let i = 0; i < filledWhiteArrTemp.length; i += 119) {
    filledWhiteArr.push(filledWhiteArrTemp.slice(i, i + 119));
  }
  const [updateUpperPathColors, setUpdateUpperPathColors] =
    useState(filledWhiteArr);

  const upperPathColorsTemp = {};
  const lowerPathColorsTemp = {};

  // Function to get path colors from upper and lower circles
  const getPathColors = () => {
    const upperPaths = Array.from(
      upperCircleRef.current.querySelectorAll("path")
    );
    const lowerPaths = Array.from(
      lowerCircleRef.current.querySelectorAll("path")
    );

    upperPaths.forEach((path, index) => {
      const color = path.getAttribute("fill");
      const key = Math.floor(index / 60) + 1; // Calculate the corresponding key
      upperPathColorsTemp[key] = upperPathColorsTemp[key] || [];
      upperPathColorsTemp[key].push(color);
    });

    const upperPathColorsFiltered = filterAndReducePathColors(
      upperPathColorsTemp,
      true
    );

    lowerPaths.forEach((path, index) => {
      const color = path.getAttribute("fill");
      const key = Math.floor(index / 60) + 1; // Calculate the corresponding key
      lowerPathColorsTemp[key] = lowerPathColorsTemp[key] || [];
      lowerPathColorsTemp[key].push(color);
    });

    const lowerPathColorsFiltered = filterAndReducePathColors(
      lowerPathColorsTemp,
      false
    );

    // show Display and give props
    setShowDisplay(true);
    setUpperPathColors(Object.values(upperPathColorsFiltered));
    setLowerPathColors(Object.values(lowerPathColorsFiltered));
  };

  // Function to update upper semi-circle colors based on the clicked squares
  const updateUpperSemiCircleColors = (updatedColors) => {
    // Initialize an array to hold arrays of 60 colors each
    const organizedColors = [];

    // Loop through the updatedColors array and organize colors into arrays of 60 elements each
    for (let i = 0; i < updatedColors.length; i += 60) {
      organizedColors.push(updatedColors.slice(i, i + 60));
    }

    // Concatenate the updatedColors for each array
    const concatenatedColors = organizedColors.map((colorsArray) =>
      colorsArray.concat(colorsArray)
    );

    setUpdateUpperPathColors(concatenatedColors);
  };

  const colorArray = new Array(60 * 10).fill("#FFFFFF");
  // Loop 10 times
  for (let i = 0; i <= 10; i++) {
    // Calculate radius and zIndex
    const radius = 300 - i * 15;
    const zIndex = 10 + i * 10;
    const top = i * 15;
    const left = i * 15;

    // Add Template component with calculated props to templates array
    upperSemiCircles.push(
      <Template
        key={`upper-${i}`}
        id={`upper-${i}`}
        radius={radius}
        numParts={120}
        zIndex={zIndex}
        top={top}
        left={left}
        pathColor={selectedColor}
        showStroke
        colorArray={updateUpperPathColors[i]}
      />
    );

    lowerSemiCircles.push(
      <Template
        key={`lower-${i}`}
        id={`lower-${i}`}
        radius={radius}
        numParts={120}
        zIndex={zIndex}
        bottom={top}
        left={left}
        pathColor={selectedColor}
        showStroke
        colorArray={colorArray}
      />
    );
  }

  return (
    <div className="App">
      <div className="editContainer">
        <div className="editPanel">
          <ColorPicker onChange={setSelectedColor} />

          <button onClick={getPathColors}>Get Path Colors</button>

          {/* Pass the updateUpperSemiCircleColors function to FillGrid component */}
          <FillGrid
            selectedColor={selectedColor}
            onUpdateUpperSemiCircle={updateUpperSemiCircleColors}
          />
        </div>

        <div className="boxContainer">
          <div className="upperSemiCircle" ref={upperCircleRef}>
            {upperSemiCircles}
          </div>

          <div className="lowerSemiCircleContainer" ref={lowerCircleRef}>
            <div className="lowerSemiCircle">{lowerSemiCircles}</div>
          </div>

          <WhiteCircle />

          <FillAssist />
        </div>
      </div>

      {showDisplay && (
        <Display
          upperPathColors={upperPathColors}
          lowerPathColors={lowerPathColors}
        />
      )}
    </div>
  );
}

export default App;
