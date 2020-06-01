import { combineReducers } from "redux";
import  askReducer  from "./askReducer";
import  askListReducer  from "./askListReducer";
import authReducer from "./authReducer";
import answerReducer from "./answerReducer";

export const rootReducer = combineReducers({ask: askReducer, askList: askListReducer, auth: authReducer, answer: answerReducer })