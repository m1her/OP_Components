export const defaultPcNavs: NavLinkType[] = [
  { id: "1", index: 1, title: "Home", link: "/" },
  { id: "2", index: 2, title: "About", link: "/" },
  { id: "3", index: 3, title: "Services", link: "/" },
  { id: "4", index: 4, title: "Contact", link: "/" },
  { id: "5", index: 5, title: "Blog", link: "/" },
  { id: "6", index: 6, title: "Help", link: "/" },
  { id: "7", index: 7, title: "Profile", link: "/" },
];

export type NavLinkType = {
  id: string;
  index: number;
  title: string;
  link: string;
};


export const ItemTypes = {
  WEBLINK: 'weblink',
}
