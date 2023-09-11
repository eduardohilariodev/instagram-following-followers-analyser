import React from "react";

interface CardProps {
  children: React.ReactNode;
  href?: string;
}

const Card: React.FC<CardProps> = ({ children, href }) => {
  const content = (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      {children}
    </div>
  );

  if (href) {
    return (
      <a target="_blank" rel="noreferrer" href={href}>
        {content}
      </a>
    );
  }

  return content;
};

export default Card;
