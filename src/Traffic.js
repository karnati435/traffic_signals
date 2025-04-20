import React, { useState, useEffect } from "react";
import "./Traffic.css";

const signals = ["orange", "green", "red"];

const Traffic = () => {
  const [currentSignal, setCurrentSignal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentSignal((prev) => {
          if (prev === signals.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, 2000);
    }

    // Cleanup interval when component unmounts or isRunning changes
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTrafficCycle = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="traffic-container">
      <h2>Traffic Signal</h2>
      <div className="signal-box">
        {signals.map((color, i) => (
          <div
            key={i}
            className={`circle ${color} ${i === currentSignal ? "active" : ""}`}
          ></div>
        ))}
      </div>
      <button onClick={startTrafficCycle}>
        {isRunning ? "Stop Traffic Signals" : "Start Traffic Signals"}
      </button>
    </div>
  );
};

export default Traffic;
