import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "@/components/CustomizableNavigation/linksSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { links: linksReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
