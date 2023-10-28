// @flow
import * as React from 'react';
import { useEffect, useRef, useState} from "react";
// @ts-ignore
import cl from './currency.module.scss';
import {CurrenciesTable} from "./CurrenciesTable";
import {CurrenciesPicker} from "./CurrenciesPicker";
import {InputBox} from "./InputBox";
import {useTypedSelector} from "../hooks/useTypedSelector";

type Props = {
    from : boolean
};


export function CurrencyBlock({from}: Props) {
    const [hint, setHint] = useState<undefined | string>(undefined);
    const hintStyle = useRef({left: '0'});
    const state = useTypedSelector(state => state.currenciesList);
    const toShow = from ? state.fromBlock: state.toBlock;

    useEffect(() => {

    }, []);
    return (
        <div>
            <div className={cl.title}>
                { from ? 'У меня есть' : 'Хочу приобрести'}
            </div>
            <CurrenciesPicker
                from={from}
                hintStyle={hintStyle}
                setHint={setHint}
                hint={hint}/>
            {
               toShow.tableOpen && <CurrenciesTable from={from}/>
            }
            <InputBox from={from}/>
        </div>
    );
};