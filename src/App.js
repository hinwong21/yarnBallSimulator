import React, { useState, useRef, useEffect } from "react";
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
  const [upperSemiCircles, setUpperSemiCircles] = useState([]);
  const [lowerSemiCircles, setLowerSemiCircles] = useState([]);
  const upperCircleRef = useRef();
  const lowerCircleRef = useRef();
  const [showDisplay, setShowDisplay] = useState(false);
  const [displayUpperPathColors, setDisplayUpperPathColors] = useState([]);
  const [displayLowerPathColors, setDisplayLowerPathColors] = useState([]);

  const filledWhiteArr = new Array(60 * 10).fill("#FFFFFF");
  const [updateUpperPathColors, setUpdateUpperPathColors] = useState(
    filledWhiteArr.concat(filledWhiteArr)
  );
  const [updateLowerPathColors, setUpdateLowerPathColors] =
    useState(filledWhiteArr);

  const generateSemiCircles = () => {
    const newUpperSemiCircles = [];
    const newLowerSemiCircles = [];

    for (let i = 0; i < 10; i++) {
      const radius = 300 - i * 15;
      const zIndex = 10 + i * 10;
      const top = i * 15;
      const left = i * 15;

      newUpperSemiCircles.push(
        <Template
          key={`upper-${i}`}
          id={i}
          radius={radius}
          numParts={120}
          zIndex={zIndex}
          top={top}
          left={left}
          pathColor={selectedColor}
          showStroke
          colorArray={updateUpperPathColors}
          isUpper
        />
      );

      newLowerSemiCircles.push(
        <Template
          key={`lower-${i}`}
          id={i}
          radius={radius}
          numParts={120}
          zIndex={zIndex}
          bottom={top}
          left={left}
          pathColor={selectedColor}
          showStroke
          colorArray={updateLowerPathColors}
        />
      );
    }

    setUpperSemiCircles(newUpperSemiCircles);
    setLowerSemiCircles(newLowerSemiCircles);
  };

  let upperPathColorsTemp = {};
  let lowerPathColorsTemp = {};
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
    setDisplayUpperPathColors(Object.values(upperPathColorsFiltered));
    setDisplayLowerPathColors(Object.values(lowerPathColorsFiltered));
  };

  // Function to update upper semi-circle colors based on the clicked squares
  const updateSemiCircleColors = (updatedColors, isUpper) => {
    if (isUpper) {
      setUpdateUpperPathColors(updatedColors.concat(updatedColors));
    } else {
      setUpdateLowerPathColors(updatedColors);
    }
  };

  useEffect(() => {
    generateSemiCircles();
  }, [selectedColor, updateUpperPathColors, updateLowerPathColors]);

  return (
    <div className="App">
      <div className="editContainer">
        <div className="editPanel">
          <ColorPicker onChange={setSelectedColor} />

          <button onClick={getPathColors}>Get Path Colors</button>

          {/* Pass the updateUpperSemiCircleColors function to FillGrid component */}
          <FillGrid
            selectedColor={selectedColor}
            onUpdateSemiCircle={(updatedColors) =>
              updateSemiCircleColors(updatedColors, true)
            }
          />

          <FillGrid
            selectedColor={selectedColor}
            onUpdateSemiCircle={(updatedColors) =>
              updateSemiCircleColors(updatedColors, false)
            }
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
          upperPathColors={displayUpperPathColors}
          lowerPathColors={displayLowerPathColors}
        />
      )}
    </div>
  );
}

export default App;
