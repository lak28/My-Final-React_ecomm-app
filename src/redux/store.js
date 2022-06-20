//redux store page

import { createStore } from "redux";
import rootReducers from "./reducer";

const store = createStore(rootReducers)

export default store;
