import React from "react";

interface Prediction {
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
  const handleViewClick = () => {
    // Handle the VIEW button click for a specific prediction
  };

  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.description}</td>
      <td>{data.timestamp}</td>
      <td>
        <button onClick={handleViewClick}>VIEW</button>
      </td>
    </tr>
  );
};

export default PredictionTable;
