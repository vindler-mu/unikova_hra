import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Check, X, Info, Trash2, Plus } from "lucide-react";
import {
  validateQuery,
  calculateScore,
  getPerformanceFeedback,
  queryToString,
} from "../../../utils/section1/round2Utils";

/**
 * Round 2: Boolean Query Builder
 * Interactive component for building search queries with boolean operators
 */
const BooleanQueryBuilder = ({ scenarioData, onComplete, facultyColor }) => {
  const [queryBlocks, setQueryBlocks] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [validated, setValidated] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);

  // Add a term to the query
  const addTerm = useCallback((term) => {
    setQueryBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "term",
        value: term.text,
        category: term.category,
      },
    ]);
    setValidated(false);
  }, []);

  // Add an operator
  const addOperator = useCallback((operatorType) => {
    setQueryBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "operator",
        value: operatorType,
      },
    ]);
    setValidated(false);
  }, []);

  // Remove a block
  const removeBlock = useCallback((blockId) => {
    setQueryBlocks((prev) => prev.filter((block) => block.id !== blockId));
    setValidated(false);
  }, []);

  // Clear all blocks
  const clearQuery = useCallback(() => {
    setQueryBlocks([]);
    setValidated(false);
    setValidationResult(null);
    setScoreResult(null);
  }, []);

  // Convert linear query blocks to tree structure
  const buildQueryTree = useCallback((blocks) => {
    if (blocks.length === 0) return null;

    // Simple conversion: group by operators
    // This is a simplified parser - in production, you'd want proper parsing
    const terms = blocks.filter((b) => b.type === "term");
    const operators = blocks.filter((b) => b.type === "operator");

    if (terms.length === 0) return null;

    // Find NOT operators and their targets
    const notIndices = [];
    blocks.forEach((block, idx) => {
      if (block.type === "operator" && block.value === "NOT") {
        notIndices.push(idx);
      }
    });

    // Build tree bottom-up
    let tree = { type: "term", value: terms[0].value };

    // If we have multiple terms, combine with operators
    if (terms.length > 1) {
      const andOperators = operators.filter((op) => op.value === "AND");
      const orOperators = operators.filter((op) => op.value === "OR");
      const notOperators = operators.filter((op) => op.value === "NOT");

      // Build based on most common operator
      let mainOp = "AND";
      if (orOperators.length > andOperators.length) {
        mainOp = "OR";
      }

      const children = terms.map((term) => ({
        type: "term",
        value: term.value,
      }));

      // Apply NOT to appropriate terms
      const processedChildren = children.map((child, idx) => {
        // Check if this term should be negated
        const termBlock = blocks.find(
          (b) => b.type === "term" && b.value === child.value
        );
        const termIndex = blocks.indexOf(termBlock);

        // Check if there's a NOT before this term
        const hasNotBefore = blocks
          .slice(0, termIndex)
          .some(
            (b, i) =>
              b.type === "operator" &&
              b.value === "NOT" &&
              !blocks.slice(i + 1, termIndex).some((x) => x.type === "term")
          );

        if (hasNotBefore || (notOperators.length > 0 && idx === children.length - 1)) {
          return {
            type: "NOT",
            children: [child],
          };
        }
        return child;
      });

      tree = {
        type: mainOp,
        children: processedChildren,
      };
    }

    return tree;
  }, []);

  // Validate the query
  const handleValidate = useCallback(() => {
    const queryTree = buildQueryTree(queryBlocks);

    const validation = validateQuery(queryTree, scenarioData.validation);
    setValidationResult(validation);

    const score = calculateScore(validation, scenarioData.scoring);
    setScoreResult(score);

    setValidated(true);
  }, [queryBlocks, scenarioData, buildQueryTree]);

  // Handle completion
  const handleContinue = useCallback(() => {
    if (scoreResult && onComplete) {
      onComplete({
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage,
        query: buildQueryTree(queryBlocks),
        isValid: validationResult.isValid,
      });
    }
  }, [scoreResult, validationResult, onComplete, buildQueryTree, queryBlocks]);

  const performanceFeedback = scoreResult
    ? getPerformanceFeedback(scoreResult.percentage)
    : null;

  return (
    <div className="boolean-query-builder">
      {/* Scenario Header */}
      <div className="scenario-header">
        <h2 className="scenario-title">{scenarioData.scenario.title}</h2>
        <p className="scenario-instruction">
          {scenarioData.scenario.instruction}
        </p>
        <div className="scenario-goal">
          <Info size={18} />
          <span>{scenarioData.scenario.goal}</span>
        </div>
      </div>

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="instructions-panel">
          <div className="instructions-header">
            <h3>Jak sestavit dotaz</h3>
            <button
              onClick={() => setShowInstructions(false)}
              className="close-instructions"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="instructions-list">
            <li>
              <strong>1.</strong> Vyberte pojmy kliknutím na tlačítka níže
            </li>
            <li>
              <strong>2.</strong> Mezi pojmy vložte operátory (AND, OR, NOT)
            </li>
            <li>
              <strong>3.</strong> AND = oba pojmy musí být, OR = alespoň jeden,
              NOT = vyloučit
            </li>
            <li>
              <strong>4.</strong> Validujte dotaz a získejte zpětnou vazbu
            </li>
          </ul>
        </div>
      )}

      <div className="builder-layout">
        {/* Left: Term Bank */}
        <div className="term-bank">
          <h3 className="bank-title">Dostupné pojmy</h3>
          <div className="terms-grid">
            {scenarioData.availableTerms.map((term) => (
              <button
                key={term.id}
                onClick={() => addTerm(term)}
                className={`term-button category-${term.category}`}
                title={`Kategorie: ${term.category}`}
              >
                <Plus size={14} />
                <span>{term.text}</span>
              </button>
            ))}
          </div>

          <div className="operators-section">
            <h4 className="operators-title">Operátory</h4>
            {scenarioData.operators.map((op) => (
              <button
                key={op.id}
                onClick={() => addOperator(op.id)}
                className={`operator-button operator-${op.id.toLowerCase()}`}
                title={op.description}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Query Construction Area */}
        <div className="query-area">
          <div className="query-header">
            <h3>Váš dotaz</h3>
            {queryBlocks.length > 0 && (
              <button onClick={clearQuery} className="clear-button">
                <Trash2 size={14} />
                Vymazat vše
              </button>
            )}
          </div>

          <div className="query-blocks">
            {queryBlocks.length === 0 ? (
              <div className="empty-query">
                <p>Začněte výběrem pojmů a operátorů z levého panelu</p>
              </div>
            ) : (
              queryBlocks.map((block, index) => (
                <div key={block.id} className="query-block-wrapper">
                  <div
                    className={`query-block ${
                      block.type === "term" ? "block-term" : "block-operator"
                    }`}
                  >
                    <span className="block-content">{block.value}</span>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="remove-block"
                      title="Odstranit"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  {index < queryBlocks.length - 1 && (
                    <span className="block-connector">→</span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Validation Button */}
          {queryBlocks.length > 0 && !validated && (
            <button onClick={handleValidate} className="validate-button">
              <Check size={18} />
              Validovat dotaz
            </button>
          )}

          {/* Validation Results */}
          {validated && validationResult && (
            <div className={`validation-result ${validationResult.isValid ? "valid" : "invalid"}`}>
              <div className="validation-header">
                {validationResult.isValid ? (
                  <>
                    <Check size={20} className="icon-success" />
                    <h4>Dotaz je v pořádku!</h4>
                  </>
                ) : (
                  <>
                    <X size={20} className="icon-error" />
                    <h4>Dotaz vyžaduje úpravy</h4>
                  </>
                )}
              </div>

              <p className="validation-feedback">{validationResult.feedback}</p>

              {!validationResult.isValid && validationResult.issues.length > 0 && (
                <div className="validation-issues">
                  <h5>Problémy:</h5>
                  <ul>
                    {validationResult.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Score Display */}
              {scoreResult && (
                <div className="score-panel">
                  <div className="score-header">
                    <span className="score-number">{scoreResult.score}</span>
                    <span className="score-max">/ {scoreResult.maxScore}</span>
                    <span className="score-percentage">
                      ({scoreResult.percentage}%)
                    </span>
                  </div>

                  {performanceFeedback && (
                    <div
                      className="performance-badge"
                      style={{ backgroundColor: performanceFeedback.color }}
                    >
                      <span>{performanceFeedback.icon}</span>
                      <span>{performanceFeedback.level}</span>
                    </div>
                  )}

                  <div className="score-breakdown">
                    {scoreResult.breakdown.map((item, idx) => (
                      <div key={idx} className="breakdown-item">
                        <span className="breakdown-label">{item.label}</span>
                        <span
                          className={`breakdown-points ${
                            item.earned ? "earned" : "not-earned"
                          }`}
                        >
                          {item.earned ? "+" : ""}
                          {item.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button onClick={handleContinue} className="continue-button">
                Pokračovat na další kolo →
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .boolean-query-builder {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .scenario-header {
          background: white;
          border: 2px solid ${facultyColor || "#0000dc"};
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .scenario-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: ${facultyColor || "#0000dc"};
          margin: 0 0 1rem 0;
        }

        .scenario-instruction {
          font-size: 1.05rem;
          color: #374151;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .scenario-goal {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(59, 130, 246, 0.1);
          border-left: 3px solid #3b82f6;
          border-radius: 4px;
          color: #1e40af;
          font-size: 0.95rem;
        }

        .instructions-panel {
          background: #f8f9ff;
          border: 1px solid #e0e7ff;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .instructions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .instructions-header h3 {
          font-size: 1rem;
          font-weight: bold;
          color: #1e40af;
          margin: 0;
        }

        .close-instructions {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
        }

        .close-instructions:hover {
          color: #374151;
        }

        .instructions-list {
          margin: 0;
          padding-left: 1.5rem;
          color: #4b5563;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .instructions-list li {
          margin: 0.5rem 0;
        }

        .builder-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .term-bank {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          position: sticky;
          top: 1rem;
        }

        .bank-title {
          font-size: 1rem;
          font-weight: bold;
          color: #374151;
          margin: 0 0 1rem 0;
        }

        .terms-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .term-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.8rem;
          background: white;
          border: 1.5px solid #d1d5db;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          text-align: left;
        }

        .term-button:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .term-button.category-main {
          border-color: #3b82f6;
          color: #1e40af;
        }

        .term-button.category-specific {
          border-color: #8b5cf6;
          color: #6d28d9;
        }

        .term-button.category-exclude {
          border-color: #ef4444;
          color: #dc2626;
        }

        .term-button.category-context,
        .term-button.category-concept {
          border-color: #10b981;
          color: #047857;
        }

        .operators-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
        }

        .operators-title {
          font-size: 0.9rem;
          font-weight: bold;
          color: #6b7280;
          margin: 0 0 0.75rem 0;
        }

        .operator-button {
          display: block;
          width: 100%;
          padding: 0.6rem;
          margin-bottom: 0.5rem;
          background: white;
          border: 2px solid #374151;
          border-radius: 6px;
          font-weight: bold;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .operator-button.operator-and {
          border-color: #3b82f6;
          color: #1e40af;
        }

        .operator-button.operator-and:hover {
          background: #dbeafe;
        }

        .operator-button.operator-or {
          border-color: #10b981;
          color: #047857;
        }

        .operator-button.operator-or:hover {
          background: #d1fae5;
        }

        .operator-button.operator-not {
          border-color: #ef4444;
          color: #dc2626;
        }

        .operator-button.operator-not:hover {
          background: #fee2e2;
        }

        .query-area {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          min-height: 400px;
        }

        .query-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .query-header h3 {
          font-size: 1.1rem;
          font-weight: bold;
          color: #374151;
          margin: 0;
        }

        .clear-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid #dc2626;
          border-radius: 6px;
          color: #dc2626;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-button:hover {
          background: #fef2f2;
        }

        .query-blocks {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
          min-height: 80px;
          padding: 1rem;
          background: #f9fafb;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .empty-query {
          width: 100%;
          text-align: center;
          color: #9ca3af;
          font-size: 0.9rem;
        }

        .query-block-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .query-block {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .block-term {
          background: #dbeafe;
          border: 1.5px solid #3b82f6;
          color: #1e40af;
        }

        .block-operator {
          background: #374151;
          color: white;
          font-weight: bold;
          border: 1.5px solid #1f2937;
        }

        .block-content {
          flex: 1;
        }

        .remove-block {
          background: rgba(0, 0, 0, 0.1);
          border: none;
          border-radius: 3px;
          padding: 0.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .remove-block:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        .block-connector {
          color: #9ca3af;
          font-weight: bold;
        }

        .validate-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: ${facultyColor || "#0000dc"};
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .validate-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .validation-result {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid;
        }

        .validation-result.valid {
          background: #f0fdf4;
          border-color: #22c55e;
        }

        .validation-result.invalid {
          background: #fef2f2;
          border-color: #ef4444;
        }

        .validation-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .validation-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .icon-success {
          color: #22c55e;
        }

        .icon-error {
          color: #ef4444;
        }

        .validation-feedback {
          color: #374151;
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .validation-issues {
          background: rgba(239, 68, 68, 0.1);
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .validation-issues h5 {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          color: #dc2626;
        }

        .validation-issues ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #991b1b;
          font-size: 0.85rem;
        }

        .validation-issues li {
          margin: 0.25rem 0;
        }

        .score-panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .score-header {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .score-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: ${facultyColor || "#0000dc"};
          font-family: monospace;
        }

        .score-max {
          font-size: 1.2rem;
          color: #6b7280;
          font-family: monospace;
        }

        .score-percentage {
          font-size: 1rem;
          color: #9ca3af;
          font-family: monospace;
        }

        .performance-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 6px;
          color: white;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .score-breakdown {
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          font-size: 0.9rem;
        }

        .breakdown-label {
          color: #6b7280;
        }

        .breakdown-points {
          font-weight: bold;
          font-family: monospace;
        }

        .breakdown-points.earned {
          color: #22c55e;
        }

        .breakdown-points.not-earned {
          color: #ef4444;
        }

        .continue-button {
          width: 100%;
          padding: 1rem;
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1.05rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .continue-button:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        @media (max-width: 768px) {
          .builder-layout {
            grid-template-columns: 1fr;
          }

          .term-bank {
            position: relative;
            top: 0;
          }

          .boolean-query-builder {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

BooleanQueryBuilder.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string,
};

export default BooleanQueryBuilder;
