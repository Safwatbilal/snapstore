import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector as useAppSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { rootPersistConfig,rootReducer } from "./rootReducers";
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

const { dispatch } = store;

setupListeners(store.dispatch);

const useSelector = useAppSelector;

export { dispatch, persistor, store, useSelector };



