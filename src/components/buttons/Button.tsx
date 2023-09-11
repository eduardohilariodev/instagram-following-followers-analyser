import React from "react";

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  variant = "primary",
}) => {
  const baseStyles =
    "rounded-lg backdrop-blur-sm px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center hover:drop-shadow-lg";
  const primaryStyles =
    "bg-white/80  text-slate-900 hover:bg-white/90  focus-visible:outline-pink-500";
  const secondaryStyles =
    "bg-white/5 text-slate-100 hover:bg-white/10 focus-visible:outline-slate-500 border border-slate-500";

  const buttonStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button className={`${baseStyles} ${buttonStyles}`} onClick={onClick}>
      {icon && <span className="mr-3">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
