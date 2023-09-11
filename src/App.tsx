import React from "react";
import FileUploader from "./FileUploader";
import "@fontsource/space-grotesk";
import { Instagram } from "lucide-react";
import Button from "./components/buttons/Button";
const App: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex h-screen flex-col items-center justify-center gap-6">
          <h3 className="mb-6 flex items-center justify-center gap-3">
            <Instagram className="inline" /> Instagram analyser
          </h3>
          <p>
            First download your data from Instagram on the <strong>JSON</strong>{" "}
            format.
          </p>
          <Button
            label="Download data"
            onClick={() => {
              window.open(
                "https://www.instagram.com/download/request/",
                "_blank",
              );
            }}
            variant="secondary"
            icon={<Instagram size={14} />}
          />
          <p>then</p>
          <div className="flex flex-row">
            <FileUploader />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
