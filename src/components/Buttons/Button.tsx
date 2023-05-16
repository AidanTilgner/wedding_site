import type React from "react";
import Styles from "./Button.module.scss";

function Button({
  children,
  onClick,
  type,
  link,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
  type: "primary" | "secondary";
}) {
  const secondClass = type === "primary" ? Styles.primary : Styles.secondary;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.location.href = link;
    }
  };

  return (
    <div onClick={handleClick} className={`${Styles.button} ${secondClass}`}>
      {children}
    </div>
  );
}

export default Button;
