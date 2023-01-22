import type React from "react";
import Styles from "./Button.module.scss";

function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type: "primary" | "secondary";
}) {
  const secondClass = type === "primary" ? Styles.primary : Styles.secondary;

  return (
    <div onClick={onClick} className={`${Styles.button} ${secondClass}`}>
      {children}
    </div>
  );
}

export default Button;
