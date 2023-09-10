// FileUploader.tsx

import React, { useState } from "react";

const FileUploader: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <label className="cursor-pointer rounded bg-pink-700 px-4 py-2 text-white hover:bg-blue-600">
        Upload JSON
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden" // this hides the input
        />
      </label>

      <pre>{fileContent}</pre>
    </>
  );
};

export default FileUploader;
