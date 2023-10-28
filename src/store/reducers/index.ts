import {combineReducers} from "redux";
import {currenciesReducer} from "./CurrenciesReducer";

export const root = combineReducers({
    currenciesList: currenciesReducer,

});
export type RootState = ReturnType<typeof root>
