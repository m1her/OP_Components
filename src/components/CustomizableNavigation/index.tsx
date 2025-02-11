import React from "react";
import { NavLink } from "./NavLink";
import { defaultPcNavs } from "./data";
import { EditWebNavLinks } from "./EditWebNavLinks";

export const CustomizableNavigation = () => {
  return (
    <nav className="flex justify-between px-8 py-4 bg-indigo-700 text-white">
      <div className="flex items-center gap-2">
        <p className="font-medium text-xl">OPComTs</p>
      </div>
      <ul className="flex items-center gap-8">
        {defaultPcNavs.map((navLink) => (
          <NavLink
            key={navLink.id}
            title={navLink.title}
            link={navLink.link}
          />
        ))}
        <EditWebNavLinks />
      </ul>
    </nav>
  );
};
