import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  validatePublicationStrategy,
  getPublicationFeedback,
  getProjectFeedback,
} from "../../../utils/section4/round4Utils";
import "./Round4_PublicationStrategy.css";

const Round4_PublicationStrategy = ({ data, onComplete, facultyColor }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [validated, setValidated] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  // Load data
  const scenario = data.scenario || "";
  const researchContext = data.researchContext || {};
  const projects = data.researchProjects || [];
  const channels = data.publicationChannels || [];

  // Check if all projects are assigned
  const allAssigned = projects.every((proj) => assignments[proj.id]);

  // Handle project click
  const handleProjectClick = useCallback(
    (project) => {
      if (!validated) {
        setSelectedProject(project);
      }
    },
    [validated]
  );

  // Handle channel selection
  const handleChannelSelect = useCallback(
    (channelId) => {
      if (!selectedProject || validated) return;

      setAssignments((prev) => ({
        ...prev,
        [selectedProject.id]: channelId,
      }));
      setSelectedProject(null);
    },
    [selectedProject, validated]
  );

  // Remove assignment
  const handleRemoveAssignment = useCallback(
    (e, projectId) => {
      e.stopPropagation();
      if (!validated) {
        setAssignments((prev) => {
          const newAssignments = { ...prev };
          delete newAssignments[projectId];
          return newAssignments;
        });
      }
    },
    [validated]
  );

  // Validate assignments
  const handleValidate = useCallback(() => {
    const result = validatePublicationStrategy(assignments, projects);
    setValidationResult(result);
    setValidated(true);
  }, [assignments, projects]);

  // Continue to next round
  const handleContinue = useCallback(() => {
    if (validationResult && onComplete) {
      onComplete({
        score: validationResult.totalScore,
        maxScore: validationResult.maxScore,
        percentage: validationResult.percentage,
        breakdown: validationResult.breakdown,
      });
    }
  }, [validationResult, onComplete]);

  // Get channel name by ID
  const getChannelById = useCallback(
    (channelId) => {
      return channels.find((ch) => ch.id === channelId);
    },
    [channels]
  );

  return (
    <div className="publication-strategy">
      {/* Header */}
      <div className="strategy-header">
        <h2 style={{ color: facultyColor || "#0000dc" }}>
          Round 4: Publikační strategie
        </h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      {/* Research Context */}
      {researchContext.title && (
        <div
          className="research-context"
          style={{ borderLeftColor: facultyColor || "#0000dc" }}
        >
          <h3>{researchContext.title}</h3>
          <div className="context-meta">
            <span className="context-field">
              <strong>Obor:</strong> {researchContext.field}
            </span>
          </div>
        </div>
      )}

      {/* Selected Project Indicator */}
      {selectedProject && !validated && (
        <div
          className="selected-indicator"
          style={{ borderLeftColor: facultyColor || "#0000dc" }}
        >
          <strong>Vybraný výzkum:</strong> {selectedProject.title} →{" "}
          <em>Nyní klikni na vhodný publikační kanál</em>
        </div>
      )}

      {/* Matching Workspace */}
      <div className="matching-workspace">
        {/* Research Projects Section */}
        <div className="projects-section">
          <h3 style={{ color: facultyColor || "#0000dc" }}>
            Výzkumné projekty
          </h3>
          <p className="section-instructions">
            Klikni na výzkum a pak vyber publikační kanál →
          </p>

          <div className="projects-list">
            {projects.map((project) => {
              const assignedChannel = assignments[project.id];
              const channel = assignedChannel
                ? getChannelById(assignedChannel)
                : null;
              const feedback = validated
                ? getProjectFeedback(
                    project.id,
                    validationResult?.projectFeedback
                  )
                : null;

              return (
                <div
                  key={project.id}
                  className={`project-card ${
                    selectedProject?.id === project.id ? "selected" : ""
                  } ${assignedChannel ? "assigned" : ""} ${
                    feedback ? feedback.className : ""
                  }`}
                  onClick={() => handleProjectClick(project)}
                  style={
                    selectedProject?.id === project.id
                      ? { borderColor: facultyColor || "#0000dc" }
                      : {}
                  }
                >
                  <div className="project-content">
                    <h4>{project.title}</h4>
                    <p className="project-description">{project.description}</p>

                    {/* Project Metadata */}
                    <div className="project-meta">
                      <span className="meta-badge">
                        <strong>Typ:</strong>{" "}
                        {project.type === "pilot"
                          ? "Pilotní studie"
                          : project.type === "meta_analysis"
                          ? "Meta-analýza"
                          : project.type === "replication"
                          ? "Replikace"
                          : project.type === "practical"
                          ? "Praktický návod"
                          : project.type === "breakthrough"
                          ? "Průlomový objev"
                          : project.type === "comparative"
                          ? "Komparativní"
                          : project.type === "update"
                          ? "Aktualizace"
                          : project.type}
                      </span>
                      {project.sample !== "n/a" && (
                        <span className="meta-badge">
                          <strong>Vzorek:</strong>{" "}
                          {project.sample === "small"
                            ? "Malý"
                            : project.sample === "medium"
                            ? "Střední"
                            : project.sample === "large"
                            ? "Velký"
                            : project.sample}
                        </span>
                      )}
                      <span className="meta-badge">
                        <strong>Dopad:</strong>{" "}
                        {project.impact === "incremental"
                          ? "Postupný"
                          : project.impact === "high"
                          ? "Vysoký"
                          : project.impact === "practical"
                          ? "Praktický"
                          : project.impact}
                      </span>
                    </div>

                    {/* Assigned Channel */}
                    {assignedChannel && (
                      <div className="assigned-channel">
                        <span
                          className="channel-badge"
                          style={{
                            backgroundColor: facultyColor || "#0000dc",
                          }}
                        >
                          {channel?.icon} {channel?.name}
                        </span>
                        {!validated && (
                          <button
                            className="remove-assignment-btn"
                            onClick={(e) =>
                              handleRemoveAssignment(e, project.id)
                            }
                            aria-label="Odebrat přiřazení"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}

                    {/* Feedback after validation */}
                    {validated && feedback && (
                      <div
                        className="project-feedback"
                        style={{ color: feedback.color }}
                      >
                        {feedback.icon} {feedback.message}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Publication Channels Section */}
        <div className="channels-section">
          <h3 style={{ color: facultyColor || "#0000dc" }}>
            Publikační kanály
          </h3>
          <p className="section-instructions">
            Vyber vhodný kanál pro vybraný výzkum
          </p>

          <div className="channels-grid">
            {channels.map((channel) => {
              return (
                <div
                  key={channel.id}
                  className={`channel-card ${
                    selectedProject && !validated ? "selectable" : ""
                  }`}
                  onClick={() => handleChannelSelect(channel.id)}
                  style={
                    selectedProject && !validated
                      ? { cursor: "pointer" }
                      : { cursor: "default" }
                  }
                >
                  <div className="channel-icon">{channel.icon}</div>
                  <h4>{channel.name}</h4>
                  <p className="channel-description">{channel.description}</p>

                  {/* Channel Attributes */}
                  <div className="channel-attributes">
                    {channel.attributes.map((attr, idx) => (
                      <span key={idx} className="attribute-tag">
                        {attr === "peer_reviewed"
                          ? "Recenzováno"
                          : attr === "high_impact"
                          ? "Vysoký impakt"
                          : attr === "medium_impact"
                          ? "Střední impakt"
                          : attr === "long_review"
                          ? "Dlouhé review"
                          : attr === "medium_review"
                          ? "Střední review"
                          : attr === "fast_review"
                          ? "Rychlé review"
                          : attr === "immediate"
                          ? "Okamžité"
                          : attr === "no_review"
                          ? "Bez review"
                          : attr === "open_access"
                          ? "Open Access"
                          : attr === "accessible"
                          ? "Přístupné"
                          : attr === "presentation"
                          ? "Prezentace"
                          : attr === "networking"
                          ? "Networking"
                          : attr === "wide_reach"
                          ? "Široký dosah"
                          : attr === "broad_audience"
                          ? "Široké publikum"
                          : attr === "early_feedback"
                          ? "Rychlá zpětná vazba"
                          : attr === "practitioners"
                          ? "Pro praktiky"
                          : attr}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {!validated ? (
          <button
            className="validate-btn"
            onClick={handleValidate}
            disabled={!allAssigned}
            style={{
              borderColor: facultyColor || "#0000dc",
              color: allAssigned ? facultyColor || "#0000dc" : "#9ca3af",
            }}
          >
            Ověřit přiřazení ({Object.keys(assignments).length}/{projects.length}
            )
          </button>
        ) : (
          <button
            className="continue-btn"
            onClick={handleContinue}
            style={{ backgroundColor: facultyColor || "#0000dc" }}
          >
            Pokračovat →
          </button>
        )}
      </div>

      {/* Results Section */}
      {validated && validationResult && (
        <div className="results-section">
          {/* Performance Feedback */}
          <div
            className="performance-feedback"
            style={{
              borderLeftColor: getPublicationFeedback(
                validationResult.percentage
              ).color,
            }}
          >
            <div className="feedback-header">
              <span className="feedback-icon">
                {getPublicationFeedback(validationResult.percentage).icon}
              </span>
              <h3
                style={{
                  color: getPublicationFeedback(validationResult.percentage)
                    .color,
                }}
              >
                {getPublicationFeedback(validationResult.percentage).level}
              </h3>
            </div>
            <p>
              {getPublicationFeedback(validationResult.percentage).message}
            </p>
          </div>

          {/* Score Summary */}
          <div className="score-summary">
            <h3 style={{ color: facultyColor || "#0000dc" }}>
              Výsledky Round 4
            </h3>
            <div className="score-display">
              <span className="score-number">{validationResult.totalScore}</span>
              <span className="score-separator">/</span>
              <span className="score-max">{validationResult.maxScore}</span>
              <span className="score-percentage">
                ({validationResult.percentage}%)
              </span>
            </div>

            {/* Score Breakdown */}
            <div className="score-breakdown">
              {validationResult.breakdown.map((item, idx) => (
                <div key={idx} className="breakdown-item">
                  <span className="breakdown-label">{item.label}</span>
                  <span
                    className={`breakdown-points ${
                      item.earned ? "earned" : "not-earned"
                    }`}
                  >
                    {item.earned ? "+" : ""}
                    {item.points} bodů
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Round4_PublicationStrategy.propTypes = {
  data: PropTypes.shape({
    scenario: PropTypes.string,
    researchContext: PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.string,
    }),
    researchProjects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string,
        sample: PropTypes.string,
        impact: PropTypes.string,
        correctChannels: PropTypes.arrayOf(PropTypes.string).isRequired,
        primaryChannel: PropTypes.string.isRequired,
      })
    ).isRequired,
    publicationChannels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
        suitableFor: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string,
};

Round4_PublicationStrategy.defaultProps = {
  facultyColor: "#0000dc",
};

export default Round4_PublicationStrategy;
