import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { defaultPcNavs, NavLinkType } from "./data";

export interface LinksState {
  links: NavLinkType[];
  activeLinks: NavLinkType[];
}

const initialState: LinksState = {
  links: defaultPcNavs,
  activeLinks: defaultPcNavs.filter((link) => link.isActive),
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    updateLinks: (state, action: PayloadAction<NavLinkType[]>) => {
      state.links = [...action.payload];
    },
    updateActive: (state, action: PayloadAction<NavLinkType[]>) => {
      state.activeLinks = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLinks, updateActive } = linksSlice.actions;

export default linksSlice.reducer;
