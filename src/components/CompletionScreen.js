import React from 'react';
import { Award } from 'lucide-react';

const CompletionScreen = ({ 
  databaseIntegrity, 
  finalTime, 
  wrongAnswersCount, 
  formatTime, 
  getEpilogueData, 
  FINAL_CODE 
}) => {
  const epilogue = getEpilogueData(databaseIntegrity, finalTime, wrongAnswersCount);

  return (
    <div className="completion-screen">
      <div className="completion-content">
        <Award className="completion-icon" />
        <h1 className="completion-title">{epilogue.title}</h1>

        <div className="status-bar" style={{ backgroundColor: '#d1fae5', border: '2px solid #22c55e', marginBottom: '32px' }}>
          <h2 className="completion-achievement">{epilogue.achievement}</h2>
          <p className="completion-description">{epilogue.description}</p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value status-info">{formatTime(finalTime)}</div>
              <div className="stat-label">Celkový čas</div>
            </div>
            <div className="stat-item">
              <div className="stat-value status-success">{databaseIntegrity}%</div>
              <div className="stat-label">Integrita databáze</div>
            </div>
            <div className="stat-item">
              <div className="stat-value status-critical">{wrongAnswersCount}</div>
              <div className="stat-label">Chybné odpovědi</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#8b5cf6' }}>{FINAL_CODE}</div>
              <div className="stat-label">Finální kód</div>
            </div>
          </div>

          <div className="status-bar" style={{ backgroundColor: '#faf5ff', border: '2px solid #8b5cf6', marginTop: '24px' }}>
            <h3 className="task-title">Osud AI.gor</h3>
            <p className="task-description">{epilogue.aigorFate}</p>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="modal-button primary"
          style={{
            padding: '16px 32px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            transform: 'scale(1)',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🔄 Hrát znovu
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;