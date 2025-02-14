"use client";
import React, { useState } from "react";
import { NavLink } from "./NavLink";
import { EditWebNavLinks } from "./EditWebNavLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

export const CustomizableNavigation = () => {
  const links = useSelector((state: RootState) => state.links.activeLinks);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <p className="font-medium text-xl">OPComTs</p>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-x-2">
          <EditWebNavLinks />
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FontAwesomeIcon icon={faX} className="w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="w-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((navLink) => (
            <NavLink
              key={navLink.id}
              title={navLink.title}
              link={navLink.link}
            />
          ))}
          <EditWebNavLinks />
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`lg:hidden overflow-hidden flex flex-col gap-4 transition-["height"] duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="h-0 max-h-0"></div>
        {links.map((navLink) => (
          <NavLink key={navLink.id} title={navLink.title} link={navLink.link} />
        ))}
      </ul>
    </nav>
  );
};
