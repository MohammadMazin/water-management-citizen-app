import userReducer from "./userData";
import languageReducer from "./lang";
import imageReducer from "./cameraImages";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    userReducer,
    languageReducer,
    imageReducer
})

export default allReducers