"use client";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
// import { NavLinkType } from "../data";
import { DraggableLink } from "./DraggableLink";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { GroupStatusDrop } from "./GroupStatusDrop";
import { NavLinkType } from "../data";
// import update from "immutability-helper";

export const EditWebNavLinks = () => {
  const [links, setLinks] = useState<NavLinkType[] | []>([
    { id: 1, title: "Home", link: "/", isActive: true },
    { id: 2, title: "About", link: "/", isActive: true },
    { id: 3, title: "Services", link: "/", isActive: true },
    { id: 4, title: "Contact", link: "/", isActive: true },
    { id: 5, title: "Blog", link: "/", isActive: true },
    { id: 6, title: "Help", link: "/", isActive: true },
    { id: 7, title: "Profile", link: "/", isActive: true },
  ]);
  const [activeLinks, setActiveLinks] = useState<NavLinkType[] | []>([]);
  const [disabledLinks, setDisabledLinks] = useState<NavLinkType[] | []>([]);

  useEffect(() => {
    const activeFiltered: NavLinkType[] = [];
    const disabledFiltered: NavLinkType[] = [];

    for (const link of links) {
      if (link.isActive) {
        activeFiltered.push(link);
      } else {
        disabledFiltered.push(link);
      }
    }

    setActiveLinks(activeFiltered);
    setDisabledLinks(disabledFiltered);
  }, [links]);

  const moveLink = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = activeLinks[dragIndex];
      const hoverItem = activeLinks[hoverIndex];
      setActiveLinks((links) => {
        const updatedPets = [...links];
        updatedPets[dragIndex] = hoverItem;
        updatedPets[hoverIndex] = dragItem;
        return updatedPets;
      });
    },
    [activeLinks]
  );

  const removeFromActive = (id: number) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, isActive: false } : link
      )
    );

    setActiveLinks((prevActive) => prevActive.filter((link) => link.id !== id));
    setDisabledLinks((prevDisabled) => [
      ...prevDisabled,
      links.find((link) => link.id === id)!,
    ]);
  };

  const removeFromDisabled = (id: number) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, isActive: true } : link
      )
    );

    setDisabledLinks((prevDisabled) =>
      prevDisabled.filter((link) => link.id !== id)
    );
    setActiveLinks((prevActive) => [
      ...prevActive,
      disabledLinks.find((link) => link.id === id)!,
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="">
        <FontAwesomeIcon icon={faGear} className="w-4 h-4 cursor-pointer" />
        <div className="fixed z-50 top-0 left-0 inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center">
          <div className="p-8 rounded-md bg-zinc-700 flex flex-col gap-6 items-center">
            <GroupStatusDrop
              links={links}
              setLinks={setLinks}
              isActiveEffect={true}
              filteringFunction={removeFromDisabled}
            >
              {activeLinks.map((navLink, idx) => (
                <DraggableLink
                  key={navLink.id}
                  index={idx}
                  linkData={navLink}
                  moveLink={moveLink}
                />
              ))}
            </GroupStatusDrop>

            <GroupStatusDrop
              links={links}
              setLinks={setLinks}
              isActiveEffect={false}
              filteringFunction={removeFromActive}
            >
              {disabledLinks.map((navLink, idx) => (
                <DraggableLink
                  key={navLink.id}
                  index={idx}
                  linkData={navLink}
                  moveLink={moveLink}
                />
              ))}
            </GroupStatusDrop>
          </div>
        </div>
      </ul>
    </DndProvider>
  );
};
