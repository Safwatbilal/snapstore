
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ILanguages = "ar" | "en";
export type ILogout=false|true
export type ITheme="light"|"dark"
export type IState="pending"|'completed'|'cancelled'|'accepted'|'all'
interface initialStateProps {
  tempId?: string;
  lang: ILanguages;
  isLogout:boolean,
  search:string,
  openSheet:boolean,
  theme:ITheme,
  state:IState,
}
const isBrowser = typeof window !== "undefined";
const storedLogout = isBrowser ? localStorage.getItem("token") : null;
const storedTheme = (isBrowser ? (localStorage.getItem("theme") as ITheme) : null) || "light";
const initialState: initialStateProps = {
  lang: "en",
  isLogout: storedLogout===null ? true : false,
  search:'',
  openSheet:false,
  theme:storedTheme,
  state:'all'
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
