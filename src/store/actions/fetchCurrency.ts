import {IPayload} from "../reducers/CurrenciesReducer";
import {setRation, setToValue} from "./actionCreators";
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from "../reducers";
import {AnyAction} from "redux";
interface IResponse{
    query: {
        amount: number;
        from: string;
        to: string;
    },
    result: number,
    success: boolean
}

function updateCurrencies(dispatch: ThunkDispatch<RootState, undefined, AnyAction>, payload:IPayload){
    let ratioFrom = payload.fromBlock === 'from' ? Number(( Number(localStorage.getItem(`${payload.from + payload.to}`))).toFixed(4))
            :Number((1 / Number(localStorage.getItem(`${payload.to + payload.from}`))).toFixed(4));
    let ratioTo  = Number(localStorage.getItem(`${payload.to + payload.from}`));
    let currency = Number((ratioFrom * payload?.amount).toFixed(4));
    if(payload.fromBlock === 'from'){
        dispatch(setRation({value :Number(localStorage.getItem(`${payload.from + payload.to}`)), from : true}));
        dispatch(setRation({value :Number(localStorage.getItem(`${payload.to + payload.from}`)), from : false}));
        dispatch(setToValue({value :currency.toString(), from : false}));
        return;
    }
    dispatch(setRation({value :Number(localStorage.getItem(`${payload.to + payload.from}`)), from : true}));
    dispatch(setRation({value :Number(localStorage.getItem(`${payload.from + payload.to}`)), from : false}));
    dispatch(setToValue({value :currency.toString(), from : true}));
}
export const fetchCurrency = (payload: IPayload)=>{
    return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "0B30eJBlw1ifdOFq8e6TY2HAH9EzPTsm");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        if (localStorage.getItem(`${payload.from + payload.to}`)) {
            updateCurrencies(dispatch, payload);
            return;
        }
        const response = await fetch(`https://api.apilayer.com/currency_data/convert?to=${payload.to}&from=${payload.from}&amount=${payload.amount}`, requestOptions);
        const data = await response.json();
        const result = (data as IResponse).result;
        const queryAmount = (data as IResponse).query.amount
        localStorage.setItem(`${payload.from + payload.to}`, `${(result / queryAmount).toFixed(4)}`);
        localStorage.setItem(`${payload.to + payload.from}`, `${(queryAmount / result).toFixed(4)}`);
        updateCurrencies(dispatch, payload);
    };

}