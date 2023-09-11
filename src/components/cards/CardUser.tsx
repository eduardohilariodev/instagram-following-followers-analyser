import React from "react";

interface CardUserProps {
  username: string;
  date: string;
  href: string;
}

const CardUser: React.FC<CardUserProps> = ({ username, date, href }) => {
  return (
    <li className="overflow-hidden bg-white/10 px-4 py-4 shadow backdrop-blur-sm sm:rounded-md sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-slate-300">
        {username}
      </h3>
      <p className="text-sm text-slate-500">{date}</p>
    </li>
  );
};
export default CardUser;
