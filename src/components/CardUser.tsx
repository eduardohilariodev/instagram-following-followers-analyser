import React from "react";
import Card from "./Card";

interface CardUserProps {
  username: string;
  date: string;
  href: string;
}

const CardUser: React.FC<CardUserProps> = ({ username, date, href }) => {
  return (
    <Card href={href}>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {username}
      </h3>
      <p className="text-sm text-gray-500">
        <a href="#">{date}</a>
      </p>
    </Card>
  );
};
export default CardUser;
