import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.state = { hasError: true, error, errorInfo };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="terminal-container">
          <div
            style={{
              position: "relative",
              zIndex: 10,
              padding: "32px",
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div className="terminal-header">
              <div className="terminal-button close"></div>
              <div className="terminal-button minimize"></div>
              <div className="terminal-button maximize"></div>
              <span className="terminal-prompt">muni-agent@error:/system$</span>
            </div>

            <div className="terminal-content">
              <h1
                style={{
                  color: "#ff0000",
                  fontSize: "2rem",
                  marginBottom: "24px",
                }}
              >
                ⚠️ SYSTÉMOVÁ CHYBA
              </h1>
              <p style={{ color: "#6666dd", marginBottom: "16px" }}>
                Nastala neočekávaná chyba v systému. Zkuste prosím obnovit
                stránku.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="modal-button primary"
                style={{ marginTop: "24px" }}
              >
                🔄 RESTARTOVAT SYSTÉM
              </button>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details style={{ marginTop: "32px", textAlign: "left" }}>
                  <summary style={{ color: "#ff0000", cursor: "pointer" }}>
                    Technické detaily (pouze pro vývojáře)
                  </summary>
                  <pre
                    style={{
                      color: "#6666dd",
                      fontSize: "0.875rem",
                      marginTop: "16px",
                      padding: "16px",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: "4px",
                      overflow: "auto",
                    }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
