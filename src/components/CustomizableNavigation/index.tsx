"use client";
import React from "react";
import { NavLink } from "./NavLink";
import { EditWebNavLinks } from "./EditWebNavLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const CustomizableNavigation = () => {
  const links = useSelector((state: RootState) => state.links.activeLinks);
  // const dispatch = useAppDispatch();

  return (
    <nav className="flex justify-between px-8 py-4 bg-indigo-700 text-white">
      <div className="flex items-center gap-2">
        <p className="font-medium text-xl">OPComTs</p>
      </div>
      <ul className="flex items-center gap-8">
        {links.map((navLink) => (
          <NavLink key={navLink.id} title={navLink.title} link={navLink.link} />
        ))}
        <EditWebNavLinks />
      </ul>
    </nav>
  );
};
