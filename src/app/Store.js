import { combineReducers, createStore } from "redux";
import musicReducer from "../../src/features/musicPlayer/musicSlice";
const rootReducer = combineReducers({
  musicPlayer: musicReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
