import React from "react";
import FileUploader from "./FileUploader";
import "@fontsource/space-grotesk";
import { Instagram } from "lucide-react";
const App: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex h-screen flex-col items-center justify-center">
          <h3 className="mb-6 flex items-center justify-center gap-3">
            <Instagram className="inline" /> Instagram analyser
          </h3>
          <div className="flex flex-row">
            <FileUploader />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
