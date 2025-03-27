import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ILanguages = "ar" | "en";
interface initialStateProps {
  tempId?: string;
  lang: ILanguages;
  isLogout:boolean
}

const initialState: initialStateProps = {
  lang: "en",
  isLogout:false
};

const slice = createSlice({
  name: "control",
  initialState,
  reducers: {
    updateControlState: (
      state,
      action: PayloadAction<{ key: keyof initialStateProps; payload: any }>
    ) => {
      const { key, payload } = action.payload;

      (state as any)[key] = payload;
    },
  },
});

export default slice.reducer;

export const { updateControlState } = slice.actions;
