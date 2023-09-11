import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
}) => {
  const baseStyles =
    "rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const primaryStyles =
    "bg-pink-500 text-white hover:bg-pink-400 focus-visible:outline-pink-500";
  const secondaryStyles =
    "bg-white text-pink-500 hover:bg-pink-100 focus-visible:outline-pink-500 border border-pink-500";

  const buttonStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button className={`${baseStyles} ${buttonStyles}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
