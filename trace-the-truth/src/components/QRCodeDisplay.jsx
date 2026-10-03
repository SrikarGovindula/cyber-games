import React from 'react';
import ScanAnimation from './ScanAnimation';

const QRCodeDisplay = ({ isScanning }) => {
  return (
    <div className="qr-box">

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <rect
          width="100"
          height="100"
          fill="white"
        />

        <path
          d="M10 10H30V30H10V10ZM15 15V25H25V15H15Z"
          fill="black"
        />

        <path
          d="M70 10H90V30H70V10ZM75 15V25H85V15H75Z"
          fill="black"
        />

        <path
          d="M10 70H30V90H10V70ZM15 75V85H25V75H15Z"
          fill="black"
        />

        <rect
          x="40"
          y="10"
          width="10"
          height="10"
          fill="black"
        />

        <rect
          x="55"
          y="10"
          width="10"
          height="10"
          fill="black"
        />

        <rect
          x="40"
          y="25"
          width="25"
          height="10"
          fill="black"
        />

        <rect
          x="10"
          y="40"
          width="10"
          height="10"
          fill="black"
        />

        <rect
          x="25"
          y="40"
          width="25"
          height="10"
          fill="black"
        />

        <rect
          x="55"
          y="40"
          width="10"
          height="25"
          fill="black"
        />

        <rect
          x="70"
          y="40"
          width="20"
          height="10"
          fill="black"
        />

        <rect
          x="10"
          y="55"
          width="25"
          height="10"
          fill="black"
        />

        <rect
          x="40"
          y="55"
          width="10"
          height="10"
          fill="black"
        />

        <rect
          x="70"
          y="55"
          width="10"
          height="25"
          fill="black"
        />

        <rect
          x="85"
          y="55"
          width="5"
          height="10"
          fill="black"
        />

        <rect
          x="40"
          y="70"
          width="25"
          height="10"
          fill="black"
        />

        <rect
          x="40"
          y="85"
          width="10"
          height="5"
          fill="black"
        />

        <rect
          x="55"
          y="85"
          width="20"
          height="5"
          fill="black"
        />

        <rect
          x="80"
          y="85"
          width="10"
          height="5"
          fill="black"
        />

      </svg>

      {isScanning && <ScanAnimation />}

    </div>
  );
};

export default QRCodeDisplay;