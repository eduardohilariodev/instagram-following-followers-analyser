import React, { useState, useRef } from "react";
import JSZip from "jszip";
import CardUser from "./components/cards/CardUser";
import { relativeTimeSince } from "./helpers/time";
import Button from "./components/buttons/Button";

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
  const [nonFollowing, setNonFollowing] = useState<StringListData[] | null>(
    null,
  );
  const [nonFollowers, setNonFollowers] = useState<StringListData[] | null>(
    null,
  );
  const [mutualFollowers, setMutualFollowers] = useState<
    StringListData[] | null
  >(null);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    inputFileRef.current?.click();
  };

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

        computeRelationships(followingDataParsed, followersDataParsed);
      } catch (error) {
        console.error("Failed to process zip file", error);
      }
    };
    void processUpload();
  };

  const computeRelationships = (
    followingData: FollowingDataSet,
    followersData: FollowersDataSet,
  ) => {
    const getUsername = (item: InstagramData) =>
      item.string_list_data[0]?.value;

    const followingUsernames =
      followingData.relationships_following.map(getUsername);
    const followersUsernames = followersData.map(getUsername);

    const transformToData = (user: InstagramData) => ({
      href: `https://www.instagram.com/${getUsername(user)}/`,
      value: getUsername(user),
      timestamp: user.string_list_data[0]?.timestamp,
    });

    const sortAndSet = (
      data: StringListData[],
      setter: React.Dispatch<React.SetStateAction<StringListData[] | null>>,
    ) => {
      const sortedData = data.sort((a, b) => a.value.localeCompare(b.value));
      setter(sortedData);
    };

    const nonFollowingData = followersData
      .filter((follower) => !followingUsernames.includes(getUsername(follower)))
      .map(transformToData);

    const nonFollowersData = followingData.relationships_following
      .filter(
        (followedUser) =>
          !followersUsernames.includes(getUsername(followedUser)),
      )
      .map(transformToData);

    const mutualFollowersData = followingData.relationships_following
      .filter((followedUser) =>
        followersUsernames.includes(getUsername(followedUser)),
      )
      .map(transformToData);

    sortAndSet(nonFollowingData, setNonFollowing);
    sortAndSet(nonFollowersData, setNonFollowers);
    sortAndSet(mutualFollowersData, setMutualFollowers);
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-6 ">
        <div className="col-span-6 mb-6 text-center">
          <Button label="Upload zip" onClick={triggerFileInput} />
          <input
            ref={inputFileRef}
            id="zipUpload"
            type="file"
            accept=".zip"
            onChange={handleZipUpload}
            className="hidden"
          />
        </div>
        <div className="col-span-2">
          <h4>{nonFollowing?.length} that I don&apos;t follow back</h4>
          <div className="h-96 space-y-6 overflow-scroll">
            <ul role="list" className="space-y-3">
              {nonFollowing?.map((user) => (
                <CardUser
                  key={user.value}
                  username={user.value}
                  date={relativeTimeSince(user.timestamp)}
                  href={user.href}
                ></CardUser>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <h4>{mutualFollowers?.length} mutual followers</h4>
          <div className="h-96 overflow-scroll">
            {mutualFollowers?.map((user) => (
              <CardUser
                key={user.value}
                username={user.value}
                date={relativeTimeSince(user.timestamp)}
                href={user.href}
              ></CardUser>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h4>{nonFollowers?.length} that don&apos;t follow me back</h4>
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
