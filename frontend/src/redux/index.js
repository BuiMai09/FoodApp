import userSliceReducer from "./userSlice";
import productSlideReducer from "./productSlide";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// export const store = configureStore({
//   reducer: {
//     user : userSliceReducer,
//     product : productSlideReducer

//   },
// });



const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ user: userSliceReducer, product: productSlideReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)
