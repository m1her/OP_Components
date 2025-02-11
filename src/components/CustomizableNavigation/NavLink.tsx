import Link from "next/link";
import React from "react";

export const NavLink = ({ link, title }: { link: string; title: string }) => {
  return (
    <li>
      <Link
        className="text-white/90 hover:text-white font-medium relative before:w-0 hover:before:w-[105%] before:h-0.5 before:bg-white before:absolute before:top-6 transition-all duration-150 before:transition-all before:duration-150"
        href={link}
      >
        {title}
      </Link>
    </li>
  );
};
