import React from "react";
import PropTypes from "prop-types";

/**
 * Terminal-style wrapper for Section 1 rounds
 * Provides consistent terminal aesthetic matching the rest of the game
 */
const TerminalWrapper = ({ roundNumber, roundName, facultyName, children }) => {
  return (
    <div className="terminal-container">
      {/* Matrix background */}
      <div className="matrix-background">
        <div className="matrix-rain">
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="loading-dots">
                {Math.random().toString(2).repeat(150)}
              </div>
            ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "16px 32px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <span className="terminal-prompt">
            muni-agent@section1:/round{roundNumber}_{roundName}$ {facultyName &&  `[${facultyName}]`}
          </span>
        </div>

        {/* Terminal content */}
        <div className="terminal-content" style={{minHeight: "600px"}}>
          {children}
        </div>
      </div>
    </div>
  );
};

TerminalWrapper.propTypes = {
  roundNumber: PropTypes.number.isRequired,
  roundName: PropTypes.string.isRequired,
  facultyName: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TerminalWrapper;
