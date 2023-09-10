import React, { useState } from "react";
import changesets from "json-diff-ts";

const FileUploader: React.FC = () => {
  const [following, setFollowing] = useState<string>("");
  const [followers, setFollowers] = useState<string>("");
  const [diffResult, setDiffResult] = useState<any[]>([]);

  const sortByStringValue = (diffs: changesets.IChange[]) => {
    return diffs.sort((a, b) => {
      const aValue = a.string_list_data?.[0]?.value || "";
      const bValue = b.string_list_data?.[0]?.value || "";
      return aValue.localeCompare(bValue);
    });
  };

  const handleFollowing = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, setFollowing);
  };

  const handleFollowers = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, setFollowers);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setter(content);
        // Call the calculateDiff function if both files are loaded
        calculateDiff(following, followers);
      };
      reader.readAsText(file);
    }
  };

  const calculateDiff = (a: string, b: string) => {
    const oldObj = JSON.parse(a);
    const newObj = JSON.parse(b);
    const diffs = changesets.diff(oldObj, newObj); // Step 3: Use the diff function
    const sortedDiffs = sortByStringValue(diffs);

    setDiffResult(diffs);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <input type="file" accept=".json" onChange={handleFollowing} />
          <div className="h-96 w-96 overflow-scroll">
            <pre>{following}</pre>
          </div>
        </div>

        <div className="col-span-1">
          <input type="file" accept=".json" onChange={handleFollowers} />
          <div className="h-96 w-96 overflow-scroll">
            <pre>{followers}</pre>
          </div>
        </div>

        <div className="col-span-2">
          <h2>Diff Result:</h2>
          <div className="h-96  overflow-scroll">
            <pre>{JSON.stringify(diffResult, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploader;
