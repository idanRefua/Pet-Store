import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authUserReducer,
  },
});

export default store;
