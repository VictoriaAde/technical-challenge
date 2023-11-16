import React from "react";
import "../styles/imageTab.css";

interface PredictionModalProps {
  prediction: Prediction;
  onClose: () => void;
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  prediction,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="custom-modal">
        <h2>{prediction.title}</h2>
        <p>{prediction.description}</p>
        <img src={`./${prediction.image.filename}`} alt="Predicted Image" />
        <div>
          {prediction.predictions &&
            prediction.predictions.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${item.bbox.x1}%`,
                  top: `${item.bbox.y1}%`,
                  width: `${item.bbox.x2 - item.bbox.x1}%`,
                  height: `${item.bbox.y2 - item.bbox.y1}%`,
                  border: "2px solid red",
                  backgroundColor: "transparent",
                  pointerEvents: "none", // Make sure the rectangles don't interfere with clicks
                }}
              >
                {/* Display label and score */}
                <p>{`${item.label} - Score: ${item.score}`}</p>
              </div>
            ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default PredictionModal;
