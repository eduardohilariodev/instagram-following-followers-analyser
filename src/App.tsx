import React from "react";
import FileUploader from "./FileUploader";

const App: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <FileUploader />
    </div>
  );
};

export default App;
