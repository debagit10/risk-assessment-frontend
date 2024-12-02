import React, { useState } from "react";
import logo from "../images/logo.png";

const Dial = ({ value }) => {
  // Calculate rotation based on value (0-100 mapped to -90deg to +90deg)
  const calculateRotation = (value) => {
    return (value - 50) * 1.8; // Maps 0-100 to -90 to 90 degrees
  };

  return (
    <div className="backdrop-blur-lg bg-white/10 bg-opacity-50 border border-white/30 shadow-xl rounded-lg p-6 text-gray-200">
      <div className="flex flex-col items-center justify-center ">
        {/* Gauge Container */}
        <div className="relative w-64 h-32 rounded-t-full">
          {/* Marks and Labels */}
          <div className="absolute inset-28 flex items-center justify-center ">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark, index) => (
              <div
                key={index}
                className="absolute text-sm font-bold text-gray-600"
                style={{
                  transform: `rotate(${
                    -90 - index * -18
                  }deg) translate(0, -120px)`,
                }}
              >
                {mark}
              </div>
            ))}
          </div>

          {/* Gauge Indicator */}

          <div
            className="absolute left-1/2 top-1/4 w-1 h-20 transform origin-bottom transition-transform"
            style={{
              transform: `rotate(${calculateRotation(
                value
              )}deg) translate(-50%, 0)`,
              backgroundColor:
                value < 35 ? "#b91c1c" : value < 70 ? "#d97706" : "#16a34a",
            }}
          >
            <div className="absolute left-1/2 -top-6 w-0 h-0 border-l-4 border-r-4 border-b-8 border-b-white border-l-transparent border-r-transparent transform -translate-x-1/2" />
          </div>

          {/* Origin Mark */}
          <img
            src={logo}
            alt="tentyl"
            className="absolute w-7 h-7 bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[18.5%]"
          />
        </div>

        {/* Value Display */}
        <div
          className="mt-4 text-xl font-semibold"
          style={{
            color: value < 35 ? "#b91c1c" : value < 70 ? "#d97706" : "#16a34a",
          }}
        >
          {value}%
        </div>

        {/* Slider to Adjust Value */}
        {/* <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          className="w-64 mt-4"
        /> */}
      </div>
    </div>
  );
};

export default Dial;
