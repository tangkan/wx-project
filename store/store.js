import { createStore } from "../libs/redux.min.js"
import rootReducer from "./reducers/index.js"

export default createStore(rootReducer)