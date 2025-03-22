import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ILanguages = "open" | "close";
interface initialStateProps {
  tempId?: string;
  state: ILanguages;
}

const initialState: initialStateProps = {
  state: "open",
};

const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    updateControlStateSideBar: (
      state,
      action: PayloadAction<{ key: keyof initialStateProps; payload: any }>
    ) => {
      const { key, payload } = action.payload;

      (state as any)[key] = payload;
    },
  },
});

export default slice.reducer;

export const { updateControlStateSideBar } = slice.actions;
