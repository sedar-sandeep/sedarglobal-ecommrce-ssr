import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices

import firstApiReducer from "./slices/content/first";
import footerApiReducer from "./slices/layout/footer";
import headerApiReducer from "./slices/layout/header";
import siteDetailApiReducer from "./slices/siteDetail/siteDetail";
import StoreApiReducer from "./slices/store/store";

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  }
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: []
};

const rootReducer = combineReducers({
  first: persistReducer(
    {
      key: "first",
      storage,
      keyPrefix: "redux-",
      whitelist: []
    },
    firstApiReducer
  ),
  footer: persistReducer(
    {
      key: "footer",
      storage,
      keyPrefix: "redux-",
      whitelist: []
    },
    footerApiReducer
  ),
  header: persistReducer(
    {
      key: "header",
      storage,
      keyPrefix: "redux-",
      whitelist: []
    },
    headerApiReducer
  ),
  siteDetail: persistReducer(
    {
      key: "siteDetail",
      storage,
      keyPrefix: "redux-",
      whitelist: ["siteDetail"]
    },
    siteDetailApiReducer
  ),
  store: persistReducer(
    {
      key: "store",
      storage,
      keyPrefix: "redux-",
      whitelist: [""]
    },
    StoreApiReducer
  )
});

export { rootPersistConfig, rootReducer };
