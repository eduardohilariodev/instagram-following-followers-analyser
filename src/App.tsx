import React from "react";
import FileUploader from "./FileUploader";
import "@fontsource/space-grotesk";

const App: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex flex-row">
            <FileUploader />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
