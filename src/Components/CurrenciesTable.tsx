// @flow
import * as React from 'react';
import cl from "./currency.module.scss";
import mockCurrencies from "../Mock/mock.currencies";
import {Dispatch, SetStateAction} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {SET_CURRENCIES, TOGGLE_TABLE} from "../store/reducers/CurrenciesReducer";
import {SET_ACTIVE} from "../store/actions/actionCreators";

type Props = {
    from : boolean;
};

export function CurrenciesTable({from}: Props) {
    const state = useTypedSelector((state)=> state.currenciesList);
    const toShow = from ? state.fromBlock: state.toBlock;
    const dispatch = useDispatch();
    function changeCurr(e:React.MouseEvent<HTMLDivElement>){
        let div = e.target as HTMLDivElement;
        if(div.dataset.cur){
            if(toShow.currencies.includes(div.dataset.cur)){
                dispatch({type : SET_ACTIVE, payload : {value : div.dataset.cur, from : from}});
                dispatch({type : TOGGLE_TABLE, payload : {value : false, from : from}});
                return;
            }
            let newCurrencies = [...toShow.currencies].slice(0,3);
            newCurrencies.push(div.dataset.cur);
            dispatch({type: SET_CURRENCIES, payload : {value : newCurrencies, from : from}});
            dispatch({type : SET_ACTIVE, payload : {value : div.dataset.cur, from : from}});
            dispatch({type : TOGGLE_TABLE, payload : {value : false, from : from}});


        }
    }
    return (
        <div className={cl.currencyTable}>
            {
                mockCurrencies.map((el, ind)=>{
                    return <div key={ind} className={cl.row} data-cur={el[0]} onClick={changeCurr}>
                        <div className={cl.description}>{el[1]}</div>
                        <div className={cl.bold}>{el[0]}</div>
                    </div>
                })
            }
        </div>
    );
};