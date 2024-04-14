import React from "react";
import "../css/FillAssist.css";
import { FillAssistTemplate } from "./FillAssistTemplate";

export const FillAssist = () => {
  return (
    <div className="fillAssistContainer">
      <div className="upperFillAssist">
        <FillAssistTemplate radius={150} numParts={24} showStroke />
      </div>

      <div className="lowerSemiCircleContainer">
        <div className="lowerFillAssist">
          <FillAssistTemplate radius={150} numParts={24} showStroke />
        </div>
      </div>
    </div>
  );
};
