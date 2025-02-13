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
    updateLinkTitle: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const link = state.links.find((l) => l.id === action.payload.id);
      if (link) {
        link.title = action.payload.newTitle;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLinks, updateActive, updateLinkTitle } =
  linksSlice.actions;

export default linksSlice.reducer;
