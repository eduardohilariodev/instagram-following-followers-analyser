import React from "react";

interface CardUserProps {
  username: string;
  date: string;
  href: string;
}

const CardUser: React.FC<CardUserProps> = ({ username, date }) => {
  return (
    <li className="border-1 border border-white/10  bg-white/5 px-4 py-4 shadow-lg backdrop-blur-sm sm:rounded-md sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-slate-300">
        {username}
      </h3>
      <p className="text-sm text-slate-500">{date}</p>
    </li>
  );
};
export default CardUser;
