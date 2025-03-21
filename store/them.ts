import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type IThem="dark"|"light";

interface initialStateProps{
    tempId?:string;
    them:IThem;
}
const initialState:initialStateProps={
    them:'dark'
}
const slice=createSlice({
    name:'control',
    initialState,
    reducers:{
        updateControlState: (
            state,
            action: PayloadAction<{ key: keyof initialStateProps; payload: any }>
          ) => {
            const { key, payload } = action.payload;
      
            (state as any)[key] = payload;
          },
    }
})
export default slice.reducer
export const {updateControlState}=slice.actions