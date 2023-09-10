import React, { useState } from "react";

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
  const [following, setFollowing] = useState<FollowingDataSet | null>(null);
  const [followers, setFollowers] = useState<FollowersDataSet | null>(null);
  const [nonFollowers, setNonFollowers] = useState<StringListData[] | null>(
    null,
  );

  const handleFollowingUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as FollowingDataSet;
        setFollowing(data);

        computeNonFollowers();
      };
      reader.readAsText(file);
    }
  };

  const handleFollowersUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as FollowersDataSet;
        setFollowers(data);

        computeNonFollowers();
      };
      reader.readAsText(file);
    }
  };

  const computeNonFollowers = () => {
    const followingArray = following?.relationships_following;
    const followersArray = followers;

    if (
      !followingArray ||
      !Array.isArray(followingArray) ||
      !Array.isArray(followersArray)
    ) {
      return;
    }
    const followingUsernames = followingArray.map(
      (item) => item.string_list_data[0]?.value,
    );
    const followerUsernames = followersArray.map(
      (item) => item.string_list_data[0]?.value,
    );

    const nonFollowBack = followingUsernames.filter(
      (username) => !followerUsernames.includes(username),
    );
    const nonFollowersData = nonFollowBack.map((username) => ({
      href: `https://www.instagram.com/${username}/`,
      value: username,
      timestamp: new Date().toISOString(),
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
          <label className="text-xl">Following</label>
          <input
            type="file"
            accept="application/json"
            onChange={handleFollowingUpload}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl">Followers</label>
          <input
            type="file"
            accept="application/json"
            onChange={handleFollowersUpload}
          />
        </div>
        <div className="col-span-2">
          <button onClick={computeNonFollowers}>Compute Non-Followers</button>
        </div>
        <div className="col-span-2">
          <h2>Users you follow that don&apos;t follow you back</h2>
          <div className="h-96 overflow-scroll">
            {nonFollowers?.map((user) => (
              <div key={user.value}>
                <a target="_blank" rel="noopener noreferrer" href={user.href}>
                  {user.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploader;
