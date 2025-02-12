export const defaultPcNavs: NavLinkType[] = [
  { id: 1, title: "Home", link: "/", isActive: true },
  { id: 2, title: "About", link: "/", isActive: true },
  { id: 3, title: "Services", link: "/", isActive: true },
  { id: 4, title: "Contact", link: "/", isActive: true },
  { id: 5, title: "Blog", link: "/", isActive: true },
  { id: 6, title: "Help", link: "/", isActive: true },
  { id: 7, title: "Profile", link: "/", isActive: true },
];

export type NavLinkType = {
  id: number;
  title: string;
  link: string;
  isActive: boolean;
};

export const ItemTypes = {
  WEBLINK: "weblink",
};
