import React from 'react';

const ReportSystem = ({ onConfirm, onCancel }) => {
  return (
    <div className="report-overlay">
      <div className="report-popup cyber-border">
        <h3 className="glow-text-red">REPORT POST</h3>
        <p>Report this post as scam?</p>
        <div className="report-actions">
          <button className="btn-cyber btn-danger" onClick={onConfirm}>YES</button>
          <button className="btn-cyber btn-secondary" onClick={onCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default ReportSystem;
