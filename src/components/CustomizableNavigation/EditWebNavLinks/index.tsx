"use client";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLinkType } from "../data";
import { DraggableLink } from "./DraggableLink";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import update from "immutability-helper";

export const EditWebNavLinks = () => {
  const [links, setLinks] = useState([
    { id: "1", index: 1, title: "Home", link: "/" },
    { id: "2", index: 2, title: "About", link: "/" },
    { id: "3", index: 3, title: "Services", link: "/" },
    { id: "4", index: 4, title: "Contact", link: "/" },
    { id: "5", index: 5, title: "Blog", link: "/" },
    { id: "6", index: 6, title: "Help", link: "/" },
    { id: "7", index: 7, title: "Profile", link: "/" },
  ]);

  const moveLink = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
    
    setLinks((prevCards: NavLinkType[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as NavLinkType],
        ],
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="">
        <FontAwesomeIcon icon={faGear} className="w-4 h-4 cursor-pointer" />
        <div className="fixed z-50 top-0 left-0 inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center">
          <div className="p-8 rounded-md bg-zinc-700 flex flex-col gap-6 w-full h-full items-center justify-center">
            {links.map((navLink, idx) => (
              <DraggableLink
                key={idx}
                index={idx}
                linkData={navLink}
                moveLink={moveLink}
              />
            ))}
          </div>
        </div>
      </ul>
    </DndProvider>
  );
};
