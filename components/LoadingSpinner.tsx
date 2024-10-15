import { FC } from "react";

const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="loader"></div>
    <style jsx>{`
      .loader {
        border: 8px solid rgba(255, 255, 255, 0.3);
        border-top: 8px solid #3498db; /* Change color as needed */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
