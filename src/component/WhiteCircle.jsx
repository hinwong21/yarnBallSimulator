import React from "react";

export const WhiteCircle = () => {
  return (
    <div
      className="whiteCircle"
      style={{
        position: "absolute",
        backgroundColor: "white",
        borderRadius: "50%",
        zIndex: 999,
        width: "calc(280px + 10px)",
        height: "calc(285px + 35px)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 30,
      }}
    >
      65mm
    </div>
  );
};
