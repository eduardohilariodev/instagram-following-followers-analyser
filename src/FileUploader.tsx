import React, { useState } from "react";
import JSZip from "jszip";
import CardUser from "./components/CardUser";
import { relativeTimeSince } from "./helpers/time";

interface StringListData {
  href: string;
  value: string;
  timestamp: string;
}

interface InstagramData {
  title: string;
  media_list_type: string;
  string_list_data: StringListData[];
}

interface FollowingDataSet {
  relationships_following: InstagramData[];
}

type FollowersDataSet = InstagramData[];

const FileUploader: React.FC = () => {
  const [nonFollowers, setNonFollowers] = useState<StringListData[] | null>(
    null,
  );

  const handleZipUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const processUpload = async () => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const zip = new JSZip();
        const data = await zip.loadAsync(file);

        const followingDataRaw =
          await data.files["followers_and_following/following.json"].async(
            "string",
          );
        const followingDataParsed = JSON.parse(
          followingDataRaw,
        ) as FollowingDataSet;

        const followersDataRaw =
          await data.files["followers_and_following/followers_1.json"].async(
            "string",
          );
        const followersDataParsed = JSON.parse(
          followersDataRaw,
        ) as FollowersDataSet;

        computeNonFollowersUsingData(followingDataParsed, followersDataParsed);
      } catch (error) {
        console.error("Failed to process zip file", error);
      }
    };
    void processUpload();
  };

  const computeNonFollowersUsingData = (
    followingData: FollowingDataSet,
    followersData: FollowersDataSet,
  ) => {
    const followingArray = followingData.relationships_following;
    const followersArray = followersData;

    if (!Array.isArray(followingArray) || !Array.isArray(followersArray)) {
      return;
    }

    const followerUsernames = followersArray.map(
      (item) => item.string_list_data[0]?.value,
    );

    const nonFollowersData = followingArray
      .filter(
        (followedUser) =>
          !followerUsernames.includes(followedUser.string_list_data[0]?.value),
      )
      .map((nonFollower) => ({
        href: `https://www.instagram.com/${nonFollower.string_list_data[0]?.value}/`,
        value: nonFollower.string_list_data[0]?.value,
        timestamp: nonFollower.string_list_data[0]?.timestamp,
      }));
    // sort by username
    const nonFollowersDataSorted = nonFollowersData.sort((a, b) => {
      return a.value.localeCompare(b.value);
    });
    setNonFollowers(nonFollowersDataSorted);
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <label
            htmlFor="zipUpload"
            className="rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
          >
            Upload zip
          </label>
          <input
            id="zipUpload"
            type="file"
            accept=".zip"
            onChange={handleZipUpload}
            className="hidden"
          />
        </div>

        <div className="col-span-2">
          <h2>Users you follow that don&apos;t follow you back</h2>
          <div className="h-96 overflow-scroll">
            {nonFollowers?.map((user) => (
              <CardUser
                key={user.value}
                username={user.value}
                date={relativeTimeSince(user.timestamp)}
                href={user.href}
              ></CardUser>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploader;
