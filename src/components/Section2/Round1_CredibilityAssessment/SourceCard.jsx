import React from "react";
import PropTypes from "prop-types";
import { getCredibilityBadge, getSeverityBadge } from "../../../utils/section2/round1Utils";
import "./SourceCard.css";

/**
 * SourceCard Component
 * Displays source information for credibility assessment
 * Supports both ranking and detective modes
 */
const SourceCard = ({
  source,
  mode,
  rank,
  showResult,
  scoreInfo,
  identifiedFlags,
  onToggleFlag,
  facultyColor
}) => {
  const credibilityBadge = getCredibilityBadge(source.credibilityScore || 50);

  /**
   * RANKING MODE RENDER
   */
  if (mode === "ranking") {
    return (
      <div className="source-card ranking-mode">
        <div className="source-header">
          <div className="rank-badge" style={{ backgroundColor: facultyColor }}>
            #{rank}
          </div>
          <h3 className="source-title">{source.title}</h3>
        </div>

        <div className="source-metadata">
          <div className="metadata-row">
            <span className="label">Autoři:</span>
            <span className="value">
              {source.authors && source.authors.length > 0
                ? source.authors.map(a => a.name).join(", ")
                : "Unknown"}
            </span>
          </div>

          {source.authors && source.authors[0]?.affiliation && (
            <div className="metadata-row">
              <span className="label">Afiliace:</span>
              <span className="value">{source.authors[0].affiliation}</span>
            </div>
          )}

          <div className="metadata-row">
            <span className="label">Publikace:</span>
            <span className="value">
              {source.publication.name}
              {source.publication.impactFactor && (
                <span className="impact-factor"> (IF: {source.publication.impactFactor})</span>
              )}
            </span>
          </div>

          <div className="metadata-row">
            <span className="label">Typ:</span>
            <span className="value">{source.publication.type}</span>
          </div>

          <div className="metadata-row">
            <span className="label">Rok:</span>
            <span className="value">{source.year}</span>
          </div>

          <div className="metadata-row">
            <span className="label">Citace:</span>
            <span className="value">{source.citations || 0}</span>
          </div>

          {source.doi && (
            <div className="metadata-row">
              <span className="label">DOI:</span>
              <span className="value doi">{source.doi}</span>
            </div>
          )}
        </div>

        {source.redFlags && source.redFlags.length > 0 && (
          <div className="red-flags-indicator">
            ⚠️ {source.redFlags.length} problém{source.redFlags.length > 1 ? 'y' : ''}
          </div>
        )}

        {showResult && scoreInfo && (
          <div className={`score-indicator ${scoreInfo.earned === 20 ? 'correct' : 'incorrect'}`}>
            <div className="score-label">{scoreInfo.feedback}</div>
            <div className="score-points">+{scoreInfo.earned} bodů</div>
          </div>
        )}
      </div>
    );
  }

  /**
   * DETECTIVE MODE RENDER
   */
  if (mode === "detective") {
    const isRedFlagIdentified = (flagId) => {
      return identifiedFlags && identifiedFlags.includes(flagId);
    };

    const getRedFlagByLocation = (location) => {
      return source.redFlags.find(f => f.location === location);
    };

    return (
      <div className="source-card detective-mode">
        <div className="source-header">
          <h3 className="source-title">{source.title}</h3>
        </div>

        <div className="source-content">
          {/* Author Section */}
          <div
            className={`detective-section author-section ${
              getRedFlagByLocation("author_section") ? 'has-flag' : ''
            }`}
            onClick={() => {
              const flag = getRedFlagByLocation("author_section");
              if (flag && onToggleFlag) {
                onToggleFlag(flag.id);
              }
            }}
          >
            <div className="section-label">📝 Autoři:</div>
            <div className="section-content">
              {source.authors && source.authors.map((author, idx) => (
                <div key={idx} className="author-info">
                  <strong>{author.name}</strong>
                  {author.affiliation && <span> - {author.affiliation}</span>}
                  {author.credentials && <span className="credentials"> ({author.credentials})</span>}
                  {!author.affiliation && !author.credentials && (
                    <span className="no-info"> (bez uvedené afiliace)</span>
                  )}
                </div>
              ))}
            </div>

            {getRedFlagByLocation("author_section") && isRedFlagIdentified(getRedFlagByLocation("author_section").id) && (
              <div className="flag-badge identified">
                <span className="flag-icon">🚩</span>
                Označeno jako problém
              </div>
            )}
          </div>

          {/* Publication Section */}
          <div
            className={`detective-section publication-section ${
              getRedFlagByLocation("journal_name") ? 'has-flag' : ''
            }`}
            onClick={() => {
              const flag = getRedFlagByLocation("journal_name");
              if (flag && onToggleFlag) {
                onToggleFlag(flag.id);
              }
            }}
          >
            <div className="section-label">📚 Publikace:</div>
            <div className="section-content">
              <div><strong>{source.publication.name}</strong></div>
              <div>Typ: {source.publication.type}</div>
              {source.publication.impactFactor ? (
                <div>Impact Factor: {source.publication.impactFactor}</div>
              ) : (
                <div className="no-info">Impact Factor: neuvedeno</div>
              )}
              {source.publication.isPredatory && (
                <div className="warning-text">⚠️ Podezření na predátorský časopis</div>
              )}
            </div>

            {getRedFlagByLocation("journal_name") && isRedFlagIdentified(getRedFlagByLocation("journal_name").id) && (
              <div className="flag-badge identified">
                <span className="flag-icon">🚩</span>
                Označeno jako problém
              </div>
            )}
          </div>

          {/* Metrics Section */}
          <div
            className={`detective-section metrics-section ${
              getRedFlagByLocation("metrics_section") ? 'has-flag' : ''
            }`}
            onClick={() => {
              const flag = getRedFlagByLocation("metrics_section");
              if (flag && onToggleFlag) {
                onToggleFlag(flag.id);
              }
            }}
          >
            <div className="section-label">📊 Metriky:</div>
            <div className="section-content">
              <div>Rok publikace: {source.year}</div>
              <div>Počet citací: {source.citations || 0}</div>
              {source.doi ? (
                <div>DOI: {source.doi}</div>
              ) : (
                <div className="no-info">DOI: neuvedeno</div>
              )}
            </div>

            {getRedFlagByLocation("metrics_section") && isRedFlagIdentified(getRedFlagByLocation("metrics_section").id) && (
              <div className="flag-badge identified">
                <span className="flag-icon">🚩</span>
                Označeno jako problém
              </div>
            )}
          </div>
        </div>

        {/* Show all red flags after validation */}
        {showResult && source.redFlags && source.redFlags.length > 0 && (
          <div className="red-flags-revealed">
            <h4>Problémy ve zdroji:</h4>
            {source.redFlags.map((flag) => {
              const severityBadge = getSeverityBadge(flag.severity);
              const wasIdentified = isRedFlagIdentified(flag.id);

              return (
                <div
                  key={flag.id}
                  className={`red-flag-item ${wasIdentified ? 'identified' : 'missed'}`}
                >
                  <div className="flag-header">
                    <span
                      className="severity-badge"
                      style={{ backgroundColor: severityBadge.color }}
                    >
                      {severityBadge.icon} {severityBadge.label}
                    </span>
                    {wasIdentified ? (
                      <span className="status-badge found">✓ Nalezeno</span>
                    ) : (
                      <span className="status-badge missed">✗ Přehlédnuto</span>
                    )}
                  </div>
                  <div className="flag-description">{flag.description}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return null;
};

SourceCard.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        affiliation: PropTypes.string,
        credentials: PropTypes.string
      })
    ),
    publication: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      impactFactor: PropTypes.number,
      isOpenAccess: PropTypes.bool,
      isPredatory: PropTypes.bool
    }).isRequired,
    year: PropTypes.number.isRequired,
    citations: PropTypes.number,
    doi: PropTypes.string,
    credibilityScore: PropTypes.number,
    redFlags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        severity: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string
      })
    )
  }).isRequired,
  mode: PropTypes.oneOf(["ranking", "detective"]).isRequired,
  rank: PropTypes.number,
  showResult: PropTypes.bool,
  scoreInfo: PropTypes.object,
  identifiedFlags: PropTypes.arrayOf(PropTypes.string),
  onToggleFlag: PropTypes.func,
  facultyColor: PropTypes.string
};

SourceCard.defaultProps = {
  rank: null,
  showResult: false,
  scoreInfo: null,
  identifiedFlags: [],
  onToggleFlag: null,
  facultyColor: "#0000dc"
};

export default SourceCard;
