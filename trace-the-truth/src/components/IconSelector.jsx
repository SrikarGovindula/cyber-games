import React from 'react';

const IconSelector = ({ onSelectApp, onBack }) => {
  return (
    <div className="app-container" style={{ background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button className="btn-cyber back-sys-btn" onClick={onBack}>&lt; SYS BACK</button>
      
      <h2 className="glow-text-blue" style={{ fontFamily: 'var(--font-cyber)', marginBottom: '50px', fontSize: '2rem' }}>
        SELECT INTERFACE
      </h2>

      <div style={{ display: 'flex', gap: '50px' }}>
        <div 
          className="glow-box-blue"
          style={{
            width: '150px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '20px',
            background: 'rgba(0, 229, 255, 0.1)',
            transition: 'all 0.3s'
          }}
          onClick={() => onSelectApp('gmail')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-10px)';
            e.currentTarget.style.background = 'rgba(0, 229, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>📧</div>
          <span style={{ fontFamily: 'var(--font-cyber)', color: 'var(--neon-blue)' }}>GMAIL</span>
        </div>

        <div 
          className="glow-box-green"
          style={{
            width: '150px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '20px',
            background: 'rgba(0, 255, 0, 0.1)',
            transition: 'all 0.3s'
          }}
          onClick={() => onSelectApp('messages')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-10px)';
            e.currentTarget.style.background = 'rgba(0, 255, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.background = 'rgba(0, 255, 0, 0.1)';
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>💬</div>
          <span style={{ fontFamily: 'var(--font-cyber)', color: 'var(--neon-green)' }}>MESSAGES</span>
        </div>
      </div>
    </div>
  );
};

export default IconSelector;
