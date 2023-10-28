// @flow
import * as React from 'react';
// @ts-ignore
import cl from "./currency.module.scss";
import {data} from "../Mock/mock.currencies";
import {Dispatch, MutableRefObject, SetStateAction, useEffect} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {TOGGLE_TABLE} from "../store/reducers/CurrenciesReducer";
import {SET_ACTIVE, setRation, setToValue} from "../store/actions/actionCreators";

type Props = {
    hintStyle: MutableRefObject<{left: string;}>;
    setHint: Dispatch<SetStateAction<string | undefined>>;
    hint: undefined | string;
    from: boolean;
};

export function CurrenciesPicker({  hintStyle,
                                     setHint,
                                     hint,
                                     from
                                     }: Props) {
    const state = useTypedSelector(state => state.currenciesList);
    const dispatch = useDispatch();
    const toShow = from ? state.fromBlock : state.toBlock;
    function clickHandler(e:React.MouseEvent<HTMLDivElement>){
        let div = e.target as HTMLDivElement;
        if(div.innerText === 'MORE'){
            dispatch({type : TOGGLE_TABLE, payload : {value : false, from : !from}});
            dispatch({type : TOGGLE_TABLE, payload : {value : true, from : from}});
            return;
        }
        dispatch({type : TOGGLE_TABLE, payload : {value : false, from : from}});
        dispatch({type : SET_ACTIVE, payload : {value : div.innerText, from : from}});
        dispatch(setToValue({value : '0', from: from}));
        dispatch(setToValue({value : '0', from: !from}));
        dispatch(setRation({value : 1, from : true}));
        dispatch(setRation({value : 1, from : false}));

    }
    function overHandler(e:React.MouseEvent<HTMLDivElement>){
        let div = e.target as HTMLDivElement;
        let padding = div.offsetLeft + (div.getClientRects()[0].width / 2);
        hintStyle.current = {left : `${padding}px`};
        setHint(data[div.innerText]);
    }
    function outHandler(e:React.MouseEvent<HTMLDivElement>){
        setHint(undefined);

    }

    useEffect(() => {

    }, [toShow.currencies]);
    return (
           <div className={cl.block}>
               <div className={cl.canter}>
                   {toShow.currencies.map((el, id)=>{
                       return <div className={toShow.active === el ? cl.list + ' '+ cl.active : cl.list }
                                   key={el}
                                   onClick={clickHandler}
                                   onMouseLeave={outHandler}
                                   onMouseOver={overHandler}>{el}
                       </div>
                   })}
                   <div className={toShow.tableOpen ? cl.list + ' '+ cl.active : cl.list }
                        onClick={clickHandler}
                        data-list='true'
                   >More
                   </div>
               </div>
               {
                   hint && <div className={cl.hint} style={hintStyle.current} >{hint}</div>

               }
           </div>

    );
};