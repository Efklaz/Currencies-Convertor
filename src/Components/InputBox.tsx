// @flow
import * as React from 'react';
// @ts-ignore
import cl from "./currency.module.scss";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setToValue} from "../store/actions/actionCreators";
import useDebounced from "../hooks/useDebounced";
import {fetchCurrency} from "../store/actions/fetchCurrency";

type Props = {
    from : boolean;
};
interface IResponse{
    query: {
        amount: number;
        from: string;
        to: string;
    },
    result: number,
    success: boolean
}
export function InputBox({ from}: Props) {
    const dispatch = useDispatch();
    const state = useTypedSelector((state)=>state.currenciesList);
    const toChange = !from ? state.fromBlock : state.toBlock;
    const toShow = from ? state.fromBlock : state.toBlock;
    const debouncedFetch = useDebounced(async(str: string)=>{
        // @ts-ignore
        dispatch(fetchCurrency({from: toShow.active, to: toChange.active, amount: str, fromBlock: from ? 'from': 'to'}))
    }, 300)
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        let char=  e.target.value[e.target.value.length - 1];
        let isNum = !isNaN(Number(char));
        if(e.target.value === ''){
            dispatch(setToValue({value : '', from: from}));
        }
        if(isNum){
            dispatch(setToValue({value : e.target.value, from: from}));
            debouncedFetch(e.target.value);
        }
    }

    function blur(e:React.FocusEvent<HTMLInputElement>){
        if(toShow.value === ''){
            dispatch(setToValue({value : '0', from: from}));
        }
    }
    function focus(e:React.FocusEvent<HTMLInputElement>){
        if(toShow.value === '0'){
            dispatch(setToValue({value : '', from: from}));
        }
    }
    return (
        <div className={cl.inputBox}>
            <input value={toShow.value} onChange={handleChange} onBlur={blur} onFocus={focus}/>
            <div className={cl.rate}>{toShow.active} 1 = {toShow.ratio +' '+ toChange.active }</div>
        </div>
    );
};