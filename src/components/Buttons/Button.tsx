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
    console.log("Handling click: ", onClick, link);
    if (onClick) {
      onClick();
    } else if (link) {
      console.log("Hitting link: ", link);
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
