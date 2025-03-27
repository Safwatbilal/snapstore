import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector as useAppSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducers";
import storage from "redux-persist/lib/storage"; // استخدم التخزين المحلي

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"], // استثناء أي قيم غير قابلة للتسلسل
      },
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

setupListeners(store.dispatch);

const useSelector = useAppSelector;

export { dispatch, persistor, store, useSelector };
