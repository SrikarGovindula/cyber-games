import React from 'react';

const QRResultMessage = ({
  isError,
  title,
  explanation,
  buttonText = "NEXT",
  onContinue
}) => {

  return (
    <div className="qr-result-overlay">

      <div
        className={`qr-result-dialog ${
          isError ? 'error' : 'success'
        }`}
      >

        <h2
          className={
            isError
              ? 'text-red'
              : 'text-green'
          }
        >
          {title}
        </h2>

        <div
          style={{
            marginTop: '10px',
            fontSize: '1.2rem',
            whiteSpace: 'pre-line'
          }}
        >

          <strong>
            Explanation:
          </strong>

          <p style={{ marginTop: '5px' }}>
            {explanation}
          </p>

        </div>

        <div style={{ marginTop: '30px' }}>

          <button
            className="btn-cyber"
            onClick={onContinue}
          >
            {buttonText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default QRResultMessage;