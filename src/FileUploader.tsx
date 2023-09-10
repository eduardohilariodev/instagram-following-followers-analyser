// FileUploader.tsx

import React, { useState } from 'react';

const FileUploader: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');

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
    <div className="p-8">
      <input type="file" accept=".json" onChange={handleFileChange} />
      <pre className="mt-4 p-4 border rounded">{fileContent}</pre>
    </div>
  );
};

export default FileUploader;
