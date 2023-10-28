import React from 'react';
import logo from './logo.svg';
import cl from './App.module.scss';
import {CurrencyBlock} from "./Components/CurrencyBlock";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {setActive, setRation, setToValue} from "./store/actions/actionCreators";
import {SET_CURRENCIES} from "./store/reducers/CurrenciesReducer";

function App() {
    const state = useTypedSelector((state)=> state.currenciesList);
    const dispatch = useDispatch();
    function transfer(e: React.MouseEvent<HTMLDivElement>){
        let tempActive = state.fromBlock.active;
        let tempValue = state.fromBlock.value;
        let tempRatio = state.fromBlock.ratio;
        let tempCurrencies = state.fromBlock.currencies;
        dispatch(setActive({value: state.toBlock.active, from : true}));
        dispatch(setActive({value: tempActive, from : false}));

        dispatch(setToValue({value: state.toBlock.value, from : true}));
        dispatch(setToValue({value: tempValue, from : false}));

        dispatch(setRation({value: state.toBlock.ratio, from : true}));
        dispatch(setRation({value: tempRatio, from : false}));

        dispatch({type: SET_CURRENCIES, payload : {value : state.toBlock.currencies, from : true}});
        dispatch({type: SET_CURRENCIES, payload : {value : tempCurrencies, from : false}});


    }
  return (
      <>
          <div className={cl.container}>
              <CurrencyBlock from={true}/>
              <div className={cl.transfer} onClick={transfer}/>
              <CurrencyBlock from={false}/>
          </div>
      </>
  );
}

export default App;
