
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ILanguages = "ar" | "en";
export type ILogout=false|true
interface initialStateProps {
  tempId?: string;
  lang: ILanguages;
  isLogout:boolean,
  search:string,
  openSheet:boolean
}
const storedLogout = localStorage.getItem("token");
const initialState: initialStateProps = {
  lang: "en",
  isLogout: storedLogout===null ? true : false,
  search:'',
  openSheet:false
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
