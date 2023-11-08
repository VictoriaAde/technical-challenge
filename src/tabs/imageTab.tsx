import React, { useState } from "react";
import "../styles/imageTab.css";
import PredictionTable from "./predictionsTab";

const ImageTable: React.FC = () => {
  const [imageData, setImageData] = useState([
    {
      filename: "image1.jpg",
      size: "2 MB",
      timeOfUpload: "2023-10-30 14:30:00",
    },
    {
      filename: "image2.png",
      size: "1.5 MB",
      timeOfUpload: "2023-10-30 15:45:00",
    },
  ]);

  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [predictions, setPredictions] = useState<{}[]>([]);

  const handlePredictClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      const newImageData = [...imageData];

      newImageData.push({
        filename: uploadedFile.name,
        size: `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`,
        timeOfUpload: new Date().toLocaleString(),
      });

      setImageData(newImageData);
      setHighlightedRow(newImageData.length - 1);

      // Remove the highlight after 3 seconds (adjust the duration as needed)
      setTimeout(() => {
        setHighlightedRow(null);
      }, 2000);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    // Make a POST request to the JSON server with the title, description, and image data
    const data = {
      title,
      description,
      image: imageData[selectedImageIndex || 0], // Use the selected image data
    };

    fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response from the server
        console.log("Response from the server:", responseData);
        // Update predictions state with the received data
        setPredictions([...predictions, responseData]);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });

    // Close the dialog
    setIsDialogOpen(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th>Filename of the Image</th>
            <th>Size of the Image</th>
            <th>Time of Upload</th>
            <th>PREDICT</th>
          </tr>
        </thead>
        <tbody>
          {imageData.map((image, index) => (
            <ImageRow
              key={index}
              data={image}
              onPredictClick={() => handlePredictClick(index)}
              isHighlighted={index === highlightedRow}
            />
          ))}
        </tbody>
      </table>
      {isDialogOpen && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <h2>Enter Prediction Details</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleDialogClose}>Cancel</button>
            <button onClick={handleDialogSubmit}>Submit</button>
          </div>
        </div>
      )}
      {predictions.length > 0 && <PredictionTable predictions={predictions} />}
    </div>
  );
};

interface ImageRowProps {
  data: {
    filename: string;
    size: string;
    timeOfUpload: string;
  };
  onPredictClick: () => void;
  isHighlighted: boolean;
}

const ImageRow: React.FC<ImageRowProps> = ({
  data,
  onPredictClick,
  isHighlighted,
}) => {
  return (
    <tr style={{ backgroundColor: isHighlighted ? "#c8e6c9" : "transparent" }}>
      <td>{data.filename}</td>
      <td>{data.size}</td>
      <td>{data.timeOfUpload}</td>
      <td>
        <button onClick={onPredictClick}>PREDICT</button>
      </td>
    </tr>
  );
};

export default ImageTable;
