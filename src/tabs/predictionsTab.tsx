import React, { useState } from "react";
import PredictionModal from "./predictionModal";

interface Prediction {
  image: any;
  title: string;
  description: string;
  timestamp: string;
  predictions: PredictionItem[];
}

interface PredictionItem {
  bbox: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  label: string;
  score: string;
}

interface PredictionTableProps {
  predictions: Prediction[];
}

const PredictionTable: React.FC<PredictionTableProps> = ({ predictions }) => {
  return (
    <div>
      <h2>Predictions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Timestamp</th>
            <th>VIEW</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <PredictionRow key={index} data={prediction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface PredictionRowProps {
  data: Prediction;
}

const PredictionRow: React.FC<PredictionRowProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.description}</td>
      <td>{data.image.timeOfUpload}</td>
      <td>
        <button onClick={handleViewClick}>VIEW</button>
      </td>
      {isModalOpen && (
        <PredictionModal
          prediction={data}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </tr>
  );
};

export default PredictionTable;
