import React, { useState, useEffect } from 'react';

const FinalCompletionSequence = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timeline Sequence:
    
    // 0s   - STEP 0: "FINALLY!" transition immediately active
    // 3s   - STEP 1: CONGRATULATIONS! for 5 seconds
    const t1 = setTimeout(() => setStep(1), 3000); 

    // 8s   - STEP 2: Display 3 badges POP-UP for 3 seconds
    const t2 = setTimeout(() => setStep(2), 8000);

    // 11s  - STEP 3: Merge Badges -> Master Badge + Confetti + Glow
    const t3 = setTimeout(() => setStep(3), 11000);

    // 13s  - STEP 4: Quote appears below the badge for 9 seconds
    const t4 = setTimeout(() => setStep(4), 13000);

    // 22s  - STEP 5: Badge & Quote slide up AND disappear
    const t5 = setTimeout(() => setStep(5), 22000);

    // 23s  - STEP 6: Reporting Links show cleanly without overlap
    const t6 = setTimeout(() => setStep(6), 23500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  return (
    <div className="app-container sequence-bg" style={{ overflow: 'hidden' }}>
      
      {/* STEP 0: FINALLY! */}
      {step === 0 && (
        <div className="sequence-step active">
          <div className="center-content text-center">
            <h1 className="glow-text-green zoom-in-fade" style={{ fontSize: '5rem', letterSpacing: '5px' }}>
              FINALLY!
            </h1>
          </div>
        </div>
      )}

      {/* STEP 1: Congratulations Screen (Disappears at step 2) */}
      {step === 1 && (
        <div className="sequence-step active">
          <div className="center-content text-center fade-in">
            <h1 className="glow-text-gold" style={{ fontSize: '4rem', marginBottom: '20px' }}>
              🎉 CONGRATULATIONS!
            </h1>
          </div>
        </div>
      )}

      {/* STEP 2-5: Badges & Quote Wrapper */}
      {step >= 2 && step <= 5 && (
        <div className="sequence-step active" style={{ alignItems: 'flex-start', paddingTop: '15vh' }}>
          <div className={`center-content text-center d-flex flex-column align-items-center ${step === 5 ? 'slide-up-disappear' : ''}`} style={{ width: '100%', maxWidth: '800px', gap: '40px' }}>
            
            {/* STEP 2: Spread Badges */}
            {step === 2 && (
              <div className="badges-spread-container fade-in">
                <div className="badge-item pop-in delay-1">
                  <span className="badge-icon glow-blue">🛡️</span>
                  <p>Level 1 Badge</p>
                </div>
                <div className="badge-item pop-in delay-2">
                  <span className="badge-icon glow-purple">📱</span>
                  <p>Level 2 Badge</p>
                </div>
                <div className="badge-item pop-in delay-3">
                  <span className="badge-icon glow-gold">🔍</span>
                  <p>Level 3 Cyber Awareness</p>
                </div>
              </div>
            )}

            {/* STEP 3-5: Merged Master Badge */}
            {step >= 3 && (
              <div className="merged-badge-container">
                 {/* Invisible anchor to ensure the master badge pop occurs from the center */}
                 {step === 3 && (
                   <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                     <div className="badge-item badge-left">
                       <span className="badge-icon glow-blue">🛡️</span>
                     </div>
                     <div className="badge-item badge-center">
                       <span className="badge-icon glow-purple">📱</span>
                     </div>
                     <div className="badge-item badge-right">
                       <span className="badge-icon glow-gold">🔍</span>
                     </div>
                   </div>
                 )}
                 
                 {step >= 3 && (
                   <div className="badge-burst confetti-burst delay-2"></div>
                 )}
                 {step >= 3 && (
                   <div className="master-badge-container pop-in delay-2 badge-glow-shine" style={{ position: 'relative', zIndex: 10 }}>
                     <div className="master-badge zoom-pulse" style={{ fontSize: '8rem', marginBottom: '10px' }}>
                       🏆
                     </div>
                     <h2 className="glow-text-gold">CYBER AWARENESS CHAMPION</h2>
                   </div>
                 )}
              </div>
            )}

            {/* STEP 4-5: Praise Quote */}
            {step >= 4 && (
              <div className="quote-container fade-in" style={{ maxWidth: '700px', padding: '30px', background: 'rgba(0, 0, 0, 0.6)', border: '1px solid var(--neon-blue)', borderRadius: '15px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
                <h2 style={{ fontStyle: 'italic', lineHeight: '1.5', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                  “Not every hero writes code —<br/>
                  some simply know when not to trust the trap.”
                </h2>
              </div>
            )}

          </div>
        </div>
      )}

      {/* STEP 6: Final Links Render */}
      {step >= 6 && (
        <div className="sequence-step active" style={{ alignItems: 'center' }}>
          <div className="reporting-info fade-in cyber-panel mx-auto" style={{ maxWidth: '600px', textAlign: 'center', padding: '40px' }}>
            <h2 className="glow-text-red mb-4" style={{ fontSize: '2.5rem' }}>Report Cyber Threats</h2>
            <div className="links-container d-flex flex-column gap-3 mb-4">
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="cyber-link fade-in delay-1">
                https://cybercrime.gov.in
              </a>
              <a href="https://www.cert-in.org.in" target="_blank" rel="noreferrer" className="cyber-link fade-in delay-2">
                https://www.cert-in.org.in
              </a>
              <a href="https://www.consumerhelpline.gov.in" target="_blank" rel="noreferrer" className="cyber-link fade-in delay-3">
                https://www.consumerhelpline.gov.in
              </a>
            </div>
            <p className="mt-4" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
              Helpful portals for reporting cyber threats and protecting others from online scams.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default FinalCompletionSequence;
