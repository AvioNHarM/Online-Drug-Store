import React, {
  ReactNode,
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const Button = ({
  children,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  href,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "flex cursor-pointer items-center justify-center overflow-hidden rounded-full font-semibold leading-normal tracking-wide transition-all";

  const variants = {
    primary: "bg-[var(--primary-color)] text-white shadow-md hover:bg-red-700",
    secondary:
      "bg-[var(--accent-color)] text-[var(--primary-color)] hover:bg-red-200",
  };

  const sizes = {
    default: "min-w-[90px] max-w-[480px] h-11 px-5 text-sm",
    large:
      "min-w-[180px] h-14 px-8 text-lg shadow-xl hover:scale-105 duration-300 ease-in-out",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    // Check if the href is an internal link (starts with /)
    const isInternalLink = href.startsWith("/") || href.startsWith("#");

    if (isInternalLink) {
      return (
        <Link href={href} className={classes} {...props}>
          <span className="truncate">{children}</span>
        </Link>
      );
    }

    // External link
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <span className="truncate">{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      <span className="truncate">{children}</span>
    </button>
  );
};

export default Button;
